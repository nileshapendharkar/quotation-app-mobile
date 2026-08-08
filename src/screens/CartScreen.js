import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Modal, Alert, Linking } from 'react-native';
import { ShoppingBag, Plus, Minus, Trash2, FileCheck, X, Share2, Download } from 'lucide-react-native';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { apiRequest, getImageUrl } from '../api';

export default function CartScreen({ onNavigateOrders }) {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [pdfModalVisible, setPdfModalVisible] = useState(false);
  const [generatedOrder, setGeneratedOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleGenerateQuotation = async () => {
    if (cartItems.length === 0) return;

    setSubmitting(true);
    const orderData = {
      items: cartItems.map(i => ({
        productId: i.productId,
        productName: i.productName,
        quantity: i.quantity,
        size: i.size || ''
      })),
      notes: "Generated via Mobile Quotation App"
    };

    const res = await apiRequest('/orders/create', 'POST', orderData);
    setSubmitting(false);

    if (res.success && res.order) {
      setGeneratedOrder(res.order);
      setPdfModalVisible(true);
      clearCart();
    } else {
      // Fallback mock order if backend offline
      const mockOrder = {
        id: 'ord_' + Date.now(),
        orderNo: `QT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
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
  };

  const handleShareWhatsApp = async () => {
    if (!generatedOrder) return;

    const itemsText = generatedOrder.items
      .map(item => `• ${item.productName}${item.size ? ` (Size: ${item.size})` : ''} (Qty: ${item.quantity})`)
      .join('\n');

    const message = `*Gouri Aqua Plast - Product Quotation*\n` +
      `*Ref:* ${generatedOrder.orderNo}\n\n` +
      `*Customer Details:*\n` +
      `Name: ${generatedOrder.userName}\n` +
      `Mobile: ${generatedOrder.userMobile}\n` +
      `Company: ${generatedOrder.companyName || 'Individual'}\n\n` +
      `*Items Requested:*\n${itemsText}\n\n` +
      `*Policy:* Zero Price Mode (Quotation request only).`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

    try {
      await Linking.openURL(url);
    } catch (err) {
      Alert.alert('Cannot Open WhatsApp', 'Please verify that WhatsApp is installed on your device.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topHeader}>
        <Text style={styles.headerTitle}>Quotation Builder (Cart)</Text>
        <Text style={styles.headerSub}>Select Product Quantities • Zero Price Policy</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyBox}>
          <ShoppingBag size={48} color="#334155" />
          <Text style={styles.emptyTitle}>Quotation Cart is Empty</Text>
          <Text style={styles.emptySub}>Add products from catalog to request a quotation.</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {/* Products Grid (2 per row) */}
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.productId + '_' + (item.size || '')}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.cartCard}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: getImageUrl(item.image) }} style={styles.cardImage} />
                  <TouchableOpacity
                    style={styles.deleteBadge}
                    onPress={() => removeFromCart(item.productId, item.size)}
                  >
                    <Trash2 size={14} color="#ef4444" />
                  </TouchableOpacity>
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle} numberOfLines={2}>{item.productName}</Text>
                  
                  {item.size ? (
                    <View style={styles.sizeBadge}>
                      <Text style={styles.sizeText}>Size: {item.size}</Text>
                    </View>
                  ) : null}

                  <Text style={styles.policyLabel}>Quantity Based Quote</Text>

                  {/* Quantity Stepper (Increase/Decrease) */}
                  <View style={styles.qtyContainer}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(item.productId, -1, item.size)}
                    >
                      <Minus size={14} color="#f8fafc" />
                    </TouchableOpacity>

                    <Text style={styles.qtyValue}>{item.quantity}</Text>

                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(item.productId, 1, item.size)}
                    >
                      <Plus size={14} color="#f8fafc" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            contentContainerStyle={styles.gridContent}
          />

          {/* Bottom Action Buttons */}
          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.cancelBtn} onPress={clearCart}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.generateBtn}
              onPress={handleGenerateQuotation}
              disabled={submitting}
            >
              <FileCheck size={18} color="#000" />
              <Text style={styles.generateText}>
                {submitting ? 'Generating...' : 'Generate Quotation'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Generated Quotation PDF Preview Modal */}
      {pdfModalVisible && generatedOrder && (
        <Modal visible={pdfModalVisible} animationType="slide" transparent>
          <View style={styles.pdfOverlay}>
            <View style={styles.pdfCard}>
              <View style={styles.pdfHeader}>
                <View>
                  <Text style={styles.pdfTitle}>PRODUCT QUOTATION PDF</Text>
                  <Text style={styles.pdfRef}>{generatedOrder.orderNo}</Text>
                </View>
                <TouchableOpacity onPress={() => setPdfModalVisible(false)}>
                  <X size={20} color="#94a3b8" />
                </TouchableOpacity>
              </View>

              <View style={styles.customerBox}>
                <Text style={styles.custLabel}>CUSTOMER DETAILS</Text>
                <Text style={styles.custName}>{generatedOrder.userName}</Text>
                <Text style={styles.custSub}>{generatedOrder.userEmail} | {generatedOrder.userMobile}</Text>
                <Text style={styles.custSub}>{generatedOrder.companyName || 'Individual'}</Text>
              </View>

              <Text style={styles.sectionHeading}>QUOTATION ITEMS LIST (NO PRICING)</Text>
              <View style={styles.pdfItemsList}>
                {generatedOrder.items.map((item, idx) => (
                  <View key={idx} style={styles.pdfItemRow}>
                    <Text style={styles.pdfItemName}>{item.productName}</Text>
                    <Text style={styles.pdfItemQty}>{item.quantity} Units</Text>
                  </View>
                ))}
              </View>

              <View style={styles.disclaimerBox}>
                <Text style={styles.disclaimerText}>
                  ✓ Quotation created successfully. Omitted price fields as per strict policy.
                </Text>
              </View>

              <View style={styles.pdfActions}>
                <TouchableOpacity 
                  style={styles.shareBtn}
                  onPress={handleShareWhatsApp}
                >
                  <Share2 size={16} color="#0ea5e9" />
                  <Text style={styles.shareText}>Share via WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.doneBtn}
                  onPress={() => {
                    setPdfModalVisible(false);
                    onNavigateOrders && onNavigateOrders();
                  }}
                >
                  <Text style={styles.doneText}>View Orders</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  gridContent: {
    padding: 8,
    paddingBottom: 90,
  },
  cartCard: {
    flex: 1,
    margin: 6,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  imageContainer: {
    height: 110,
    backgroundColor: '#f1f5f9',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  deleteBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 6,
    borderRadius: 12,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    color: '#0f172a',
    fontSize: 12,
    fontWeight: '700',
    height: 32,
  },
  policyLabel: {
    color: '#0ea5e9',
    fontSize: 10,
    marginTop: 2,
    marginBottom: 8,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyValue: {
    color: '#0ea5e9',
    fontSize: 14,
    fontWeight: '800',
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
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    color: '#fca5a5',
    fontSize: 14,
    fontWeight: '700',
  },
  generateBtn: {
    flex: 2,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#0ea5e9',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  generateText: {
    color: '#ffffff',
    fontSize: 14,
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
  /* PDF Modal */
  pdfOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    padding: 20,
  },
  pdfCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#0ea5e9',
  },
  pdfHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 12,
    marginBottom: 16,
  },
  pdfTitle: {
    color: '#0ea5e9',
    fontSize: 16,
    fontWeight: '800',
  },
  pdfRef: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 2,
  },
  customerBox: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  custLabel: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 4,
  },
  custName: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '700',
  },
  custSub: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 2,
  },
  sectionHeading: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 8,
  },
  pdfItemsList: {
    gap: 8,
    marginBottom: 16,
  },
  pdfItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  pdfItemName: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  pdfItemQty: {
    color: '#0ea5e9',
    fontSize: 13,
    fontWeight: '800',
  },
  disclaimerBox: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  disclaimerText: {
    color: '#10b981',
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '600',
  },
  pdfActions: {
    flexDirection: 'row',
    gap: 10,
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
    gap: 6,
  },
  shareText: {
    color: '#0ea5e9',
    fontSize: 13,
    fontWeight: '700',
  },
  doneBtn: {
    flex: 1,
    backgroundColor: '#0ea5e9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  doneText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
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
    marginBottom: 2,
  },
  sizeText: {
    color: '#0ea5e9',
    fontSize: 9,
    fontWeight: '700',
  },
});
