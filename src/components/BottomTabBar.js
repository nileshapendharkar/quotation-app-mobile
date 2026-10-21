import React, { useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { CartContext } from '../context/CartContext';

const TABS = [
  { id: 'Home', label: 'HOME', isImage: true, activeSource: require('../../assets/Home.png'), inactiveSource: require('../../assets/Home-line.png') },
  { id: 'Product', label: 'CATALOG', isImage: true, activeSource: require('../../assets/pantone.png'), inactiveSource: require('../../assets/catalog-line.png') },
  { id: 'Favorite', label: 'SAVED', isImage: true, activeSource: require('../../assets/bookmark.png'), inactiveSource: require('../../assets/Saved-line.png') },
  { id: 'Cart', label: 'CART', isImage: true, activeSource: require('../../assets/Cart.png'), inactiveSource: require('../../assets/Cart-line.png'), showBadge: true },
  { id: 'Orders', label: 'ORDER', isImage: true, activeSource: require('../../assets/order.png'), inactiveSource: require('../../assets/order-line.png') },
];

function BottomTabBar({ activeTab, onTabChange, onCatalogDoubleTap }) {
  const { cartItems } = useContext(CartContext);
  const cartCount = (cartItems && cartItems.length) || 0;
  const lastCatalogTapRef = React.useRef(0);

  const handleTabPress = (tabId) => {
    const now = Date.now();
    if (tabId === 'Product') {
      const elapsed = now - lastCatalogTapRef.current;
      if (elapsed < 450) {
        // Double-tap detected on CATALOG button
        lastCatalogTapRef.current = 0;
        if (onCatalogDoubleTap) {
          onCatalogDoubleTap();
        }
        return;
      }
      lastCatalogTapRef.current = now;
    }
    onTabChange(tabId);
  };

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;
        const iconSource = isActive ? (tab.activeSource || tab.source) : (tab.inactiveSource || tab.source);
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabButton}
            onPress={() => handleTabPress(tab.id)}
            activeOpacity={0.7}
          >
            {isActive ? (
              <View style={styles.activeTabWrapper}>
                <View style={styles.activeCircle}>
                  {tab.isImage ? (
                    <Image source={iconSource} style={{ width: 32, height: 32, tintColor: '#27347a' }} resizeMode="contain" />
                  ) : (
                    <IconComponent size={32} color="#27347a" fill="#27347a" />
                  )}
                </View>
                {tab.label ? <Text style={styles.activeTabLabel}>{tab.label}</Text> : null}
              </View>
            ) : (
              <View style={styles.inactiveIconContainer}>
                {tab.isImage ? (
                  <Image source={iconSource} style={{ width: 28, height: 28, tintColor: '#334155' }} resizeMode="contain" />
                ) : (
                  <IconComponent size={28} color="#334155" />
                )}
                {tab.showBadge && cartCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{cartCount}</Text>
                  </View>
                )}
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default React.memo(BottomTabBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#ffffff',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1.5,
    borderTopColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 20,
    zIndex: 1000,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
    position: 'relative',
  },
  activeTabWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
  },
  activeCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.5,
    borderColor: '#27347a',
    shadowColor: '#27347a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
    marginBottom: 4,
  },
  activeTabLabel: {
    fontSize: 12,
    color: '#27347a',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  inactiveIconContainer: {
    position: 'relative',
    padding: 8,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: -4,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '900',
  },
});
