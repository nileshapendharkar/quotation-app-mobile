'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ProductCard;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _lucideReactNative = require('lucide-react-native');

var _contextFavoriteContext = require('../context/FavoriteContext');

var _contextCartContext = require('../context/CartContext');

var _api = require('../api');

function ProductCard(_ref) {
  var product = _ref.product;
  var onSelect = _ref.onSelect;

  var _useContext = (0, _react.useContext)(_contextFavoriteContext.FavoriteContext);

  var toggleFavorite = _useContext.toggleFavorite;
  var isFavorite = _useContext.isFavorite;

  var _useContext2 = (0, _react.useContext)(_contextCartContext.CartContext);

  var addToCart = _useContext2.addToCart;

  var favorited = isFavorite(product.id);

  return _react2['default'].createElement(
    _reactNative.View,
    { style: styles.card },
    _react2['default'].createElement(
      _reactNative.TouchableOpacity,
      { activeOpacity: 0.8, onPress: function () {
          return onSelect && onSelect(product);
        } },
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.imageContainer },
        _react2['default'].createElement(_reactNative.Image, { source: (0, _api.getImageUrl)(product.image), style: styles.image, resizeMode: 'cover' }),
        _react2['default'].createElement(
          _reactNative.TouchableOpacity,
          {
            style: styles.heartButton,
            onPress: function () {
              return toggleFavorite(product);
            }
          },
          _react2['default'].createElement(_lucideReactNative.Heart, { size: 18, color: favorited ? '#ef4444' : '#ffffff', fill: favorited ? '#ef4444' : 'transparent' })
        ),
        product.categoryName && _react2['default'].createElement(
          _reactNative.View,
          { style: styles.categoryBadge },
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.categoryText },
            product.categoryName
          )
        )
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.content },
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.title, numberOfLines: 2 },
          product.name
        ),
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.policyTag },
          'Zero Price • Quotation Only'
        ),
        _react2['default'].createElement(
          _reactNative.TouchableOpacity,
          {
            style: styles.addButton,
            onPress: function () {
              return onSelect && onSelect(product);
            }
          },
          _react2['default'].createElement(_lucideReactNative.PlusCircle, { size: 16, color: '#ffffff' }),
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.addButtonText },
            'Select Size & Qty'
          )
        )
      )
    )
  );
}

var styles = _reactNative.StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  imageContainer: {
    height: 140,
    position: 'relative',
    backgroundColor: '#f1f5f9'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 6,
    borderRadius: 20
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800'
  },
  content: {
    padding: 12
  },
  title: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
    marginBottom: 4
  },
  policyTag: {
    color: '#0ea5e9',
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 10
  },
  addButton: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800'
  }
});
module.exports = exports['default'];