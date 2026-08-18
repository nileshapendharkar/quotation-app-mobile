import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, BackHandler, LayoutAnimation, Platform, UIManager } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { FavoriteProvider } from './src/context/FavoriteContext';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';

import HomeScreen from './src/screens/HomeScreen';
import ProductScreen from './src/screens/ProductScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import CartScreen from './src/screens/CartScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import CompanyProfileScreen from './src/screens/CompanyProfileScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';

import BottomTabBar from './src/components/BottomTabBar';
import SideMenuModal from './src/components/SideMenuModal';
import LaunchAnimation from './src/components/LaunchAnimation';

function MainAppNavigator() {
  const { user } = useContext(AuthContext);

  const [authScreen, setAuthScreen] = useState('Login'); // Login, Register, Forgot
  const [currentTab, setCurrentTab] = useState('Home'); // Home, Favorite, Cart, Orders, CompanyProfile, ChangePassword
  const [sideMenuVisible, setSideMenuVisible] = useState(false);

  const changeAuthScreen = (screen) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAuthScreen(screen);
  };

  const changeTab = (tab) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCurrentTab(tab);
  };

  useEffect(() => {
    const onBackPress = () => {
      if (!user) {
        if (authScreen !== 'Login') {
          changeAuthScreen('Login');
          return true;
        }
        return false;
      }
      if (sideMenuVisible) {
        setSideMenuVisible(false);
        return true;
      }
      if (currentTab !== 'Home') {
        changeTab('Home');
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => backHandler.remove();
  }, [user, authScreen, sideMenuVisible, currentTab]);

  if (!user) {
    return (
      <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        {authScreen === 'Login' && (
          <LoginScreen
            onNavigateRegister={() => changeAuthScreen('Register')}
            onNavigateForgot={() => changeAuthScreen('Forgot')}
          />
        )}
        {authScreen === 'Register' && (
          <RegisterScreen
            onNavigateLogin={() => changeAuthScreen('Login')}
          />
        )}
        {authScreen === 'Forgot' && (
          <ForgotPasswordScreen
            onNavigateLogin={() => changeAuthScreen('Login')}
          />
        )}
      </View>
    );
  }

  const renderActiveScreen = () => {
    switch (currentTab) {
      case 'Home':
        return (
          <HomeScreen
            onOpenMenu={() => setSideMenuVisible(true)}
            onNavigateProduct={() => changeTab('Product')}
            onNavigateOrders={() => changeTab('Orders')}
            onNavigateNotifications={() => changeTab('Notifications')}
          />
        );
      case 'Product':
        return (
          <ProductScreen
            onOpenMenu={() => setSideMenuVisible(true)}
            onSelectProduct={(p) => changeTab('Cart')}
          />
        );
      case 'Favorite':
        return <FavoriteScreen onNavigateHome={() => changeTab('Home')} />;
      case 'Cart':
        return <CartScreen onNavigateOrders={() => changeTab('Orders')} />;
      case 'Orders':
        return <OrdersScreen />;
      case 'Notifications':
        return <NotificationsScreen onNavigateBack={() => changeTab('Home')} />;
      case 'CompanyProfile':
        return <CompanyProfileScreen onNavigateBack={() => changeTab('Home')} />;
      case 'ChangePassword':
        return <ChangePasswordScreen onNavigateBack={() => changeTab('Home')} />;
      default:
        return <HomeScreen onOpenMenu={() => setSideMenuVisible(true)} />;
    }
  };

  const showBottomBar = ['Home', 'Product', 'Favorite', 'Cart', 'Orders'].includes(currentTab);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.screenContainer}>
        {renderActiveScreen()}
      </View>

      {showBottomBar && (
        <BottomTabBar
          activeTab={currentTab}
          onTabChange={(tab) => changeTab(tab)}
        />
      )}

      <SideMenuModal
        visible={sideMenuVisible}
        onClose={() => setSideMenuVisible(false)}
        onNavigate={(target) => changeTab(target)}
      />
    </SafeAreaView>
  );
}

export default function App() {
  const [showLaunch, setShowLaunch] = useState(true);

  return (
    <AuthProvider>
      <AppContent showLaunch={showLaunch} setShowLaunch={setShowLaunch} />
    </AuthProvider>
  );
}

const AppContent = ({ showLaunch, setShowLaunch }) => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      </View>
    );
  }

  return (
    <CartProvider>
      <FavoriteProvider>
        <View style={{ flex: 1 }}>
          <MainAppNavigator />
          {showLaunch && (
            <LaunchAnimation onFinish={() => setShowLaunch(false)} />
          )}
        </View>
      </FavoriteProvider>
    </CartProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  screenContainer: {
    flex: 1,
  },
});
