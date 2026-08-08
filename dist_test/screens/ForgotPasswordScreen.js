'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports['default'] = ForgotPasswordScreen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _lucideReactNative = require('lucide-react-native');

var _api = require('../api');

function ForgotPasswordScreen(_ref) {
  var _this = this;

  var onNavigateLogin = _ref.onNavigateLogin;

  var _useState = (0, _react.useState)('');

  var _useState2 = _slicedToArray(_useState, 2);

  var email = _useState2[0];
  var setEmail = _useState2[1];

  var _useState3 = (0, _react.useState)(false);

  var _useState32 = _slicedToArray(_useState3, 2);

  var loading = _useState32[0];
  var setLoading = _useState32[1];

  var _useState4 = (0, _react.useState)('');

  var _useState42 = _slicedToArray(_useState4, 2);

  var message = _useState42[0];
  var setMessage = _useState42[1];

  var _useState5 = (0, _react.useState)('');

  var _useState52 = _slicedToArray(_useState5, 2);

  var error = _useState52[0];
  var setError = _useState52[1];

  var handleReset = function handleReset() {
    var res;
    return regeneratorRuntime.async(function handleReset$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          setError('');
          setMessage('');

          if (email) {
            context$2$0.next = 5;
            break;
          }

          setError('Please enter your email');
          return context$2$0.abrupt('return');

        case 5:
          setLoading(true);
          context$2$0.next = 8;
          return regeneratorRuntime.awrap((0, _api.apiRequest)('/auth/forgot-password', 'POST', { email: email }));

        case 8:
          res = context$2$0.sent;

          setLoading(false);

          if (res.success) {
            setMessage(res.message);
          } else {
            setError(res.message);
          }

        case 11:
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
      { onPress: onNavigateLogin, style: styles.backBtn },
      _react2['default'].createElement(_lucideReactNative.ArrowLeft, { size: 20, color: '#0ea5e9' }),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.backText },
        'Back to Login'
      )
    ),
    _react2['default'].createElement(
      _reactNative.View,
      { style: styles.header },
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.title },
        'Forgot Password?'
      ),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.subtitle },
        'Enter your email to receive password reset instructions'
      )
    ),
    message ? _react2['default'].createElement(
      _reactNative.View,
      { style: styles.successBox },
      _react2['default'].createElement(_lucideReactNative.CheckCircle, { size: 20, color: '#10b981', style: { marginBottom: 6 } }),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.successText },
        message
      )
    ) : null,
    error ? _react2['default'].createElement(
      _reactNative.View,
      { style: styles.errorBox },
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.errorText },
        error
      )
    ) : null,
    _react2['default'].createElement(
      _reactNative.View,
      { style: styles.form },
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.inputContainer },
        _react2['default'].createElement(_lucideReactNative.Mail, { size: 18, color: '#64748b', style: styles.icon }),
        _react2['default'].createElement(_reactNative.TextInput, {
          style: styles.input,
          placeholder: 'Registered Email Address',
          placeholderTextColor: '#64748b',
          value: email,
          onChangeText: setEmail,
          autoCapitalize: 'none',
          keyboardType: 'email-address'
        })
      ),
      _react2['default'].createElement(
        _reactNative.TouchableOpacity,
        { style: styles.submitBtn, onPress: handleReset, disabled: loading },
        loading ? _react2['default'].createElement(_reactNative.ActivityIndicator, { color: '#000' }) : _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.submitText },
          'Send Reset Link'
        )
      )
    )
  );
}

var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 24,
    justifyContent: 'center'
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 30
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
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a'
  },
  subtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4
  },
  successBox: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)'
  },
  successText: {
    color: '#10b981',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600'
  },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16
  },
  errorText: {
    color: '#ef4444',
    textAlign: 'center',
    fontSize: 13
  },
  form: {
    gap: 16
  },
  inputContainer: {
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
    alignItems: 'center'
  },
  submitText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800'
  }
});
module.exports = exports['default'];