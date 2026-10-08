import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, BackHandler, Platform, Text, ScrollView } from 'react-native';


import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { FavoriteProvider } from './src/context/FavoriteContext';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';

import HomeScreen from './src/screens/HomeScreen';
import ProductScreen from './src/screens/ProductScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import CartScreen from './src/screens/CartScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import CompanyProfileScreen from './src/screens/CompanyProfileScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import DraftsScreen from './src/screens/DraftsScreen';

import BottomTabBar from './src/components/BottomTabBar';
import SideMenuModal from './src/components/SideMenuModal';
import LaunchAnimation from './src/components/LaunchAnimation';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc', padding: 20, justifyContent: 'center' }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#ef4444', marginBottom: 10 }}>App Crashed!</Text>
          <ScrollView style={{ flex: 1 }}>
            <Text style={{ color: '#000', fontFamily: 'monospace' }}>
              {this.state.error && this.state.error.toString()}
            </Text>
            <Text style={{ color: '#666', fontFamily: 'monospace', marginTop: 10 }}>
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </Text>
          </ScrollView>
        </SafeAreaView>
      );
    }
    return this.props.children;
  }
}

function MainAppNavigator() {
  const { user } = useContext(AuthContext);

  const [authScreen, setAuthScreen] = useState('Login'); // Login, Register, Forgot
  const [currentTab, setCurrentTab] = useState('Home'); // Home, Favorite, Cart, Orders, CompanyProfile, ChangePassword
  const [sideMenuVisible, setSideMenuVisible] = useState(false);

  const changeAuthScreen = (screen) => {
    setAuthScreen(screen);
  };

  const changeTab = (tab) => {
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

  const showBottomBar = ['Home', 'Product', 'Favorite', 'Cart', 'Orders'].includes(currentTab);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.screenContainer}>
        {/* Core Tabs kept mounted for instant 0ms tab switching and preserved state */}
        <View style={[styles.tabScreenWrap, currentTab === 'Home' ? styles.visibleScreen : styles.hiddenScreen]}>
          <HomeScreen
            onOpenMenu={() => setSideMenuVisible(true)}
            onNavigateProduct={() => changeTab('Product')}
            onNavigateOrders={() => changeTab('Orders')}
            onNavigateNotifications={() => changeTab('Notifications')}
          />
        </View>

        <View style={[styles.tabScreenWrap, currentTab === 'Product' ? styles.visibleScreen : styles.hiddenScreen]}>
          <ProductScreen
            onOpenMenu={() => setSideMenuVisible(true)}
            onSelectProduct={(p) => changeTab('Cart')}
          />
        </View>

        <View style={[styles.tabScreenWrap, currentTab === 'Favorite' ? styles.visibleScreen : styles.hiddenScreen]}>
          <FavoriteScreen
            onNavigateHome={() => changeTab('Home')}
            onOpenMenu={() => setSideMenuVisible(true)}
            onNavigateNotifications={() => changeTab('Notifications')}
            onNavigateSearch={() => changeTab('Product')}
          />
        </View>

        <View style={[styles.tabScreenWrap, currentTab === 'Cart' ? styles.visibleScreen : styles.hiddenScreen]}>
          <CartScreen
            onNavigateOrders={() => changeTab('Orders')}
            onOpenMenu={() => setSideMenuVisible(true)}
            onNavigateNotifications={() => changeTab('Notifications')}
            onNavigateSearch={() => changeTab('Product')}
          />
        </View>

        {/* Secondary modal/sub-screens dynamically mounted */}
        {currentTab === 'Orders' && (
          <View style={styles.tabScreenWrap}>
            <OrdersScreen onNavigateBack={() => changeTab('Home')} />
          </View>
        )}
        {currentTab === 'Drafts' && (
          <View style={styles.tabScreenWrap}>
            <DraftsScreen
              onNavigateBack={() => changeTab('Home')}
              onNavigateCart={() => changeTab('Cart')}
              onOpenMenu={() => setSideMenuVisible(true)}
            />
          </View>
        )}
        {currentTab === 'Notifications' && (
          <View style={styles.tabScreenWrap}>
            <NotificationsScreen onNavigateBack={() => changeTab('Home')} />
          </View>
        )}
        {currentTab === 'CompanyProfile' && (
          <View style={styles.tabScreenWrap}>
            <CompanyProfileScreen onNavigateBack={() => changeTab('Home')} />
          </View>
        )}
        {currentTab === 'ChangePassword' && (
          <View style={styles.tabScreenWrap}>
            <ChangePasswordScreen onNavigateBack={() => changeTab('Home')} />
          </View>
        )}
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
    <ErrorBoundary>
      <AuthProvider>
        <AppContent showLaunch={showLaunch} setShowLaunch={setShowLaunch} />
      </AuthProvider>
    </ErrorBoundary>
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
    position: 'relative',
  },
  tabScreenWrap: {
    ...StyleSheet.absoluteFillObject,
  },
  visibleScreen: {
    display: 'flex',
    opacity: 1,
    zIndex: 1,
  },
  hiddenScreen: {
    display: 'none',
    opacity: 0,
    zIndex: 0,
  },
});
