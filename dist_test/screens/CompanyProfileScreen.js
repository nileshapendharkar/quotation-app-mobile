'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports['default'] = CompanyProfileScreen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _lucideReactNative = require('lucide-react-native');

var _contextAuthContext = require('../context/AuthContext');

function CompanyProfileScreen(_ref) {
  var _this = this;

  var onNavigateBack = _ref.onNavigateBack;

  var _useContext = (0, _react.useContext)(_contextAuthContext.AuthContext);

  var user = _useContext.user;
  var updateProfile = _useContext.updateProfile;

  var _useState = (0, _react.useState)(user ? user.name : 'John Customer');

  var _useState2 = _slicedToArray(_useState, 2);

  var name = _useState2[0];
  var setName = _useState2[1];

  var _useState3 = (0, _react.useState)(user ? user.email : 'john@example.com');

  var _useState32 = _slicedToArray(_useState3, 1);

  var email = _useState32[0];

  var _useState4 = (0, _react.useState)(user ? user.mobile : '+1987654321');

  var _useState42 = _slicedToArray(_useState4, 2);

  var mobile = _useState42[0];
  var setMobile = _useState42[1];

  var _useState5 = (0, _react.useState)(user ? user.companyName : 'Apex Logistics Ltd');

  var _useState52 = _slicedToArray(_useState5, 2);

  var companyName = _useState52[0];
  var setCompanyName = _useState52[1];

  var _useState6 = (0, _react.useState)(user ? user.companyAddress : '45 Industrial Zone, Sector 4');

  var _useState62 = _slicedToArray(_useState6, 2);

  var companyAddress = _useState62[0];
  var setCompanyAddress = _useState62[1];

  var _useState7 = (0, _react.useState)(false);

  var _useState72 = _slicedToArray(_useState7, 2);

  var loading = _useState72[0];
  var setLoading = _useState72[1];

  var handleSave = function handleSave() {
    var res;
    return regeneratorRuntime.async(function handleSave$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          setLoading(true);
          context$2$0.next = 3;
          return regeneratorRuntime.awrap(updateProfile({
            name: name,
            mobile: mobile,
            companyName: companyName,
            companyAddress: companyAddress
          }));

        case 3:
          res = context$2$0.sent;

          setLoading(false);
          if (res.success) {
            _reactNative.Alert.alert('Success', 'Profile updated successfully');
          } else {
            _reactNative.Alert.alert('Error', res.message || 'Update failed');
          }

        case 6:
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
      _react2['default'].createElement(_lucideReactNative.Building2, { size: 32, color: '#0ea5e9', style: { marginBottom: 8 } }),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.title },
        'Company & Profile Details'
      ),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.subtitle },
        'This information appears on generated PDF quotations.'
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
          'Contact Name'
        ),
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.inputBox },
          _react2['default'].createElement(_lucideReactNative.User, { size: 18, color: '#64748b', style: styles.icon }),
          _react2['default'].createElement(_reactNative.TextInput, { style: styles.input, value: name, onChangeText: setName })
        )
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.inputGroup },
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.label },
          'Email Address (Read-only)'
        ),
        _react2['default'].createElement(
          _reactNative.View,
          { style: [styles.inputBox, { opacity: 0.6 }] },
          _react2['default'].createElement(_lucideReactNative.Mail, { size: 18, color: '#64748b', style: styles.icon }),
          _react2['default'].createElement(_reactNative.TextInput, { style: styles.input, value: email, editable: false })
        )
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.inputGroup },
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.label },
          'Mobile Phone Number'
        ),
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.inputBox },
          _react2['default'].createElement(_lucideReactNative.Phone, { size: 18, color: '#64748b', style: styles.icon }),
          _react2['default'].createElement(_reactNative.TextInput, { style: styles.input, value: mobile, onChangeText: setMobile, keyboardType: 'phone-pad' })
        )
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.inputGroup },
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.label },
          'Company / Business Name'
        ),
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.inputBox },
          _react2['default'].createElement(_lucideReactNative.Building2, { size: 18, color: '#64748b', style: styles.icon }),
          _react2['default'].createElement(_reactNative.TextInput, { style: styles.input, value: companyName, onChangeText: setCompanyName })
        )
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.inputGroup },
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.label },
          'Company Physical Address'
        ),
        _react2['default'].createElement(
          _reactNative.View,
          { style: [styles.inputBox, { height: 80, alignItems: 'flex-start', paddingTop: 12 }] },
          _react2['default'].createElement(_lucideReactNative.MapPin, { size: 18, color: '#64748b', style: styles.icon }),
          _react2['default'].createElement(_reactNative.TextInput, {
            style: [styles.input, { textAlignVertical: 'top' }],
            value: companyAddress,
            onChangeText: setCompanyAddress,
            multiline: true
          })
        )
      ),
      _react2['default'].createElement(
        _reactNative.TouchableOpacity,
        { style: styles.saveBtn, onPress: handleSave, disabled: loading },
        loading ? _react2['default'].createElement(_reactNative.ActivityIndicator, { color: '#000' }) : _react2['default'].createElement(
          _react2['default'].Fragment,
          null,
          _react2['default'].createElement(_lucideReactNative.Save, { size: 18, color: '#fff' }),
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.saveText },
            'Save Profile Changes'
          )
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
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 40
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
  saveBtn: {
    backgroundColor: '#0ea5e9',
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 12
  },
  saveText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800'
  }
});
module.exports = exports['default'];