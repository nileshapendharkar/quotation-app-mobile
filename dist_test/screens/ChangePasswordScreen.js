'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports['default'] = ChangePasswordScreen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _lucideReactNative = require('lucide-react-native');

var _contextAuthContext = require('../context/AuthContext');

function ChangePasswordScreen(_ref) {
  var _this = this;

  var onNavigateBack = _ref.onNavigateBack;

  var _useContext = (0, _react.useContext)(_contextAuthContext.AuthContext);

  var changePassword = _useContext.changePassword;

  var _useState = (0, _react.useState)('');

  var _useState2 = _slicedToArray(_useState, 2);

  var oldPassword = _useState2[0];
  var setOldPassword = _useState2[1];

  var _useState3 = (0, _react.useState)('');

  var _useState32 = _slicedToArray(_useState3, 2);

  var newPassword = _useState32[0];
  var setNewPassword = _useState32[1];

  var _useState4 = (0, _react.useState)('');

  var _useState42 = _slicedToArray(_useState4, 2);

  var confirmPassword = _useState42[0];
  var setConfirmPassword = _useState42[1];

  var _useState5 = (0, _react.useState)(false);

  var _useState52 = _slicedToArray(_useState5, 2);

  var loading = _useState52[0];
  var setLoading = _useState52[1];

  var handleChangePassword = function handleChangePassword() {
    var res;
    return regeneratorRuntime.async(function handleChangePassword$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!(!oldPassword || !newPassword)) {
            context$2$0.next = 3;
            break;
          }

          _reactNative.Alert.alert('Error', 'Please enter current and new password');
          return context$2$0.abrupt('return');

        case 3:
          if (!(newPassword !== confirmPassword)) {
            context$2$0.next = 6;
            break;
          }

          _reactNative.Alert.alert('Error', 'New passwords do not match');
          return context$2$0.abrupt('return');

        case 6:

          setLoading(true);
          context$2$0.next = 9;
          return regeneratorRuntime.awrap(changePassword(oldPassword, newPassword));

        case 9:
          res = context$2$0.sent;

          setLoading(false);

          if (res.success) {
            _reactNative.Alert.alert('Success', 'Password changed successfully');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            onNavigateBack();
          } else {
            _reactNative.Alert.alert('Error', res.message || 'Failed to update password');
          }

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  return _react2['default'].createElement(
    _reactNative.View,
    { style: styles.container },
    _react2['default'].createElement(
      _reactNative.TouchableOpacity,
      { onPress: onNavigateBack, style: styles.backBtn },
      _react2['default'].createElement(_lucideReactNative.ArrowLeft, { size: 20, color: '#0ea5e9' }),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.backText },
        'Back'
      )
    ),
    _react2['default'].createElement(
      _reactNative.View,
      { style: styles.header },
      _react2['default'].createElement(_lucideReactNative.KeyRound, { size: 32, color: '#0ea5e9', style: { marginBottom: 8 } }),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.title },
        'Change Password'
      ),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.subtitle },
        'Update your account security password'
      )
    ),
    _react2['default'].createElement(
      _reactNative.View,
      { style: styles.form },
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.inputGroup },
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.label },
          'Current Password'
        ),
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.inputBox },
          _react2['default'].createElement(_lucideReactNative.Lock, { size: 18, color: '#64748b', style: styles.icon }),
          _react2['default'].createElement(_reactNative.TextInput, {
            style: styles.input,
            placeholder: '••••••••',
            placeholderTextColor: '#64748b',
            secureTextEntry: true,
            value: oldPassword,
            onChangeText: setOldPassword
          })
        )
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.inputGroup },
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.label },
          'New Password'
        ),
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.inputBox },
          _react2['default'].createElement(_lucideReactNative.Lock, { size: 18, color: '#64748b', style: styles.icon }),
          _react2['default'].createElement(_reactNative.TextInput, {
            style: styles.input,
            placeholder: '••••••••',
            placeholderTextColor: '#64748b',
            secureTextEntry: true,
            value: newPassword,
            onChangeText: setNewPassword
          })
        )
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.inputGroup },
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.label },
          'Confirm New Password'
        ),
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.inputBox },
          _react2['default'].createElement(_lucideReactNative.Lock, { size: 18, color: '#64748b', style: styles.icon }),
          _react2['default'].createElement(_reactNative.TextInput, {
            style: styles.input,
            placeholder: '••••••••',
            placeholderTextColor: '#64748b',
            secureTextEntry: true,
            value: confirmPassword,
            onChangeText: setConfirmPassword
          })
        )
      ),
      _react2['default'].createElement(
        _reactNative.TouchableOpacity,
        { style: styles.submitBtn, onPress: handleChangePassword, disabled: loading },
        loading ? _react2['default'].createElement(_reactNative.ActivityIndicator, { color: '#000' }) : _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.submitText },
          'Update Password'
        )
      )
    )
  );
}

var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 20,
    paddingTop: 45
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20
  },
  backText: {
    color: '#0ea5e9',
    fontSize: 14,
    fontWeight: '600'
  },
  header: {
    marginBottom: 24
  },
  title: {
    color: '#0f172a',
    fontSize: 22,
    fontWeight: '800'
  },
  subtitle: {
    color: '#64748b',
    fontSize: 13,
    marginTop: 4
  },
  form: {
    gap: 16
  },
  inputGroup: {},
  label: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50
  },
  icon: {
    marginRight: 10
  },
  input: {
    flex: 1,
    color: '#0f172a',
    fontSize: 14
  },
  submitBtn: {
    backgroundColor: '#0ea5e9',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12
  },
  submitText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800'
  }
});
module.exports = exports['default'];