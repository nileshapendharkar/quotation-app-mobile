"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var FavoriteContext = (0, _react.createContext)();

exports.FavoriteContext = FavoriteContext;
var FavoriteProvider = function FavoriteProvider(_ref) {
  var children = _ref.children;

  var _useState = (0, _react.useState)([{
    id: "prod_1",
    name: "Pro-Grade Heavy Duty Safety Helmet",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&q=80",
    categoryName: "Industrial Safety"
  }, {
    id: "prod_3",
    name: "Ergonomic Mesh Task Chair",
    image: "https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=500&q=80",
    categoryName: "Office Electronics"
  }]);

  var _useState2 = _slicedToArray(_useState, 2);

  var favorites = _useState2[0];
  var setFavorites = _useState2[1];

  var toggleFavorite = function toggleFavorite(product) {
    setFavorites(function (prev) {
      var exists = prev.some(function (item) {
        return item.id === product.id;
      });
      if (exists) {
        return prev.filter(function (item) {
          return item.id !== product.id;
        });
      } else {
        return [].concat(_toConsumableArray(prev), [product]);
      }
    });
  };

  var isFavorite = function isFavorite(productId) {
    return favorites.some(function (item) {
      return item.id === productId;
    });
  };

  return _react2["default"].createElement(
    FavoriteContext.Provider,
    { value: {
        favorites: favorites,
        toggleFavorite: toggleFavorite,
        isFavorite: isFavorite
      } },
    children
  );
};
exports.FavoriteProvider = FavoriteProvider;