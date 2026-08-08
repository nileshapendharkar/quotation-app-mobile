'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports['default'] = App;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _srcContextAuthContext = require('./src/context/AuthContext');

var _srcContextCartContext = require('./src/context/CartContext');

var _srcContextFavoriteContext = require('./src/context/FavoriteContext');

var _srcScreensLoginScreen = require('./src/screens/LoginScreen');

var _srcScreensLoginScreen2 = _interopRequireDefault(_srcScreensLoginScreen);

var _srcScreensRegisterScreen = require('./src/screens/RegisterScreen');

var _srcScreensRegisterScreen2 = _interopRequireDefault(_srcScreensRegisterScreen);

var _srcScreensForgotPasswordScreen = require('./src/screens/ForgotPasswordScreen');

var _srcScreensForgotPasswordScreen2 = _interopRequireDefault(_srcScreensForgotPasswordScreen);

var _srcScreensHomeScreen = require('./src/screens/HomeScreen');

var _srcScreensHomeScreen2 = _interopRequireDefault(_srcScreensHomeScreen);

var _srcScreensFavoriteScreen = require('./src/screens/FavoriteScreen');

var _srcScreensFavoriteScreen2 = _interopRequireDefault(_srcScreensFavoriteScreen);

var _srcScreensCartScreen = require('./src/screens/CartScreen');

var _srcScreensCartScreen2 = _interopRequireDefault(_srcScreensCartScreen);

var _srcScreensOrdersScreen = require('./src/screens/OrdersScreen');

var _srcScreensOrdersScreen2 = _interopRequireDefault(_srcScreensOrdersScreen);

var _srcScreensCompanyProfileScreen = require('./src/screens/CompanyProfileScreen');

var _srcScreensCompanyProfileScreen2 = _interopRequireDefault(_srcScreensCompanyProfileScreen);

var _srcScreensChangePasswordScreen = require('./src/screens/ChangePasswordScreen');

var _srcScreensChangePasswordScreen2 = _interopRequireDefault(_srcScreensChangePasswordScreen);

var _srcComponentsBottomTabBar = require('./src/components/BottomTabBar');

var _srcComponentsBottomTabBar2 = _interopRequireDefault(_srcComponentsBottomTabBar);

var _srcComponentsSideMenuModal = require('./src/components/SideMenuModal');

var _srcComponentsSideMenuModal2 = _interopRequireDefault(_srcComponentsSideMenuModal);

var _srcComponentsLaunchAnimation = require('./src/components/LaunchAnimation');

var _srcComponentsLaunchAnimation2 = _interopRequireDefault(_srcComponentsLaunchAnimation);

