'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _this = this;

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _api = require('../api');

var AuthContext = (0, _react.createContext)();

exports.AuthContext = AuthContext;
var AuthProvider = function AuthProvider(_ref) {
  var children = _ref.children;

  var _useState = (0, _react.useState)(null);

  var _useState2 = _slicedToArray(_useState, 2);

  var user = _useState2[0];
  var setUser = _useState2[1];

  var _useState3 = (0, _react.useState)(null);

  var _useState32 = _slicedToArray(_useState3, 2);

  var token = _useState32[0];
  var setToken = _useState32[1];

  var _useState4 = (0, _react.useState)(false);

  var _useState42 = _slicedToArray(_useState4, 2);

  var loading = _useState42[0];
  var setLoading = _useState42[1];

  var login = function login(userId, password) {
    var res;
    return regeneratorRuntime.async(function login$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          setLoading(true);
          context$2$0.next = 3;
          return regeneratorRuntime.awrap((0, _api.apiRequest)('/auth/login', 'POST', { userId: userId, mobile: userId, password: password }));

        case 3:
          res = context$2$0.sent;

          setLoading(false);

          if (!res.success) {
            context$2$0.next = 10;
            break;
          }

          setUser(res.user);
          setToken(res.token);
          (0, _api.setAuthToken)(res.token);
          return context$2$0.abrupt('return', { success: true });

        case 10:
          return context$2$0.abrupt('return', { success: false, message: res.message || 'Login failed' });

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  var register = function register(userData) {
    var res;
    return regeneratorRuntime.async(function register$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          setLoading(true);
          context$2$0.next = 3;
          return regeneratorRuntime.awrap((0, _api.apiRequest)('/auth/register', 'POST', userData));

        case 3:
          res = context$2$0.sent;

          setLoading(false);

          if (!res.success) {
            context$2$0.next = 10;
            break;
          }

          setUser(res.user);
          setToken(res.token);
          (0, _api.setAuthToken)(res.token);
          return context$2$0.abrupt('return', { success: true });

        case 10:
          return context$2$0.abrupt('return', { success: false, message: res.message || 'Registration failed' });

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  var logout = function logout() {
    setUser(null);
    setToken(null);
    (0, _api.setAuthToken)(null);
  };

  var updateProfile = function updateProfile(profileData) {
    var res;
    return regeneratorRuntime.async(function updateProfile$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return regeneratorRuntime.awrap((0, _api.apiRequest)('/auth/profile', 'PUT', profileData));

        case 2:
          res = context$2$0.sent;

          if (!res.success) {
            context$2$0.next = 6;
            break;
          }

          setUser(res.user);
          return context$2$0.abrupt('return', { success: true, message: 'Profile updated' });

        case 6:
          return context$2$0.abrupt('return', { success: false, message: res.message || 'Update failed' });

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  var changePassword = function changePassword(oldPassword, newPassword) {
    var res;
    return regeneratorRuntime.async(function changePassword$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return regeneratorRuntime.awrap((0, _api.apiRequest)('/auth/change-password', 'POST', { oldPassword: oldPassword, newPassword: newPassword }));

        case 2:
          res = context$2$0.sent;
          return context$2$0.abrupt('return', res);

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  var deleteAccount = function deleteAccount() {
    var res;
    return regeneratorRuntime.async(function deleteAccount$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return regeneratorRuntime.awrap((0, _api.apiRequest)('/auth/delete-account', 'DELETE'));

        case 2:
          res = context$2$0.sent;

          if (res.success) {
            logout();
          }
          return context$2$0.abrupt('return', res);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  return _react2['default'].createElement(
    AuthContext.Provider,
    { value: {
        user: user,
        token: token,
        loading: loading,
        login: login,
        register: register,
        logout: logout,
        updateProfile: updateProfile,
        changePassword: changePassword,
        deleteAccount: deleteAccount
      } },
    children
  );
};
exports.AuthProvider = AuthProvider;