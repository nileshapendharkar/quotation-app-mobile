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
          <Clock size={12} color="#d97706" />
          <Text style={[styles.badgeText, { color: '#d97706' }]}>Pending</Text>
        </View>
      );
    }
    if (status === 'Dispatched') {
      return (
        <View style={[styles.badge, styles.badgeDispatched]}>
          <CheckCircle2 size={12} color="#059669" />
          <Text style={[styles.badgeText, { color: '#059669' }]}>Dispatched</Text>
        </View>
      );
    }
    return (
      <View style={[styles.badge, styles.badgeCancelled]}>
        <XCircle size={12} color="#dc2626" />
        <Text style={[styles.badgeText, { color: '#dc2626' }]}>Cancelled</Text>
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
                    <Text style={styles.itemTitle}>{prod.productName}{prod.size ? ` (Size: ${prod.size})` : ''}</Text>
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
    backgroundColor: '#f8fafc',
  },
  topHeader: {
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    color: '#0f172a',
    fontSize: 20,
    fontWeight: '800',
  },
  headerSub: {
    color: '#0ea5e9',
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
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tabBtnActive: {
    backgroundColor: '#0ea5e9',
    borderColor: '#0ea5e9',
  },
  tabText: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#ffffff',
    fontWeight: '800',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
    gap: 14,
  },
  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNo: {
    color: '#0ea5e9',
    fontSize: 15,
    fontWeight: '800',
  },
  orderDate: {
    color: '#94a3b8',
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
    backgroundColor: 'rgba(217, 119, 6, 0.12)',
  },
  badgeDispatched: {
    backgroundColor: 'rgba(5, 150, 105, 0.12)',
  },
  badgeCancelled: {
    backgroundColor: 'rgba(220, 38, 38, 0.12)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
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
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 8,
  },
  itemTitle: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  itemQty: {
    color: '#0ea5e9',
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
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 16,
  },
  emptySub: {
    color: '#64748b',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
  },
});