function MainAppNavigator() {
  var _useContext = (0, _react.useContext)(_srcContextAuthContext.AuthContext);

  var user = _useContext.user;

  var _useState = (0, _react.useState)('Login');

  var _useState2 = _slicedToArray(_useState, 2);

  var authScreen = _useState2[0];
  var setAuthScreen = _useState2[1];
  // Login, Register, Forgot

  var _useState3 = (0, _react.useState)('Home');

  var _useState32 = _slicedToArray(_useState3, 2);

  var currentTab = _useState32[0];
  var setCurrentTab = _useState32[1];
  // Home, Favorite, Cart, Orders, CompanyProfile, ChangePassword

  var _useState4 = (0, _react.useState)(false);

  var _useState42 = _slicedToArray(_useState4, 2);

  var sideMenuVisible = _useState42[0];
  var setSideMenuVisible = _useState42[1];

  if (!user) {
    return _react2['default'].createElement(
      _reactNative.View,
      { style: { flex: 1, backgroundColor: '#f8fafc' } },
      _react2['default'].createElement(_reactNative.StatusBar, { barStyle: 'dark-content', backgroundColor: '#ffffff' }),
      authScreen === 'Login' && _react2['default'].createElement(_srcScreensLoginScreen2['default'], {
        onNavigateRegister: function () {
          return setAuthScreen('Register');
        },
        onNavigateForgot: function () {
          return setAuthScreen('Forgot');
        }
      }),
      authScreen === 'Register' && _react2['default'].createElement(_srcScreensRegisterScreen2['default'], {
        onNavigateLogin: function () {
          return setAuthScreen('Login');
        }
      }),
      authScreen === 'Forgot' && _react2['default'].createElement(_srcScreensForgotPasswordScreen2['default'], {
        onNavigateLogin: function () {
          return setAuthScreen('Login');
        }
      })
    );
  }

  var renderActiveScreen = function renderActiveScreen() {
    switch (currentTab) {
      case 'Home':
        return _react2['default'].createElement(_srcScreensHomeScreen2['default'], {
          onOpenMenu: function () {
            return setSideMenuVisible(true);
          },
          onSelectProduct: function (p) {
            return setCurrentTab('Cart');
          }
        });
      case 'Favorite':
        return _react2['default'].createElement(_srcScreensFavoriteScreen2['default'], { onNavigateHome: function () {
            return setCurrentTab('Home');
          } });
      case 'Cart':
        return _react2['default'].createElement(_srcScreensCartScreen2['default'], { onNavigateOrders: function () {
            return setCurrentTab('Orders');
          } });
      case 'Orders':
        return _react2['default'].createElement(_srcScreensOrdersScreen2['default'], null);
      case 'CompanyProfile':
        return _react2['default'].createElement(_srcScreensCompanyProfileScreen2['default'], { onNavigateBack: function () {
            return setCurrentTab('Home');
          } });
      case 'ChangePassword':
        return _react2['default'].createElement(_srcScreensChangePasswordScreen2['default'], { onNavigateBack: function () {
            return setCurrentTab('Home');
          } });
      default:
        return _react2['default'].createElement(_srcScreensHomeScreen2['default'], { onOpenMenu: function () {
            return setSideMenuVisible(true);
          } });
    }
  };

  var showBottomBar = ['Home', 'Favorite', 'Cart', 'Orders'].includes(currentTab);

  return _react2['default'].createElement(
    _reactNative.SafeAreaView,
    { style: styles.safeArea },
    _react2['default'].createElement(_reactNative.StatusBar, { barStyle: 'dark-content', backgroundColor: '#ffffff' }),
    _react2['default'].createElement(
      _reactNative.View,
      { style: styles.screenContainer },
      renderActiveScreen()
    ),
    showBottomBar && _react2['default'].createElement(_srcComponentsBottomTabBar2['default'], {
      activeTab: currentTab,
      onTabChange: function (tab) {
        return setCurrentTab(tab);
      }
    }),
    _react2['default'].createElement(_srcComponentsSideMenuModal2['default'], {
      visible: sideMenuVisible,
      onClose: function () {
        return setSideMenuVisible(false);
      },
      onNavigate: function (target) {
        return setCurrentTab(target);
      }
    })
  );
}

function App() {
  var _useState5 = (0, _react.useState)(true);

  var _useState52 = _slicedToArray(_useState5, 2);

  var showLaunch = _useState52[0];
  var setShowLaunch = _useState52[1];

  return _react2['default'].createElement(
    _srcContextAuthContext.AuthProvider,
    null,
    _react2['default'].createElement(
      _srcContextCartContext.CartProvider,
      null,
      _react2['default'].createElement(
        _srcContextFavoriteContext.FavoriteProvider,
        null,
        _react2['default'].createElement(
          _reactNative.View,
          { style: { flex: 1 } },
          _react2['default'].createElement(MainAppNavigator, null),
          showLaunch && _react2['default'].createElement(_srcComponentsLaunchAnimation2['default'], { onFinish: function () {
              return setShowLaunch(false);
            } })
        )
      )
    )
  );
}

var styles = _reactNative.StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  screenContainer: {
    flex: 1
  }
});
module.exports = exports['default'];