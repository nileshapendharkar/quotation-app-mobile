'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = FavoriteScreen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _lucideReactNative = require('lucide-react-native');

var _contextFavoriteContext = require('../context/FavoriteContext');

var _contextCartContext = require('../context/CartContext');

var _api = require('../api');

function FavoriteScreen(_ref) {
  var onNavigateHome = _ref.onNavigateHome;

  var _useContext = (0, _react.useContext)(_contextFavoriteContext.FavoriteContext);

  var favorites = _useContext.favorites;
  var toggleFavorite = _useContext.toggleFavorite;

  var _useContext2 = (0, _react.useContext)(_contextCartContext.CartContext);

  var addToCart = _useContext2.addToCart;

  return _react2['default'].createElement(
    _reactNative.View,
    { style: styles.container },
    _react2['default'].createElement(
      _reactNative.View,
      { style: styles.topHeader },
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.headerTitle },
        'Favorite Bookmarks'
      ),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.headerSub },
        favorites.length,
        ' Saved Products (Name + Image Only)'
      )
    ),
    favorites.length === 0 ? _react2['default'].createElement(
      _reactNative.View,
      { style: styles.emptyBox },
      _react2['default'].createElement(_lucideReactNative.Heart, { size: 48, color: '#334155' }),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.emptyTitle },
        'No Favorite Products Yet'
      ),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.emptySub },
        'Tap the heart icon on any product to save it here.'
      ),
      _react2['default'].createElement(
        _reactNative.TouchableOpacity,
        { style: styles.browseBtn, onPress: onNavigateHome },
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.browseText },
          'Browse Products'
        )
      )
    ) : _react2['default'].createElement(_reactNative.FlatList, {
      data: favorites,
      keyExtractor: function (item) {
        return item.id;
      },
      contentContainerStyle: styles.listContent,
      renderItem: function (_ref2) {
        var item = _ref2.item;
        return _react2['default'].createElement(
          _reactNative.View,
          { style: styles.favoriteCard },
          _react2['default'].createElement(_reactNative.Image, { source: (0, _api.getImageUrl)(item.image), style: styles.cardImage }),
          _react2['default'].createElement(
            _reactNative.View,
            { style: styles.cardInfo },
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.cardCategory },
              item.categoryName || 'Product Catalog'
            ),
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.cardTitle, numberOfLines: 2 },
              item.name
            ),
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.zeroPricePolicy },
              'Quotation Purpose • No Price'
            ),
            _react2['default'].createElement(
              _reactNative.View,
              { style: styles.actionRow },
              _react2['default'].createElement(
                _reactNative.TouchableOpacity,
                {
                  style: styles.addCartBtn,
                  onPress: function () {
                    return addToCart(item, 1);
                  }
                },
                _react2['default'].createElement(_lucideReactNative.PlusCircle, { size: 14, color: '#fff' }),
                _react2['default'].createElement(
                  _reactNative.Text,
                  { style: styles.addCartText },
                  'Add to Quote Cart'
                )
              ),
              _react2['default'].createElement(
                _reactNative.TouchableOpacity,
                {
                  style: styles.removeBtn,
                  onPress: function () {
                    return toggleFavorite(item);
                  }
                },
                _react2['default'].createElement(_lucideReactNative.Trash2, { size: 16, color: '#ef4444' })
              )
            )
          )
        );
      }
    })
  );
}

var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  topHeader: {
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  headerTitle: {
    color: '#0f172a',
    fontSize: 20,
    fontWeight: '800'
  },
  headerSub: {
    color: '#0ea5e9',
    fontSize: 12,
    marginTop: 2
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
    gap: 14
  },
  favoriteCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  cardImage: {
    width: 110,
    height: 110,
    backgroundColor: '#f1f5f9'
  },
  cardInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between'
  },
  cardCategory: {
    color: '#0ea5e9',
    fontSize: 11,
    fontWeight: '700'
  },
  cardTitle: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2
  },
  zeroPricePolicy: {
    color: '#64748b',
    fontSize: 11,
    marginVertical: 4
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6
  },
  addCartBtn: {
    backgroundColor: '#0ea5e9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4
  },
  addCartText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '800'
  },
  removeBtn: {
    padding: 6
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  emptyTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 16
  },
  emptySub: {
    color: '#64748b',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6
  },
  browseBtn: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20
  },
  browseText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 14
  }
});
module.exports = exports['default'];