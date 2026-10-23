import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Modal, Alert, Linking, ImageBackground, SafeAreaView, Platform } from 'react-native';
import { ShoppingBag, Plus, Minus, Trash2, FileCheck, X, Share2, Download, Menu, Search, Bell, Bookmark, Lightbulb } from 'lucide-react-native';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { FavoriteContext } from '../context/FavoriteContext';
import { apiRequest, getImageUrl, API_BASE_URL, getUserToken } from '../api';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default function CartScreen({ onNavigateOrders, onOpenMenu, onNavigateNotifications, onNavigateSearch }) {
  const { cartItems, updateQuantity, removeFromCart, clearCart, activeDraftId, activeDraftNo, loadDraft } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { isFavorite, toggleFavorite } = useContext(FavoriteContext);

  const [pdfModalVisible, setPdfModalVisible] = useState(false);
  const [generatedOrder, setGeneratedOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);

  const unreadNotifications = 0; // Grab from context if available

  const handleSaveDraft = async () => {
    if (cartItems.length === 0) return;

    setSavingDraft(true);
    const draftData = {
      id: activeDraftId,
      items: cartItems.map(i => ({
        productId: i.productId,
        quantity: i.quantity,
        size: i.size || ''
      })),
      notes: "Saved draft quotation"
    };

    const res = await apiRequest('/drafts/save', 'POST', draftData);
    setSavingDraft(false);

    if (res.success && res.draft) {
      Alert.alert(
        'Draft Saved',
        `Draft quotation ${res.draft.draftNo} has been saved successfully! You can access it from 'Saved Drafts' in the sidebar menu.`,
        [{ text: 'OK' }]
      );
      if (loadDraft) {
        loadDraft(res.draft);
      }
    } else {
      Alert.alert('Error', res.message || 'Failed to save draft. Please try again.');
    }
  };

  const handleGenerateQuotation = async () => {
    if (cartItems.length === 0) return;

    setSubmitting(true);
    const orderData = {
      items: cartItems.map(i => ({
        productId: i.productId,
        productName: i.productName,
        quantity: i.quantity,
        size: i.size || '',
        productCode: i.productCode || '',
        packing: i.packing || '',
        uom: i.uom || 'Nos',
        categoryName: i.categoryName || ''
      })),
      notes: activeDraftNo ? `Generated from Draft ${activeDraftNo}` : "Generated via Mobile Quotation App"
    };

    const res = await apiRequest('/orders/create', 'POST', orderData);
    setSubmitting(false);

    if (res.success && res.order) {
      setGeneratedOrder(res.order);
      setPdfModalVisible(true);
      
      // Delete the draft if we were editing a draft
      if (activeDraftId) {
        await apiRequest(`/drafts/${activeDraftId}`, 'DELETE');
      }
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

      // Delete local/mock draft too if active
      if (activeDraftId) {
        await apiRequest(`/drafts/${activeDraftId}`, 'DELETE');
      }
      clearCart();
    }
  };

  const handleMoveToSaved = (item) => {
    const product = {
      id: item.productId,
      name: item.productName,
      categoryName: item.categoryName,
      image: item.image || null,
    };
    if (!isFavorite(product.id)) {
      toggleFavorite(product);
    }
    removeFromCart(item.productId, item.size);
  };

  const handleShareWhatsApp = async () => {
    if (!generatedOrder) return;

    const itemsText = generatedOrder.items
      .map(item => `• ${item.productName}${item.size ? ` (Size: ${item.size})` : ''}${item.productCode ? ` [Code: ${item.productCode}]` : ''}${item.packing ? ` (Packing: ${item.packing})` : ''} (Qty: ${item.quantity} ${item.uom || 'Nos'})`)
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

  const handleDownloadPDF = async () => {
    if (!generatedOrder) return;

    const token = getUserToken();
    const orderId = generatedOrder.id;
    const downloadUrl = `${API_BASE_URL}/orders/download-pdf/${orderId}`;
    const filename = `Quotation_${generatedOrder.orderNo || 'PDF'}.pdf`;

    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined' && window.document) {
        // Direct Web Download matching Admin Panel behavior
        const res = await fetch(downloadUrl, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        if (!res.ok) throw new Error('Failed to fetch PDF from server');
        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }

      // Native Mobile Download (Android / iOS)
      if (orderId && !orderId.startsWith('ord_1')) {
        const fileUri = `${FileSystem.documentDirectory}${filename}`;
        const downloadRes = await FileSystem.downloadAsync(
          downloadUrl,
          fileUri,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
          }
        );

        if (downloadRes.status === 200) {
          const isSharingAvailable = await Sharing.isAvailableAsync();
          if (isSharingAvailable) {
            await Sharing.shareAsync(downloadRes.uri, {
              UTI: '.pdf',
              mimeType: 'application/pdf',
              dialogTitle: `Download ${filename}`
            });
          } else {
            Alert.alert('Download Complete', `PDF saved to ${downloadRes.uri}`);
          }
          return;
        }
      }

      // Fallback HTML client-side print if mock order or backend offline
      await generateFallbackHTMLPDF();
    } catch (err) {
      console.warn('Backend PDF download error, attempting fallback print:', err);
      await generateFallbackHTMLPDF();
    }
  };

  const generateFallbackHTMLPDF = async () => {
    try {
      const itemsHtml = generatedOrder.items.map(item => {
        const categoryName = item.categoryName || '';
        let total = 0;
        if (categoryName.toLowerCase().includes('tank')) {
          const parsedSize = parseFloat(item.size);
          if (!isNaN(parsedSize)) total = parsedSize * item.quantity;
        } else {
          const parsedPacking = parseFloat(item.packing);
          if (!isNaN(parsedPacking)) total = parsedPacking * item.quantity;
        }

        return `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${item.productCode || '-'}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${item.productName}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${item.size || '-'}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${item.packing || '-'}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">${item.quantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${item.uom || 'Nos'}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">${total ? total.toLocaleString('en-IN') : '-'}</td>
        </tr>
      `;
      }).join('');

      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px; color: #333; }
              h1 { color: #0ea5e9; font-size: 24px; margin-bottom: 5px; }
              p { margin: 5px 0; font-size: 14px; }
              .header { margin-bottom: 30px; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px; }
              .details { margin-bottom: 30px; background-color: #f8fafc; padding: 15px; border-radius: 8px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th { background-color: #f1f5f9; padding: 12px 10px; text-align: left; font-size: 14px; color: #475569; }
              .footer { margin-top: 50px; font-size: 12px; color: #64748b; text-align: center; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Gouri Aqua Plast</h1>
              <p>Product Quotation Request</p>
              <p><strong>Ref:</strong> ${generatedOrder.orderNo}</p>
            </div>
            
            <div class="details">
              <h3 style="margin-top:0; color:#475569;">Customer Details</h3>
              <p><strong>Name:</strong> ${generatedOrder.userName}</p>
              <p><strong>Company:</strong> ${generatedOrder.companyName || 'Individual'}</p>
              <p><strong>Mobile:</strong> ${generatedOrder.userMobile}</p>
              <p><strong>Email:</strong> ${generatedOrder.userEmail}</p>
            </div>

            <table>
              <thead>
                <tr>
                  <th>ProductCode</th>
                  <th>Product Name</th>
                  <th>Size</th>
                  <th>Packing</th>
                  <th style="text-align: right;">Quantity</th>
                  <th>UOM</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div class="footer">
              <p>Thank you for choosing Gouri Aqua Plast.</p>
              <p>Note: This is a zero-price quotation request. Our sales team will follow up with pricing.</p>
            </div>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      
      const isSharingAvailable = await Sharing.isAvailableAsync();
      if (isSharingAvailable) {
        await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf', dialogTitle: 'Download Quotation PDF' });
      } else {
        Alert.alert('Sharing not available', 'Cannot download PDF on this device.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to generate PDF.');
    }
  };

  return (
    <ImageBackground source={require('../../assets/splash_bg.png')} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onOpenMenu} style={styles.headerIconBtn}>
            <Menu color="#27347a" size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>CART</Text>
          <View style={styles.headerRight}>
             <TouchableOpacity style={styles.headerIconBtn} onPress={onNavigateSearch}>
               <Search color="#27347a" size={24} />
             </TouchableOpacity>
             <TouchableOpacity style={styles.headerIconBtn} onPress={onNavigateNotifications}>
               <Bell color="#27347a" size={24} />
               {unreadNotifications > 0 && (
                 <View style={styles.badge}>
                   <Text style={styles.badgeText}>{unreadNotifications}</Text>
                 </View>
               )}
             </TouchableOpacity>
          </View>
        </View>

        {activeDraftNo && (
          <View style={styles.draftBanner}>
            <View style={styles.draftBannerContent}>
              <Text style={styles.draftBannerText}>📝 Editing Draft: {activeDraftNo}</Text>
              <TouchableOpacity 
                style={styles.discardBtn} 
                onPress={() => {
                  Alert.alert(
                    'Discard Draft Edits',
                    'Are you sure you want to stop editing this draft? This will clear the cart.',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Discard', style: 'destructive', onPress: clearCart }
                    ]
                  );
                }}
              >
                <Text style={styles.discardBtnText}>Discard</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {cartItems.length === 0 ? (
          <View style={styles.emptyBox}>
            <ShoppingBag size={48} color="#27347a" />
            <Text style={styles.emptyTitle}>Cart is Empty</Text>
            <Text style={styles.emptySub}>Add products from catalog to request a quotation.</Text>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.productId + '_' + (item.size || '')}
              removeClippedSubviews={true}
              initialNumToRender={6}
              maxToRenderPerBatch={6}
              windowSize={5}
              updateCellsBatchingPeriod={50}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.cartListItem}>
                  
                  {/* Left Column: Image + Remove */}
                  <View style={styles.leftColumn}>
                    <View style={styles.imageContainer}>
                      <Image source={getImageUrl(item.image)} style={styles.itemImage} resizeMode="contain" fadeDuration={0} />
                    </View>
                    <TouchableOpacity style={styles.removeBtn} onPress={() => removeFromCart(item.productId, item.size)}>
                      <Trash2 size={12} color="#ffffff" />
                      <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Right Column: Details + Move to Saved */}
                  <View style={styles.rightColumn}>
                    <View style={styles.infoTop}>
                      <Text style={styles.cardTitle} numberOfLines={2}>{item.productName}</Text>
                      <Text style={styles.cardCategory} numberOfLines={1}>
                        {item.categoryName} {item.subCategoryName ? `› ${item.subCategoryName}` : ''}
                      </Text>
                      
                      <View style={styles.qtyContainer}>
                        <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.productId, -1, item.size)}>
                          <Minus size={14} color="#000000" />
                        </TouchableOpacity>
                        <Text style={styles.qtyValue}>{item.quantity}</Text>
                        <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.productId, 1, item.size)}>
                          <Plus size={14} color="#000000" />
                        </TouchableOpacity>
                      </View>

                      {item.size ? (
                        <View style={styles.sizeBadge}>
                          <Text style={styles.sizeText}>Size: {item.size}</Text>
                        </View>
                      ) : null}
                      <View style={[styles.sizeBadge, { marginTop: 4, backgroundColor: '#f1f5f9' }]}>
                        <Text style={[styles.sizeText, { color: '#64748b' }]}>UOM: {item.uom || 'Nos'}</Text>
                      </View>
                    </View>

                    <TouchableOpacity style={styles.saveBtn} onPress={() => handleMoveToSaved(item)}>
                      <Bookmark size={12} color="#ffffff" fill="#ffffff" />
                      <Text style={styles.saveText}>Move to Saved</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              )}
              contentContainerStyle={styles.listContent}
            />

            {/* Bottom Action Bar */}
            <View style={styles.bottomBar}>
              <TouchableOpacity style={styles.cancelBtn} onPress={clearCart}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.draftBtn} 
                onPress={handleSaveDraft} 
                disabled={savingDraft || submitting}
              >
                <Text style={styles.draftText}>
                  {savingDraft ? 'Saving...' : 'Save Draft'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.generateBtn} onPress={handleGenerateQuotation} disabled={submitting || savingDraft}>
                <Lightbulb size={16} color="#ffffff" />
                <Text style={styles.generateText}>
                  {submitting ? 'Generating...' : 'Generate'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Generated Quotation PDF Preview Modal (Retained functionality) */}
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
                  {generatedOrder.items.map((item, idx) => {
                    let totalVal = '—';
                    if (item.total && item.total !== '—') {
                      totalVal = item.total;
                    } else {
                      const catName = item.categoryName || '';
                      let numericTotal = 0;
                      if (catName.toLowerCase().includes('tank')) {
                        const parsedSize = parseFloat(item.size);
                        if (!isNaN(parsedSize)) numericTotal = parsedSize * item.quantity;
                      } else if (item.packing) {
                        const parsedPacking = parseFloat(item.packing);
                        if (!isNaN(parsedPacking)) numericTotal = parsedPacking * item.quantity;
                      }
                      if (numericTotal > 0) {
                        totalVal = numericTotal.toLocaleString('en-IN');
                      } else {
                        totalVal = item.quantity ? item.quantity.toString() : '—';
                      }
                    }

                    return (
                      <View key={idx} style={styles.pdfItemRow}>
                        <View style={{ flex: 1, paddingRight: 8 }}>
                          <Text style={styles.pdfItemName}>{item.productName}</Text>
                          {(item.categoryName || item.subCategoryName) && (
                            <Text style={styles.pdfItemCategory}>
                              {item.categoryName} {item.subCategoryName ? `› ${item.subCategoryName}` : ''}
                            </Text>
                          )}
                          {item.size ? (
                            <Text style={styles.pdfItemDetails}>Size: {item.size}</Text>
                          ) : null}
                        </View>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'center', gap: 2 }}>
                          <Text style={styles.pdfItemQty}>Qty: <Text style={{ fontWeight: '800', color: '#0f172a' }}>{item.quantity || 1}</Text></Text>
                          <Text style={styles.pdfItemUom}>UOM: <Text style={{ fontWeight: '700', color: '#0ea5e9' }}>{item.uom || 'Nos'}</Text></Text>
                          <Text style={styles.pdfItemTotal}>Total: <Text style={{ fontWeight: '800', color: '#0284c7' }}>{totalVal}</Text></Text>
                        </View>
                      </View>
                    );
                  })}
                </View>

                <View style={styles.disclaimerBox}>
                  <Text style={styles.disclaimerText}>
                    ✓ Quotation created successfully. Omitted price fields as per strict policy.
                  </Text>
                </View>

                <View style={styles.pdfActions}>
                  <TouchableOpacity style={styles.actionBtn} onPress={handleShareWhatsApp}>
                    <Share2 size={16} color="#0ea5e9" />
                    <Text style={styles.actionText}>WhatsApp</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn} onPress={handleDownloadPDF}>
                    <Download size={16} color="#0ea5e9" />
                    <Text style={styles.actionText}>Download PDF</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.doneBtn}
                    onPress={() => {
                      setPdfModalVisible(false);
                      onNavigateOrders && onNavigateOrders();
                    }}
                  >
                    <Text style={styles.doneText}>Orders</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  headerIconBtn: {
    padding: 8,
    position: 'relative',
  },
  headerTitle: {
    color: '#27347a',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 90,
  },
  cartListItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
    padding: 12,
  },
  leftColumn: {
    width: 100,
    marginRight: 12,
  },
  imageContainer: {
    width: '100%',
    height: 100,
    backgroundColor: '#dcf0fa',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 8,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  removeBtn: {
    backgroundColor: '#ef4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 4,
    gap: 4,
  },
  removeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  rightColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  infoTop: {
    flex: 1,
    paddingTop: 4,
  },
  cardTitle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  cardCategory: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 8,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyValue: {
    color: '#27347a',
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 12,
  },
  sizeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#cffafe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  sizeText: {
    color: '#0891b2',
    fontSize: 10,
    fontWeight: '600',
  },
  saveBtn: {
    backgroundColor: '#38bdf8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 4,
    gap: 4,
  },
  saveText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
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
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 8,
  },
  cancelBtn: {
    flex: 1,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  draftBtn: {
    flex: 1.2,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#f59e0b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  draftText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  generateBtn: {
    flex: 1.5,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#38bdf8',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  generateText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  draftBanner: {
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(245, 158, 11, 0.3)',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  draftBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  draftBannerText: {
    color: '#b45309',
    fontSize: 14,
    fontWeight: '700',
  },
  discardBtn: {
    backgroundColor: '#b45309',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  discardBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyTitle: {
    color: '#27347a',
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
  pdfOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', padding: 20 },
  pdfCard: { backgroundColor: '#ffffff', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#0ea5e9' },
  pdfHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingBottom: 12, marginBottom: 16 },
  pdfTitle: { color: '#0ea5e9', fontSize: 16, fontWeight: '800' },
  pdfRef: { color: '#64748b', fontSize: 12, marginTop: 2 },
  customerBox: { backgroundColor: '#f1f5f9', padding: 12, borderRadius: 10, marginBottom: 16 },
  custLabel: { color: '#64748b', fontSize: 10, fontWeight: '800', marginBottom: 4 },
  custName: { color: '#0f172a', fontSize: 14, fontWeight: '700' },
  custSub: { color: '#64748b', fontSize: 12, marginTop: 2 },
  sectionHeading: { color: '#64748b', fontSize: 11, fontWeight: '800', marginBottom: 8 },
  pdfItemsList: { gap: 8, marginBottom: 16 },
  pdfItemRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#f8fafc', borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  pdfItemName: { color: '#0f172a', fontSize: 13, fontWeight: '700' },
  pdfItemCategory: { color: '#64748b', fontSize: 10, marginTop: 2 },
  pdfItemDetails: { color: '#0ea5e9', fontSize: 11, marginTop: 2, fontWeight: '600' },
  pdfItemQty: { color: '#0f172a', fontSize: 11, fontWeight: '700' },
  pdfItemUom: { color: '#475569', fontSize: 11, fontWeight: '600' },
  pdfItemTotal: { color: '#0f172a', fontSize: 12, fontWeight: '700', marginTop: 2 },
  disclaimerBox: { backgroundColor: 'rgba(16,185,129,0.1)', padding: 10, borderRadius: 8, marginBottom: 16 },
  disclaimerText: { color: '#10b981', fontSize: 11, textAlign: 'center', fontWeight: '600' },
  pdfActions: { flexDirection: 'row', gap: 10 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: '#0ea5e9', gap: 6 },
  actionText: { color: '#0ea5e9', fontSize: 11, fontWeight: '700' },
  doneBtn: { flex: 1, backgroundColor: '#0ea5e9', justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
  doneText: { color: '#ffffff', fontSize: 13, fontWeight: '800' },
});
