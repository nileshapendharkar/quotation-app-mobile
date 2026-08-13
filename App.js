import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, BackHandler } from 'react-native';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { FavoriteProvider } from './src/context/FavoriteContext';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';

import HomeScreen from './src/screens/HomeScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import CartScreen from './src/screens/CartScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import CompanyProfileScreen from './src/screens/CompanyProfileScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';

import BottomTabBar from './src/components/BottomTabBar';
import SideMenuModal from './src/components/SideMenuModal';
import LaunchAnimation from './src/components/LaunchAnimation';

function MainAppNavigator() {
  const { user } = useContext(AuthContext);

  const [authScreen, setAuthScreen] = useState('Login'); // Login, Register, Forgot
  const [currentTab, setCurrentTab] = useState('Home'); // Home, Favorite, Cart, Orders, CompanyProfile, ChangePassword
  const [sideMenuVisible, setSideMenuVisible] = useState(false);

  useEffect(() => {
    const onBackPress = () => {
      if (!user) {
        if (authScreen !== 'Login') {
          setAuthScreen('Login');
          return true;
        }
        return false;
      }
      if (sideMenuVisible) {
        setSideMenuVisible(false);
        return true;
      }
      if (currentTab !== 'Home') {
        setCurrentTab('Home');
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
            onNavigateRegister={() => setAuthScreen('Register')}
            onNavigateForgot={() => setAuthScreen('Forgot')}
          />
        )}
        {authScreen === 'Register' && (
          <RegisterScreen
            onNavigateLogin={() => setAuthScreen('Login')}
          />
        )}
        {authScreen === 'Forgot' && (
          <ForgotPasswordScreen
            onNavigateLogin={() => setAuthScreen('Login')}
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
            onSelectProduct={(p) => setCurrentTab('Cart')}
          />
        );
      case 'Favorite':
        return <FavoriteScreen onNavigateHome={() => setCurrentTab('Home')} />;
      case 'Cart':
        return <CartScreen onNavigateOrders={() => setCurrentTab('Orders')} />;
      case 'Orders':
        return <OrdersScreen />;
      case 'CompanyProfile':
        return <CompanyProfileScreen onNavigateBack={() => setCurrentTab('Home')} />;
      case 'ChangePassword':
        return <ChangePasswordScreen onNavigateBack={() => setCurrentTab('Home')} />;
      default:
        return <HomeScreen onOpenMenu={() => setSideMenuVisible(true)} />;
    }
  };

  const showBottomBar = ['Home', 'Favorite', 'Cart', 'Orders'].includes(currentTab);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.screenContainer}>
        {renderActiveScreen()}
      </View>

      {showBottomBar && (
        <BottomTabBar
          activeTab={currentTab}
          onTabChange={(tab) => setCurrentTab(tab)}
        />
      )}

      <SideMenuModal
        visible={sideMenuVisible}
        onClose={() => setSideMenuVisible(false)}
        onNavigate={(target) => setCurrentTab(target)}
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
