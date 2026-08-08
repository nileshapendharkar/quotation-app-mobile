'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports['default'] = RegisterScreen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _lucideReactNative = require('lucide-react-native');

var _contextAuthContext = require('../context/AuthContext');

function RegisterScreen(_ref) {
  var _this = this;

  var onNavigateLogin = _ref.onNavigateLogin;

  var _useContext = (0, _react.useContext)(_contextAuthContext.AuthContext);

  var register = _useContext.register;

  var _useState = (0, _react.useState)('');

  var _useState2 = _slicedToArray(_useState, 2);

  var name = _useState2[0];
  var setName = _useState2[1];

  var _useState3 = (0, _react.useState)('');

  var _useState32 = _slicedToArray(_useState3, 2);

  var email = _useState32[0];
  var setEmail = _useState32[1];

  var _useState4 = (0, _react.useState)('');

  var _useState42 = _slicedToArray(_useState4, 2);

  var mobile = _useState42[0];
  var setMobile = _useState42[1];

  var _useState5 = (0, _react.useState)('');

  var _useState52 = _slicedToArray(_useState5, 2);

  var password = _useState52[0];
  var setPassword = _useState52[1];

  var _useState6 = (0, _react.useState)('');

  var _useState62 = _slicedToArray(_useState6, 2);

  var companyName = _useState62[0];
  var setCompanyName = _useState62[1];

  var _useState7 = (0, _react.useState)('');

  var _useState72 = _slicedToArray(_useState7, 2);

  var companyAddress = _useState72[0];
  var setCompanyAddress = _useState72[1];

  var _useState8 = (0, _react.useState)(false);

  var _useState82 = _slicedToArray(_useState8, 2);

  var loading = _useState82[0];
  var setLoading = _useState82[1];

  var _useState9 = (0, _react.useState)('');

  var _useState92 = _slicedToArray(_useState9, 2);

  var error = _useState92[0];
  var setError = _useState92[1];

  var handleRegister = function handleRegister() {
    var res;
    return regeneratorRuntime.async(function handleRegister$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          setError('');

          if (!(!name || !email || !mobile || !password)) {
            context$2$0.next = 4;
            break;
          }

          setError('Please fill in Name, Email, Mobile and Password');
          return context$2$0.abrupt('return');

        case 4:
          setLoading(true);
          context$2$0.next = 7;
          return regeneratorRuntime.awrap(register({
            name: name,
            email: email,
            mobile: mobile,
            password: password,
            companyName: companyName,
            companyAddress: companyAddress
          }));

        case 7:
          res = context$2$0.sent;

          setLoading(false);
          if (!res.success) {
            setError(res.message);
          }

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  return _react2['default'].createElement(
    _reactNative.ScrollView,
    { style: styles.container, contentContainerStyle: styles.content },
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
        'Create Customer Account'
      ),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.subtitle },
        'Register to generate product quotations'
      )
    ),
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
        _react2['default'].createElement(_lucideReactNative.User, { size: 18, color: '#64748b', style: styles.icon }),
        _react2['default'].createElement(_reactNative.TextInput, {
          style: styles.input,
          placeholder: 'Full Name *',
          placeholderTextColor: '#64748b',
          value: name,
          onChangeText: setName
        })
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.inputContainer },
        _react2['default'].createElement(_lucideReactNative.Mail, { size: 18, color: '#64748b', style: styles.icon }),
        _react2['default'].createElement(_reactNative.TextInput, {
          style: styles.input,
          placeholder: 'Email Address *',
          placeholderTextColor: '#64748b',
          value: email,
          onChangeText: setEmail,
          autoCapitalize: 'none',
          keyboardType: 'email-address'
        })
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.inputContainer },
        _react2['default'].createElement(_lucideReactNative.Phone, { size: 18, color: '#64748b', style: styles.icon }),
        _react2['default'].createElement(_reactNative.TextInput, {
          style: styles.input,
          placeholder: 'Mobile Number *',
          placeholderTextColor: '#64748b',
          value: mobile,
          onChangeText: setMobile,
          keyboardType: 'phone-pad'
        })
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.inputContainer },
        _react2['default'].createElement(_lucideReactNative.Lock, { size: 18, color: '#64748b', style: styles.icon }),
        _react2['default'].createElement(_reactNative.TextInput, {
          style: styles.input,
          placeholder: 'Password *',
          placeholderTextColor: '#64748b',
          secureTextEntry: true,
          value: password,
          onChangeText: setPassword
        })
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.inputContainer },
        _react2['default'].createElement(_lucideReactNative.Building, { size: 18, color: '#64748b', style: styles.icon }),
        _react2['default'].createElement(_reactNative.TextInput, {
          style: styles.input,
          placeholder: 'Company / Business Name (Optional)',
          placeholderTextColor: '#64748b',
          value: companyName,
          onChangeText: setCompanyName
        })
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.inputContainer },
        _react2['default'].createElement(_lucideReactNative.MapPin, { size: 18, color: '#64748b', style: styles.icon }),
        _react2['default'].createElement(_reactNative.TextInput, {
          style: styles.input,
          placeholder: 'Company Address (Optional)',
          placeholderTextColor: '#64748b',
          value: companyAddress,
          onChangeText: setCompanyAddress
        })
      ),
      _react2['default'].createElement(
        _reactNative.TouchableOpacity,
        { style: styles.submitBtn, onPress: handleRegister, disabled: loading },
        loading ? _react2['default'].createElement(_reactNative.ActivityIndicator, { color: '#000' }) : _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.submitText },
          'Complete Registration'
        )
      )
    )
  );
}

var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 40
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
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a'
  },
  subtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4
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
    alignItems: 'center',
    marginTop: 10
  },
  submitText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800'
  }
});
module.exports = exports['default'];