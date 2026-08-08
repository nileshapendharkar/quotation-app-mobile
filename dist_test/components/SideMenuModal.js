'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = SideMenuModal;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _lucideReactNative = require('lucide-react-native');

var _contextAuthContext = require('../context/AuthContext');

function SideMenuModal(_ref) {
  var _this = this;

  var visible = _ref.visible;
  var onClose = _ref.onClose;
  var onNavigate = _ref.onNavigate;

  var _useContext = (0, _react.useContext)(_contextAuthContext.AuthContext);

  var user = _useContext.user;
  var logout = _useContext.logout;
  var deleteAccount = _useContext.deleteAccount;

  var menuItems = [{ id: 'Home', label: 'Home', icon: _lucideReactNative.Home }, { id: 'Favorite', label: 'Favorite', icon: _lucideReactNative.Heart }, { id: 'Cart', label: 'Quote Cart', icon: _lucideReactNative.ShoppingBag }, { id: 'Orders', label: 'Orders', icon: _lucideReactNative.ClipboardList }, { id: 'CompanyProfile', label: 'Company Profile', icon: _lucideReactNative.Building2 }, { id: 'ChangePassword', label: 'Change Password', icon: _lucideReactNative.KeyRound }];

  var handleLogout = function handleLogout() {
    onClose();
    logout();
  };

  var handleDeleteAccount = function handleDeleteAccount() {
    _reactNative.Alert.alert('Delete Account', 'Are you sure you want to delete your account? This action cannot be undone.', [{ text: 'Cancel', style: 'cancel' }, {
      text: 'Delete',
      style: 'destructive',
      onPress: function onPress() {
        return regeneratorRuntime.async(function onPress$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              onClose();
              context$3$0.next = 3;
              return regeneratorRuntime.awrap(deleteAccount());

            case 3:
            case 'end':
              return context$3$0.stop();
          }
        }, null, _this);
      }
    }]);
  };

  return _react2['default'].createElement(
    _reactNative.Modal,
    { visible: visible, animationType: 'slide', transparent: true },
    _react2['default'].createElement(
      _reactNative.View,
      { style: styles.overlay },
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.menuContainer },
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.header },
          _react2['default'].createElement(
            _reactNative.View,
            { style: styles.avatar },
            _react2['default'].createElement(_lucideReactNative.UserCheck, { size: 24, color: '#0ea5e9' })
          ),
          _react2['default'].createElement(
            _reactNative.View,
            { style: styles.userInfo },
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.userName },
              user ? user.name : 'John Customer'
            ),
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.userEmail },
              user ? user.email : 'john@example.com'
            )
          ),
          _react2['default'].createElement(
            _reactNative.TouchableOpacity,
            { onPress: onClose, style: styles.closeButton },
            _react2['default'].createElement(_lucideReactNative.X, { size: 20, color: '#64748b' })
          )
        ),
        _react2['default'].createElement(
          _reactNative.ScrollView,
          { style: styles.menuList },
          menuItems.map(function (item) {
            var IconComp = item.icon;
            return _react2['default'].createElement(
              _reactNative.TouchableOpacity,
              {
                key: item.id,
                style: styles.menuItem,
                onPress: function () {
                  onClose();
                  onNavigate(item.id);
                }
              },
              _react2['default'].createElement(IconComp, { size: 20, color: '#0ea5e9' }),
              _react2['default'].createElement(
                _reactNative.Text,
                { style: styles.menuLabel },
                item.label
              )
            );
          }),
          _react2['default'].createElement(_reactNative.View, { style: styles.divider }),
          _react2['default'].createElement(
            _reactNative.TouchableOpacity,
            { style: styles.menuItem, onPress: handleLogout },
            _react2['default'].createElement(_lucideReactNative.LogOut, { size: 20, color: '#f59e0b' }),
            _react2['default'].createElement(
              _reactNative.Text,
              { style: [styles.menuLabel, { color: '#f59e0b' }] },
              'Logout'
            )
          ),
          _react2['default'].createElement(
            _reactNative.TouchableOpacity,
            { style: styles.menuItem, onPress: handleDeleteAccount },
            _react2['default'].createElement(_lucideReactNative.Trash2, { size: 20, color: '#ef4444' }),
            _react2['default'].createElement(
              _reactNative.Text,
              { style: [styles.menuLabel, { color: '#ef4444' }] },
              'Delete Account'
            )
          )
        ),
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.footer },
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.footerText },
            'Gouri Aqua Plast v1.0'
          ),
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.footerSub },
            'Ganesh Gouri Industries • Quotation Only'
          )
        )
      )
    )
  );
}

var styles = _reactNative.StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-start'
  },
  menuContainer: {
    width: '82%',
    height: '100%',
    backgroundColor: '#ffffff',
    paddingTop: 45,
    paddingHorizontal: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    marginBottom: 15
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(14, 165, 233, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  userInfo: {
    flex: 1
  },
  userName: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '800'
  },
  userEmail: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 2
  },
  closeButton: {
    padding: 6
  },
  menuList: {
    flex: 1
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 14
  },
  menuLabel: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '600'
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 15
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    alignItems: 'center'
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700'
  },
  footerSub: {
    color: '#0ea5e9',
    fontSize: 11,
    marginTop: 2
  }
});
module.exports = exports['default'];
/* Header */ /* Menu Options */ /* Policy footer */