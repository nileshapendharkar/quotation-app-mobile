'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = BottomTabBar;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _lucideReactNative = require('lucide-react-native');

function BottomTabBar(_ref) {
  var activeTab = _ref.activeTab;
  var onTabChange = _ref.onTabChange;

  var tabs = [{ id: 'Home', label: 'Home', icon: _lucideReactNative.Home }, { id: 'Favorite', label: 'Favorite', icon: _lucideReactNative.Heart }, { id: 'Cart', label: 'Quote Cart', icon: _lucideReactNative.ShoppingBag }, { id: 'Orders', label: 'Orders', icon: _lucideReactNative.ClipboardList }];

  return _react2['default'].createElement(
    _reactNative.View,
    { style: styles.container },
    tabs.map(function (tab) {
      var IconComponent = tab.icon;
      var isActive = activeTab === tab.id;
      return _react2['default'].createElement(
        _reactNative.TouchableOpacity,
        {
          key: tab.id,
          style: styles.tabButton,
          onPress: function () {
            return onTabChange(tab.id);
          },
          activeOpacity: 0.7
        },
        _react2['default'].createElement(IconComponent, {
          size: 22,
          color: isActive ? '#0ea5e9' : '#64748b',
          fill: isActive && tab.id === 'Favorite' ? '#0ea5e9' : 'transparent'
        }),
        _react2['default'].createElement(
          _reactNative.Text,
          { style: [styles.tabLabel, isActive && styles.activeTabLabel] },
          tab.label
        )
      );
    })
  );
}

var styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 5
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  tabLabel: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 4,
    fontWeight: '500'
  },
  activeTabLabel: {
    color: '#0ea5e9',
    fontWeight: '800'
  }
});
module.exports = exports['default'];