import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Alert } from 'react-native';
import { 
  Home, 
  Heart, 
  ShoppingBag, 
  ClipboardList, 
  Building2, 
  KeyRound, 
  LogOut, 
  Trash2, 
  X,
  UserCheck
} from 'lucide-react-native';
import { AuthContext } from '../context/AuthContext';

export default function SideMenuModal({ visible, onClose, onNavigate }) {
  const { user, logout, deleteAccount } = useContext(AuthContext);

  const menuItems = [
    { id: 'Home', label: 'Home', icon: Home },
    { id: 'Favorite', label: 'Favorite', icon: Heart },
    { id: 'Cart', label: 'Quote Cart', icon: ShoppingBag },
    { id: 'Orders', label: 'Orders', icon: ClipboardList },
    { id: 'CompanyProfile', label: 'Company Profile', icon: Building2 },
    { id: 'ChangePassword', label: 'Change Password', icon: KeyRound },
  ];

  const handleLogout = () => {
    onClose();
    logout();
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: async () => {
            onClose();
            await deleteAccount();
          } 
        }
      ]
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.menuContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.avatar}>
              <UserCheck size={24} color="#0ea5e9" />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user ? user.name : 'John Customer'}</Text>
              <Text style={styles.userEmail}>{user ? user.email : 'john@example.com'}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color="#64748b" />
            </TouchableOpacity>
          </View>

          {/* Menu Options */}
          <ScrollView style={styles.menuList}>
            {menuItems.map((item) => {
              const IconComp = item.icon;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  onPress={() => {
                    onClose();
                    onNavigate(item.id);
                  }}
                >
                  <IconComp size={20} color="#0ea5e9" />
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </TouchableOpacity>
              );
            })}

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <LogOut size={20} color="#f59e0b" />
              <Text style={[styles.menuLabel, { color: '#f59e0b' }]}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleDeleteAccount}>
              <Trash2 size={20} color="#ef4444" />
              <Text style={[styles.menuLabel, { color: '#ef4444' }]}>Delete Account</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Policy footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Gouri Aqua Plast v1.0</Text>
            <Text style={styles.footerSub}>Ganesh Gouri Industries • Quotation Only</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-start',
  },
  menuContainer: {
    width: '82%',
    height: '100%',
    backgroundColor: '#ffffff',
    paddingTop: 45,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    marginBottom: 15,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(14, 165, 233, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '800',
  },
  userEmail: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 2,
  },
  closeButton: {
    padding: 6,
  },
  menuList: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 14,
  },
  menuLabel: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 15,
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    alignItems: 'center',
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
  },
  footerSub: {
    color: '#0ea5e9',
    fontSize: 11,
    marginTop: 2,
  },
});
