import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LayoutDashboard, Box, Heart, ShoppingBag, ReceiptText } from 'lucide-react-native';
import { CartContext } from '../context/CartContext';

export default function BottomTabBar({ activeTab, onTabChange }) {
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems?.length || 0;

  const tabs = [
    { id: 'Home', label: 'Home', icon: LayoutDashboard },
    { id: 'Product', label: 'Catalog', icon: Box },
    { id: 'Favorite', label: 'Saved', icon: Heart },
    { id: 'Cart', label: 'Cart', icon: ShoppingBag, showBadge: true },
    { id: 'Orders', label: 'Orders', icon: ReceiptText },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabButton}
            onPress={() => onTabChange(tab.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
              <IconComponent
                size={22}
                strokeWidth={isActive ? 2.5 : 2}
                color={isActive ? '#0ea5e9' : '#64748b'}
              />
              {tab.showBadge && cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 75,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    position: 'relative',
    padding: 8,
    borderRadius: 16,
    marginBottom: 2,
  },
  activeIconContainer: {
    backgroundColor: '#f0f9ff',
  },
  tabLabel: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '600',
  },
  activeTabLabel: {
    color: '#0ea5e9',
    fontWeight: '800',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 0,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: '900',
  },
});
