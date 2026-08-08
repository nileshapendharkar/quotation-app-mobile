'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var CartContext = (0, _react.createContext)();

exports.CartContext = CartContext;
var CartProvider = function CartProvider(_ref) {
  var children = _ref.children;

  var _useState = (0, _react.useState)([]);

  var _useState2 = _slicedToArray(_useState, 2);

  var cartItems = _useState2[0];
  var setCartItems = _useState2[1];

  var addToCart = function addToCart(product) {
    var quantity = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
    var size = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

    var itemSize = size || '';
    setCartItems(function (prev) {
      var existingIdx = prev.findIndex(function (item) {
        return (item.productId === product.id || item.productId === product.productId) && (item.size === itemSize || !item.size && !itemSize);
      });
      if (existingIdx >= 0) {
        var updated = [].concat(_toConsumableArray(prev));
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [].concat(_toConsumableArray(prev), [{
          productId: product.id || product.productId,
          productName: product.name || product.productName,
          image: product.image,
          categoryName: product.categoryName || '',
          subCategoryName: product.subCategoryName || product.subcategoryId || '',
          quantity: quantity,
          size: itemSize
        }]);
      }
    });
  };

  var updateQuantity = function updateQuantity(productId, delta) {
    var size = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

    var itemSize = size || '';
    setCartItems(function (prev) {
      return prev.map(function (item) {
        if (item.productId === productId && (item.size === itemSize || !item.size && !itemSize)) {
          var newQty = item.quantity + delta;
          return newQty > 0 ? _extends({}, item, { quantity: newQty }) : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  var removeFromCart = function removeFromCart(productId) {
    var size = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    var itemSize = size || '';
    setCartItems(function (prev) {
      return prev.filter(function (item) {
        return !(item.productId === productId && (item.size === itemSize || !item.size && !itemSize));
      });
    });
  };

  var clearCart = function clearCart() {
    setCartItems([]);
  };

  return _react2['default'].createElement(
    CartContext.Provider,
    { value: {
        cartItems: cartItems,
        addToCart: addToCart,
        updateQuantity: updateQuantity,
        removeFromCart: removeFromCart,
        clearCart: clearCart
      } },
    children
  );
};
exports.CartProvider = CartProvider;