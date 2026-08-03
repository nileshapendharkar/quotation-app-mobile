import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ClipboardList, Clock, CheckCircle2, XCircle, FileText } from 'lucide-react-native';
import { AuthContext } from '../context/AuthContext';
import { apiRequest } from '../api';

export default function OrdersScreen() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('All');
  const [orders, setOrders] = useState([
    {
      id: "ord_1001",
      orderNo: "QT-2026-1001",
      status: "Pending",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      items: [
        { productName: "Pro-Grade Heavy Duty Safety Helmet", quantity: 100 },
        { productName: "High-Visibility Reflective Vest (Class 3)", quantity: 200 }
      ]
    },
    {
      id: "ord_1002",
      orderNo: "QT-2026-1002",
      status: "Dispatched",
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      items: [
        { productName: "Precision Hydraulic Pressure Control Valve", quantity: 15 }
      ]
    }
  ]);

  useEffect(() => {
    fetchOrders();
  }, [activeTab]);

  const fetchOrders = async () => {
    const res = await apiRequest(`/orders/my-orders?status=${activeTab}`);
    if (res.success && res.orders && res.orders.length > 0) {
      setOrders(res.orders);
    }
  };

  const filteredOrders = orders.filter(o => {
    if (activeTab === 'All') return true;
    return o.status.toLowerCase() === activeTab.toLowerCase();
  });

  const renderStatusBadge = (status) => {
    if (status === 'Pending') {
      return (
        <View style={[styles.badge, styles.badgePending]}>
          <Clock size={12} color="#f59e0b" />
          <Text style={[styles.badgeText, { color: '#f59e0b' }]}>Pending</Text>
        </View>
      );
    }
    if (status === 'Dispatched') {
      return (
        <View style={[styles.badge, styles.badgeDispatched]}>
          <CheckCircle2 size={12} color="#10b981" />
          <Text style={[styles.badgeText, { color: '#10b981' }]}>Dispatched</Text>
        </View>
      );
    }
    return (
      <View style={[styles.badge, styles.badgeCancelled]}>
        <XCircle size={12} color="#ef4444" />
        <Text style={[styles.badgeText, { color: '#ef4444' }]}>Cancelled</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topHeader}>
        <Text style={styles.headerTitle}>Quotation Orders History</Text>
        <Text style={styles.headerSub}>Track Status • Product Name & Qty Only</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {['All', 'Pending', 'Dispatched', 'Cancelled'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredOrders.length === 0 ? (
        <View style={styles.emptyBox}>
          <ClipboardList size={48} color="#334155" />
          <Text style={styles.emptyTitle}>No {activeTab} Orders Found</Text>
          <Text style={styles.emptySub}>Your quotation requests will appear here.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.orderNo}>{item.orderNo}</Text>
                  <Text style={styles.orderDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
                </View>
                {renderStatusBadge(item.status)}
              </View>

              <View style={styles.divider} />

              <Text style={styles.sectionLabel}>REQUESTED ITEMS (NO PRICING)</Text>
              <View style={styles.itemsList}>
                {item.items.map((prod, idx) => (
                  <View key={idx} style={styles.itemRow}>
                    <Text style={styles.itemTitle}>{prod.productName}</Text>
                    <Text style={styles.itemQty}>× {prod.quantity} Units</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0f19',
  },
  topHeader: {
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 16,
    backgroundColor: '#0f172a',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  headerTitle: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '800',
  },
  headerSub: {
    color: '#38bdf8',
    fontSize: 12,
    marginTop: 2,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  tabBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  tabBtnActive: {
    backgroundColor: '#38bdf8',
  },
  tabText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#000000',
    fontWeight: '800',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
    gap: 14,
  },
  orderCard: {
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNo: {
    color: '#38bdf8',
    fontSize: 15,
    fontWeight: '800',
  },
  orderDate: {
    color: '#64748b',
    fontSize: 11,
    marginTop: 2,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  badgePending: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
  },
  badgeDispatched: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  badgeCancelled: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 12,
  },
  sectionLabel: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 8,
  },
  itemsList: {
    gap: 6,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    padding: 10,
    borderRadius: 8,
  },
  itemTitle: {
    color: '#f8fafc',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  itemQty: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: '800',
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 16,
  },
  emptySub: {
    color: '#94a3b8',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
  },
});
