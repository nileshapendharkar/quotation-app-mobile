'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports['default'] = LoginScreen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _lucideReactNative = require('lucide-react-native');

var _contextAuthContext = require('../context/AuthContext');

function LoginScreen(_ref) {
  var _this = this;

  var onNavigateRegister = _ref.onNavigateRegister;
  var onNavigateForgot = _ref.onNavigateForgot;

  var _useContext = (0, _react.useContext)(_contextAuthContext.AuthContext);

  var login = _useContext.login;

  var _useState = (0, _react.useState)('9225087140');

  var _useState2 = _slicedToArray(_useState, 2);

  var userId = _useState2[0];
  var setUserId = _useState2[1];

  var _useState3 = (0, _react.useState)('GGi#4321');

  var _useState32 = _slicedToArray(_useState3, 2);

  var password = _useState32[0];
  var setPassword = _useState32[1];

  var _useState4 = (0, _react.useState)(false);

  var _useState42 = _slicedToArray(_useState4, 2);

  var loading = _useState42[0];
  var setLoading = _useState42[1];

  var _useState5 = (0, _react.useState)('');

  var _useState52 = _slicedToArray(_useState5, 2);

  var error = _useState52[0];
  var setError = _useState52[1];

  var handleLogin = function handleLogin() {
    var res;
    return regeneratorRuntime.async(function handleLogin$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          setError('');

          if (!(!userId || !password)) {
            context$2$0.next = 4;
            break;
          }

          setError('Please enter your Mobile Number / User ID and Password');
          return context$2$0.abrupt('return');

        case 4:
          setLoading(true);
          context$2$0.next = 7;
          return regeneratorRuntime.awrap(login(userId, password));

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
    _reactNative.View,
    { style: styles.container },
    _react2['default'].createElement(
      _reactNative.View,
      { style: styles.brandBox },
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.logo },
        _react2['default'].createElement(_lucideReactNative.ShieldCheck, { size: 32, color: '#000' })
      ),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.brandTitle },
        'Gouri Aqua Plast'
      ),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.brandSubtitle },
        'Ganesh Gouri Industries • Mobile Quotation Engine'
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
        _react2['default'].createElement(_lucideReactNative.Phone, { size: 18, color: '#0ea5e9', style: styles.icon }),
        _react2['default'].createElement(_reactNative.TextInput, {
          style: styles.input,
          placeholder: 'Mobile Number / User ID',
          placeholderTextColor: '#64748b',
          value: userId,
          onChangeText: setUserId,
          autoCapitalize: 'none',
          keyboardType: 'phone-pad'
        })
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.inputContainer },
        _react2['default'].createElement(_lucideReactNative.Lock, { size: 18, color: '#0ea5e9', style: styles.icon }),
        _react2['default'].createElement(_reactNative.TextInput, {
          style: styles.input,
          placeholder: 'Password',
          placeholderTextColor: '#64748b',
          secureTextEntry: true,
          value: password,
          onChangeText: setPassword
        })
      ),
      _react2['default'].createElement(
        _reactNative.TouchableOpacity,
        { style: styles.submitBtn, onPress: handleLogin, disabled: loading },
        loading ? _react2['default'].createElement(_reactNative.ActivityIndicator, { color: '#ffffff' }) : _react2['default'].createElement(
          _react2['default'].Fragment,
          null,
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.submitText },
            'Sign In to App'
          ),
          _react2['default'].createElement(_lucideReactNative.ArrowRight, { size: 18, color: '#ffffff' })
        )
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.infoBox },
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.infoText },
          '🔒 Authorized Access Only: Only credentials created by Admin are permitted to sign in.'
        )
      )
    )
  );
}

var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  brandBox: {
    alignItems: 'center',
    marginBottom: 32
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#0ea5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a'
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#0ea5e9',
    marginTop: 4,
    fontWeight: '600'
  },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)'
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
    borderColor: '#cbd5e1',
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
    fontSize: 14,
    fontWeight: '600'
  },
  submitBtn: {
    backgroundColor: '#0ea5e9',
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8
  },
  submitText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800'
  },
  infoBox: {
    marginTop: 20,
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(14, 165, 233, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.2)'
  },
  infoText: {
    color: '#0284c7',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '600'
  }
});
module.exports = exports['default'];