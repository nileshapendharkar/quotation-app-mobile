'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _this = this;

var API_BASE_URL = 'https://quotation-app-backend.onrender.com/api';

var userToken = null;

var setAuthToken = function setAuthToken(token) {
  userToken = token;
};

exports.setAuthToken = setAuthToken;
var getImageUrl = function getImageUrl(path) {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  var baseUrl = API_BASE_URL.replace('/api', '');
  return '' + baseUrl + (path.startsWith('/') ? '' : '/') + path;
};

exports.getImageUrl = getImageUrl;
var apiRequest = function apiRequest(endpoint) {
  var method = arguments.length <= 1 || arguments[1] === undefined ? 'GET' : arguments[1];
  var body = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
  var headers, options, res, data;
  return regeneratorRuntime.async(function apiRequest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        headers = {
          'Content-Type': 'application/json'
        };

        if (userToken) {
          headers['Authorization'] = 'Bearer ' + userToken;
        }

        options = {
          method: method,
          headers: headers
        };

        if (body) {
          options.body = JSON.stringify(body);
        }

        context$1$0.prev = 4;
        context$1$0.next = 7;
        return regeneratorRuntime.awrap(fetch('' + API_BASE_URL + endpoint, options));

      case 7:
        res = context$1$0.sent;
        context$1$0.next = 10;
        return regeneratorRuntime.awrap(res.json());

      case 10:
        data = context$1$0.sent;
        return context$1$0.abrupt('return', data);

      case 14:
        context$1$0.prev = 14;
        context$1$0.t0 = context$1$0['catch'](4);

        console.error('Mobile API Error [' + endpoint + ']:', context$1$0.t0);
        return context$1$0.abrupt('return', { success: false, message: 'Network connection failed' });

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this, [[4, 14]]);
};
exports.apiRequest = apiRequest;