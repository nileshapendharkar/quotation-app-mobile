import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, Heart, ShoppingBag, ClipboardList } from 'lucide-react-native';

export default function BottomTabBar({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'Home', label: 'Home', icon: Home },
    { id: 'Favorite', label: 'Favorite', icon: Heart },
    { id: 'Cart', label: 'Quote Cart', icon: ShoppingBag },
    { id: 'Orders', label: 'Orders', icon: ClipboardList },
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
            <IconComponent
              size={22}
              color={isActive ? '#0ea5e9' : '#64748b'}
              fill={isActive && tab.id === 'Favorite' ? '#0ea5e9' : 'transparent'}
            />
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
    height: 65,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 5,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabLabel: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 4,
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#0ea5e9',
    fontWeight: '800',
  },
});
