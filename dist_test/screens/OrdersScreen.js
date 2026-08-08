'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports['default'] = OrdersScreen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _lucideReactNative = require('lucide-react-native');

var _contextAuthContext = require('../context/AuthContext');

var _api = require('../api');

function OrdersScreen() {
  var _this = this;

  var _useContext = (0, _react.useContext)(_contextAuthContext.AuthContext);

  var user = _useContext.user;

  var _useState = (0, _react.useState)('All');

  var _useState2 = _slicedToArray(_useState, 2);

  var activeTab = _useState2[0];
  var setActiveTab = _useState2[1];

  var _useState3 = (0, _react.useState)([{
    id: "ord_1001",
    orderNo: "QT-2026-1001",
    status: "Pending",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    items: [{ productName: "Pro-Grade Heavy Duty Safety Helmet", quantity: 100 }, { productName: "High-Visibility Reflective Vest (Class 3)", quantity: 200 }]
  }, {
    id: "ord_1002",
    orderNo: "QT-2026-1002",
    status: "Dispatched",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    items: [{ productName: "Precision Hydraulic Pressure Control Valve", quantity: 15 }]
  }]);

  var _useState32 = _slicedToArray(_useState3, 2);

  var orders = _useState32[0];
  var setOrders = _useState32[1];

  (0, _react.useEffect)(function () {
    fetchOrders();
  }, [activeTab]);

  var fetchOrders = function fetchOrders() {
    var res;
    return regeneratorRuntime.async(function fetchOrders$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return regeneratorRuntime.awrap((0, _api.apiRequest)('/orders/my-orders?status=' + activeTab));

        case 2:
          res = context$2$0.sent;

          if (res.success && res.orders && res.orders.length > 0) {
            setOrders(res.orders);
          }

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  var filteredOrders = orders.filter(function (o) {
    if (activeTab === 'All') return true;
    return o.status.toLowerCase() === activeTab.toLowerCase();
  });

  var renderStatusBadge = function renderStatusBadge(status) {
    if (status === 'Pending') {
      return _react2['default'].createElement(
        _reactNative.View,
        { style: [styles.badge, styles.badgePending] },
        _react2['default'].createElement(_lucideReactNative.Clock, { size: 12, color: '#d97706' }),
        _react2['default'].createElement(
          _reactNative.Text,
          { style: [styles.badgeText, { color: '#d97706' }] },
          'Pending'
        )
      );
    }
    if (status === 'Dispatched') {
      return _react2['default'].createElement(
        _reactNative.View,
        { style: [styles.badge, styles.badgeDispatched] },
        _react2['default'].createElement(_lucideReactNative.CheckCircle2, { size: 12, color: '#059669' }),
        _react2['default'].createElement(
          _reactNative.Text,
          { style: [styles.badgeText, { color: '#059669' }] },
          'Dispatched'
        )
      );
    }
    return _react2['default'].createElement(
      _reactNative.View,
      { style: [styles.badge, styles.badgeCancelled] },
      _react2['default'].createElement(_lucideReactNative.XCircle, { size: 12, color: '#dc2626' }),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: [styles.badgeText, { color: '#dc2626' }] },
        'Cancelled'
      )
    );
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
        'Quotation Orders History'
      ),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.headerSub },
        'Track Status • Product Name & Qty Only'
      )
    ),
    _react2['default'].createElement(
      _reactNative.View,
      { style: styles.tabsRow },
      ['All', 'Pending', 'Dispatched', 'Cancelled'].map(function (tab) {
        return _react2['default'].createElement(
          _reactNative.TouchableOpacity,
          {
            key: tab,
            style: [styles.tabBtn, activeTab === tab && styles.tabBtnActive],
            onPress: function () {
              return setActiveTab(tab);
            }
          },
          _react2['default'].createElement(
            _reactNative.Text,
            { style: [styles.tabText, activeTab === tab && styles.tabTextActive] },
            tab
          )
        );
      })
    ),
    filteredOrders.length === 0 ? _react2['default'].createElement(
      _reactNative.View,
      { style: styles.emptyBox },
      _react2['default'].createElement(_lucideReactNative.ClipboardList, { size: 48, color: '#334155' }),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.emptyTitle },
        'No ',
        activeTab,
        ' Orders Found'
      ),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.emptySub },
        'Your quotation requests will appear here.'
      )
    ) : _react2['default'].createElement(_reactNative.FlatList, {
      data: filteredOrders,
      keyExtractor: function (item) {
        return item.id;
      },
      contentContainerStyle: styles.listContent,
      renderItem: function (_ref) {
        var item = _ref.item;
        return _react2['default'].createElement(
          _reactNative.View,
          { style: styles.orderCard },
          _react2['default'].createElement(
            _reactNative.View,
            { style: styles.cardHeader },
            _react2['default'].createElement(
              _reactNative.View,
              null,
              _react2['default'].createElement(
                _reactNative.Text,
                { style: styles.orderNo },
                item.orderNo
              ),
              _react2['default'].createElement(
                _reactNative.Text,
                { style: styles.orderDate },
                new Date(item.createdAt).toLocaleDateString()
              )
            ),
            renderStatusBadge(item.status)
          ),
          _react2['default'].createElement(_reactNative.View, { style: styles.divider }),
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.sectionLabel },
            'REQUESTED ITEMS (NO PRICING)'
          ),
          _react2['default'].createElement(
            _reactNative.View,
            { style: styles.itemsList },
            item.items.map(function (prod, idx) {
              return _react2['default'].createElement(
                _reactNative.View,
                { key: idx, style: styles.itemRow },
                _react2['default'].createElement(
                  _reactNative.Text,
                  { style: styles.itemTitle },
                  prod.productName,
                  prod.size ? ' (Size: ' + prod.size + ')' : ''
                ),
                _react2['default'].createElement(
                  _reactNative.Text,
                  { style: styles.itemQty },
                  '× ',
                  prod.quantity,
                  ' Units'
                )
              );
            })
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
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8
  },
  tabBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  tabBtnActive: {
    backgroundColor: '#0ea5e9',
    borderColor: '#0ea5e9'
  },
  tabText: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600'
  },
  tabTextActive: {
    color: '#ffffff',
    fontWeight: '800'
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
    gap: 14
  },
  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  orderNo: {
    color: '#0ea5e9',
    fontSize: 15,
    fontWeight: '800'
  },
  orderDate: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 2
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4
  },
  badgePending: {
    backgroundColor: 'rgba(217, 119, 6, 0.12)'
  },
  badgeDispatched: {
    backgroundColor: 'rgba(5, 150, 105, 0.12)'
  },
  badgeCancelled: {
    backgroundColor: 'rgba(220, 38, 38, 0.12)'
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800'
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 12
  },
  sectionLabel: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 8
  },
  itemsList: {
    gap: 6
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 8
  },
  itemTitle: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '600',
    flex: 1
  },
  itemQty: {
    color: '#0ea5e9',
    fontSize: 13,
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
  }
});
module.exports = exports['default'];
/* Header */ /* Tabs */