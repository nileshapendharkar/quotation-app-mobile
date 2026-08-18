import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Menu, Bell, Plus, FileText, FileEdit, Send, FileX, ChevronRight, Info, HelpCircle, PhoneCall } from 'lucide-react-native';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen({ onOpenMenu, onNavigateProduct, onNavigateOrders, onNavigateNotifications }) {
  const { user } = useContext(AuthContext);

  const stats = [
    { title: 'Total Quotations', count: '0', icon: FileText, color: '#3b82f6', bgColor: '#eff6ff' },
    { title: 'Draft', count: '0', icon: FileEdit, color: '#22c55e', bgColor: '#f0fdf4' },
    { title: 'Submitted', count: '0', icon: Send, color: '#f59e0b', bgColor: '#fffbeb' },
    { title: 'Declined', count: '0', icon: FileX, color: '#a855f7', bgColor: '#faf5ff' },
  ];

  const recentOrders = [];
  const unreadNotifications = 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onOpenMenu} style={styles.headerIconBtn}>
          <Menu color="#0f172a" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quotation App</Text>
        <TouchableOpacity style={styles.headerIconBtn} onPress={onNavigateNotifications}>
          <Bell color="#0f172a" size={24} />
          {unreadNotifications > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadNotifications}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeTextContent}>
            <Text style={styles.welcomeLabel}>Welcome back,</Text>
            <Text style={styles.companyName} numberOfLines={1}>{user?.companyName || 'Mahesh Enterprises'}</Text>
            <Text style={styles.welcomeSubtext}>Create and manage your quotations easily.</Text>
          </View>
          <View style={styles.welcomeIllustration}>
            <View style={styles.clipboardIcon}>
              <View style={styles.clipboardClip} />
              <View style={styles.clipboardLines}>
                <View style={styles.line} />
                <View style={styles.line} />
                <View style={styles.line} />
              </View>
              <View style={styles.plusBadge}>
                <Plus color="#ffffff" size={14} />
              </View>
            </View>
          </View>
        </View>

        {/* Create Button */}
        <TouchableOpacity style={styles.createBtn} onPress={onNavigateProduct}>
          <Plus color="#ffffff" size={20} style={{ marginRight: 8 }} />
          <Text style={styles.createBtnText}>Create New Quotation</Text>
        </TouchableOpacity>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => {
            const IconComp = stat.icon;
            return (
              <TouchableOpacity key={index} style={styles.statCard} onPress={onNavigateOrders}>
                <View style={[styles.statIconBox, { backgroundColor: stat.bgColor }]}>
                  <IconComp color={stat.color} size={20} />
                </View>
                <Text style={styles.statTitle}>{stat.title}</Text>
                <Text style={styles.statCount}>{stat.count}</Text>
                <View style={styles.viewAllRow}>
                  <Text style={styles.viewAllText}>View All</Text>
                  <ChevronRight color="#0ea5e9" size={14} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Recent Quotations */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Quotations</Text>
          <TouchableOpacity onPress={onNavigateOrders}>
            <Text style={styles.sectionLink}>View All</Text>
          </TouchableOpacity>
        </View>

        {recentOrders.length === 0 ? (
          <View style={styles.emptyRecentBox}>
            <Text style={styles.emptyRecentText}>No Recent Quotations</Text>
          </View>
        ) : (
          <View style={styles.recentList}>
            {recentOrders.map((order, index) => (
              <TouchableOpacity key={index} style={styles.recentItem}>
                <View style={styles.recentIconBox}>
                  <FileText color="#3b82f6" size={20} />
                </View>
                <View style={styles.recentContent}>
                  <Text style={styles.recentId}>{order.id}</Text>
                  <Text style={styles.recentDetails}>{order.date} • {order.items} Items</Text>
                </View>
                <View style={[
                  styles.statusBadge, 
                  order.status === 'Draft' ? styles.statusDraft : styles.statusSubmitted
                ]}>
                  <Text style={[
                    styles.statusText,
                    order.status === 'Draft' ? styles.statusTextDraft : styles.statusTextSubmitted
                  ]}>{order.status}</Text>
                </View>
                <ChevronRight color="#cbd5e1" size={20} style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Info color="#64748b" size={20} style={{ marginTop: 2, marginRight: 12 }} />
          <Text style={styles.infoText}>
            Prices are not shown in this quotation. Only product names and quantities are displayed.
          </Text>
        </View>

        {/* Quick Actions */}
        <Text style={[styles.sectionTitle, { marginTop: 8, marginBottom: 12 }]}>Quick Actions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.actionBtn}>
            <View style={[styles.actionIconBox, { backgroundColor: '#eff6ff' }]}>
              <FileText color="#3b82f6" size={18} />
            </View>
            <Text style={styles.actionText}>How to Use</Text>
            <ChevronRight color="#cbd5e1" size={16} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <View style={[styles.actionIconBox, { backgroundColor: '#f0fdf4' }]}>
              <HelpCircle color="#22c55e" size={18} />
            </View>
            <Text style={styles.actionText}>Help & Support</Text>
            <ChevronRight color="#cbd5e1" size={16} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <View style={[styles.actionIconBox, { backgroundColor: '#faf5ff' }]}>
              <PhoneCall color="#a855f7" size={18} />
            </View>
            <Text style={styles.actionText}>Contact Us</Text>
            <ChevronRight color="#cbd5e1" size={16} />
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff', // White header area
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerIconBtn: {
    padding: 8,
    position: 'relative',
  },
  headerTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '800',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 6,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#003399',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  scrollContent: {
    backgroundColor: '#f8fafc',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingBottom: 80,
  },
  welcomeCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 8,
  },
  welcomeTextContent: {
    flex: 1,
    paddingRight: 16,
  },
  welcomeLabel: {
    color: '#1e293b',
    fontSize: 14,
    marginBottom: 4,
  },
  companyName: {
    color: '#0f172a',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  welcomeSubtext: {
    color: '#475569',
    fontSize: 13,
    lineHeight: 18,
  },
  welcomeIllustration: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clipboardIcon: {
    width: 50,
    height: 64,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#bfdbfe',
    alignItems: 'center',
    paddingTop: 16,
    position: 'relative',
  },
  clipboardClip: {
    width: 24,
    height: 8,
    backgroundColor: '#3b82f6',
    borderRadius: 4,
    position: 'absolute',
    top: -4,
  },
  clipboardLines: {
    width: '60%',
    gap: 6,
  },
  line: {
    height: 2,
    backgroundColor: '#e2e8f0',
    borderRadius: 1,
  },
  plusBadge: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    width: 24,
    height: 24,
    backgroundColor: '#0ea5e9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#eff6ff',
  },
  createBtn: {
    backgroundColor: '#0ea5e9',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginBottom: 20,
  },
  createBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statTitle: {
    color: '#475569',
    fontSize: 12,
    marginBottom: 6,
  },
  statCount: {
    color: '#0f172a',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 10,
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#0ea5e9',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '800',
  },
  sectionLink: {
    color: '#0ea5e9',
    fontSize: 13,
    fontWeight: '600',
  },
  recentList: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    overflow: 'hidden',
    marginBottom: 20,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  recentIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recentContent: {
    flex: 1,
  },
  recentId: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  recentDetails: {
    color: '#64748b',
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusSubmitted: {
    backgroundColor: '#eff6ff',
  },
  statusDraft: {
    backgroundColor: '#f0fdf4',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusTextSubmitted: {
    color: '#3b82f6',
  },
  statusTextDraft: {
    color: '#22c55e',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoText: {
    flex: 1,
    color: '#475569',
    fontSize: 13,
    lineHeight: 18,
  },
  quickActionsContainer: {
    gap: 12,
    paddingBottom: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    paddingRight: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  actionText: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '700',
    marginRight: 8,
  },
  emptyRecentBox: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyRecentText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '600',
  }
});
