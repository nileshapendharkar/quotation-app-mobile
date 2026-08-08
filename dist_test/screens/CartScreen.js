'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports['default'] = CartScreen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _lucideReactNative = require('lucide-react-native');

var _contextCartContext = require('../context/CartContext');

var _contextAuthContext = require('../context/AuthContext');

var _api = require('../api');

function CartScreen(_ref) {
  var _this = this;

  var onNavigateOrders = _ref.onNavigateOrders;

  var _useContext = (0, _react.useContext)(_contextCartContext.CartContext);

  var cartItems = _useContext.cartItems;
  var updateQuantity = _useContext.updateQuantity;
  var removeFromCart = _useContext.removeFromCart;
  var clearCart = _useContext.clearCart;

  var _useContext2 = (0, _react.useContext)(_contextAuthContext.AuthContext);

  var user = _useContext2.user;

  var _useState = (0, _react.useState)(false);

  var _useState2 = _slicedToArray(_useState, 2);

  var pdfModalVisible = _useState2[0];
  var setPdfModalVisible = _useState2[1];

  var _useState3 = (0, _react.useState)(null);

  var _useState32 = _slicedToArray(_useState3, 2);

  var generatedOrder = _useState32[0];
  var setGeneratedOrder = _useState32[1];

  var _useState4 = (0, _react.useState)(false);

  var _useState42 = _slicedToArray(_useState4, 2);

  var submitting = _useState42[0];
  var setSubmitting = _useState42[1];

  var handleGenerateQuotation = function handleGenerateQuotation() {
    var orderData, res, mockOrder;
    return regeneratorRuntime.async(function handleGenerateQuotation$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!(cartItems.length === 0)) {
            context$2$0.next = 2;
            break;
          }

          return context$2$0.abrupt('return');

        case 2:

          setSubmitting(true);
          orderData = {
            items: cartItems.map(function (i) {
              return {
                productId: i.productId,
                productName: i.productName,
                quantity: i.quantity,
                size: i.size || ''
              };
            }),
            notes: "Generated via Mobile Quotation App"
          };
          context$2$0.next = 6;
          return regeneratorRuntime.awrap((0, _api.apiRequest)('/orders/create', 'POST', orderData));

        case 6:
          res = context$2$0.sent;

          setSubmitting(false);

          if (res.success && res.order) {
            setGeneratedOrder(res.order);
            setPdfModalVisible(true);
            clearCart();
          } else {
            mockOrder = {
              id: 'ord_' + Date.now(),
              orderNo: 'QT-2026-' + Math.floor(1000 + Math.random() * 9000),
              userName: user ? user.name : 'John Customer',
              userEmail: user ? user.email : 'john@example.com',
              userMobile: user ? user.mobile : '+1987654321',
              companyName: user ? user.companyName : 'Apex Logistics Ltd',
              items: cartItems,
              createdAt: new Date().toISOString()
            };

            setGeneratedOrder(mockOrder);
            setPdfModalVisible(true);
            clearCart();
          }

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  var handleShareWhatsApp = function handleShareWhatsApp() {
    var itemsText, message, url;
    return regeneratorRuntime.async(function handleShareWhatsApp$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (generatedOrder) {
            context$2$0.next = 2;
            break;
          }

          return context$2$0.abrupt('return');

        case 2:
          itemsText = generatedOrder.items.map(function (item) {
            return '• ' + item.productName + (item.size ? ' (Size: ' + item.size + ')' : '') + ' (Qty: ' + item.quantity + ')';
          }).join('\n');
          message = '*Gouri Aqua Plast - Product Quotation*\n' + ('*Ref:* ' + generatedOrder.orderNo + '\n\n') + '*Customer Details:*\n' + ('Name: ' + generatedOrder.userName + '\n') + ('Mobile: ' + generatedOrder.userMobile + '\n') + ('Company: ' + (generatedOrder.companyName || 'Individual') + '\n\n') + ('*Items Requested:*\n' + itemsText + '\n\n') + '*Policy:* Zero Price Mode (Quotation request only).';
          url = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(message);
          context$2$0.prev = 5;
          context$2$0.next = 8;
          return regeneratorRuntime.awrap(_reactNative.Linking.openURL(url));

        case 8:
          context$2$0.next = 13;
          break;

        case 10:
          context$2$0.prev = 10;
          context$2$0.t0 = context$2$0['catch'](5);

          _reactNative.Alert.alert('Cannot Open WhatsApp', 'Please verify that WhatsApp is installed on your device.');

        case 13:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[5, 10]]);
  };

  return _react2['default'].createElement(
    _reactNative.View,
    { style: styles.container },
    _react2['default'].createElement(
      _reactNative.View,
      { style: styles.topHeader },
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.headerTitle },
        'Quotation Builder (Cart)'
      ),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.headerSub },
        'Select Product Quantities • Zero Price Policy'
      )
    ),
    cartItems.length === 0 ? _react2['default'].createElement(
      _reactNative.View,
      { style: styles.emptyBox },
      _react2['default'].createElement(_lucideReactNative.ShoppingBag, { size: 48, color: '#334155' }),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.emptyTitle },
        'Quotation Cart is Empty'
      ),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.emptySub },
        'Add products from catalog to request a quotation.'
      )
    ) : _react2['default'].createElement(
      _reactNative.View,
      { style: { flex: 1 } },
      _react2['default'].createElement(_reactNative.FlatList, {
        data: cartItems,
        keyExtractor: function (item) {
          return item.productId + '_' + (item.size || '');
        },
        numColumns: 2,
        renderItem: function (_ref2) {
          var item = _ref2.item;
          return _react2['default'].createElement(
            _reactNative.View,
            { style: styles.cartCard },
            _react2['default'].createElement(
              _reactNative.View,
              { style: styles.imageContainer },
              _react2['default'].createElement(_reactNative.Image, { source: { uri: (0, _api.getImageUrl)(item.image) }, style: styles.cardImage }),
              _react2['default'].createElement(
                _reactNative.TouchableOpacity,
                {
                  style: styles.deleteBadge,
                  onPress: function () {
                    return removeFromCart(item.productId, item.size);
                  }
                },
                _react2['default'].createElement(_lucideReactNative.Trash2, { size: 14, color: '#ef4444' })
              )
            ),
            _react2['default'].createElement(
              _reactNative.View,
              { style: styles.cardContent },
              _react2['default'].createElement(
                _reactNative.Text,
                { style: styles.cardTitle, numberOfLines: 2 },
                item.productName
              ),
              item.size ? _react2['default'].createElement(
                _reactNative.View,
                { style: styles.sizeBadge },
                _react2['default'].createElement(
                  _reactNative.Text,
                  { style: styles.sizeText },
                  'Size: ',
                  item.size
                )
              ) : null,
              _react2['default'].createElement(
                _reactNative.Text,
                { style: styles.policyLabel },
                'Quantity Based Quote'
              ),
              _react2['default'].createElement(
                _reactNative.View,
                { style: styles.qtyContainer },
                _react2['default'].createElement(
                  _reactNative.TouchableOpacity,
                  {
                    style: styles.qtyBtn,
                    onPress: function () {
                      return updateQuantity(item.productId, -1, item.size);
                    }
                  },
                  _react2['default'].createElement(_lucideReactNative.Minus, { size: 14, color: '#f8fafc' })
                ),
                _react2['default'].createElement(
                  _reactNative.Text,
                  { style: styles.qtyValue },
                  item.quantity
                ),
                _react2['default'].createElement(
                  _reactNative.TouchableOpacity,
                  {
                    style: styles.qtyBtn,
                    onPress: function () {
                      return updateQuantity(item.productId, 1, item.size);
                    }
                  },
                  _react2['default'].createElement(_lucideReactNative.Plus, { size: 14, color: '#f8fafc' })
                )
              )
            )
          );
        },
        contentContainerStyle: styles.gridContent
      }),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.bottomBar },
        _react2['default'].createElement(
          _reactNative.TouchableOpacity,
          { style: styles.cancelBtn, onPress: clearCart },
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.cancelText },
            'Cancel'
          )
        ),
        _react2['default'].createElement(
          _reactNative.TouchableOpacity,
          {
            style: styles.generateBtn,
            onPress: handleGenerateQuotation,
            disabled: submitting
          },
          _react2['default'].createElement(_lucideReactNative.FileCheck, { size: 18, color: '#000' }),
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.generateText },
            submitting ? 'Generating...' : 'Generate Quotation'
          )
        )
      )
    ),
    pdfModalVisible && generatedOrder && _react2['default'].createElement(
      _reactNative.Modal,
      { visible: pdfModalVisible, animationType: 'slide', transparent: true },
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.pdfOverlay },
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.pdfCard },
          _react2['default'].createElement(
            _reactNative.View,
            { style: styles.pdfHeader },
            _react2['default'].createElement(
              _reactNative.View,
              null,
              _react2['default'].createElement(
                _reactNative.Text,
                { style: styles.pdfTitle },
                'PRODUCT QUOTATION PDF'
              ),
              _react2['default'].createElement(
                _reactNative.Text,
                { style: styles.pdfRef },
                generatedOrder.orderNo
              )
            ),
            _react2['default'].createElement(
              _reactNative.TouchableOpacity,
              { onPress: function () {
                  return setPdfModalVisible(false);
                } },
              _react2['default'].createElement(_lucideReactNative.X, { size: 20, color: '#94a3b8' })
            )
          ),
          _react2['default'].createElement(
            _reactNative.View,
            { style: styles.customerBox },
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.custLabel },
              'CUSTOMER DETAILS'
            ),
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.custName },
              generatedOrder.userName
            ),
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.custSub },
              generatedOrder.userEmail,
              ' | ',
              generatedOrder.userMobile
            ),
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.custSub },
              generatedOrder.companyName || 'Individual'
            )
          ),
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.sectionHeading },
            'QUOTATION ITEMS LIST (NO PRICING)'
          ),
          _react2['default'].createElement(
            _reactNative.View,
            { style: styles.pdfItemsList },
            generatedOrder.items.map(function (item, idx) {
              return _react2['default'].createElement(
                _reactNative.View,
                { key: idx, style: styles.pdfItemRow },
                _react2['default'].createElement(
                  _reactNative.Text,
                  { style: styles.pdfItemName },
                  item.productName
                ),
                _react2['default'].createElement(
                  _reactNative.Text,
                  { style: styles.pdfItemQty },
                  item.quantity,
                  ' Units'
                )
              );
            })
          ),
          _react2['default'].createElement(
            _reactNative.View,
            { style: styles.disclaimerBox },
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.disclaimerText },
              '✓ Quotation created successfully. Omitted price fields as per strict policy.'
            )
          ),
          _react2['default'].createElement(
            _reactNative.View,
            { style: styles.pdfActions },
            _react2['default'].createElement(
              _reactNative.TouchableOpacity,
              {
                style: styles.shareBtn,
                onPress: handleShareWhatsApp
              },
              _react2['default'].createElement(_lucideReactNative.Share2, { size: 16, color: '#0ea5e9' }),
              _react2['default'].createElement(
                _reactNative.Text,
                { style: styles.shareText },
                'Share via WhatsApp'
              )
            ),
            _react2['default'].createElement(
              _reactNative.TouchableOpacity,
              {
                style: styles.doneBtn,
                onPress: function () {
                  setPdfModalVisible(false);
                  onNavigateOrders && onNavigateOrders();
                }
              },
              _react2['default'].createElement(
                _reactNative.Text,
                { style: styles.doneText },
                'View Orders'
              )
            )
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
  gridContent: {
    padding: 8,
    paddingBottom: 90
  },
  cartCard: {
    flex: 1,
    margin: 6,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  imageContainer: {
    height: 110,
    backgroundColor: '#f1f5f9',
    position: 'relative'
  },
  cardImage: {
    width: '100%',
    height: '100%'
  },
  deleteBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 6,
    borderRadius: 12
  },
  cardContent: {
    padding: 10
  },
  cardTitle: {
    color: '#0f172a',
    fontSize: 12,
    fontWeight: '700',
    height: 32
  },
  policyLabel: {
    color: '#0ea5e9',
    fontSize: 10,
    marginTop: 2,
    marginBottom: 8
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  qtyValue: {
    color: '#0ea5e9',
    fontSize: 14,
    fontWeight: '800'
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 12
  },
  cancelBtn: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelText: {
    color: '#fca5a5',
    fontSize: 14,
    fontWeight: '700'
  },
  generateBtn: {
    flex: 2,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#0ea5e9',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  generateText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800'
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
  /* PDF Modal */
  pdfOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    padding: 20
  },
  pdfCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#0ea5e9'
  },
  pdfHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 12,
    marginBottom: 16
  },
  pdfTitle: {
    color: '#0ea5e9',
    fontSize: 16,
    fontWeight: '800'
  },
  pdfRef: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 2
  },
  customerBox: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16
  },
  custLabel: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 4
  },
  custName: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '700'
  },
  custSub: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 2
  },
  sectionHeading: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 8
  },
  pdfItemsList: {
    gap: 8,
    marginBottom: 16
  },
  pdfItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 8
  },
  pdfItemName: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '600',
    flex: 1
  },
  pdfItemQty: {
    color: '#0ea5e9',
    fontSize: 13,
    fontWeight: '800'
  },
  disclaimerBox: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16
  },
  disclaimerText: {
    color: '#10b981',
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '600'
  },
  pdfActions: {
    flexDirection: 'row',
    gap: 10
  },
  shareBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0ea5e9',
    gap: 6
  },
  shareText: {
    color: '#0ea5e9',
    fontSize: 13,
    fontWeight: '700'
  },
  doneBtn: {
    flex: 1,
    backgroundColor: '#0ea5e9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  doneText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800'
  },
  sizeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(14, 165, 233, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    marginBottom: 2
  },
  sizeText: {
    color: '#0ea5e9',
    fontSize: 9,
    fontWeight: '700'
  }
});
module.exports = exports['default'];

// Fallback mock order if backend offline
/* Header */ /* Products Grid (2 per row) */ /* Quantity Stepper (Increase/Decrease) */ /* Bottom Action Buttons */ /* Generated Quotation PDF Preview Modal */