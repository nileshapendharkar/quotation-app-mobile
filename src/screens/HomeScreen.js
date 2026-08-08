import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, Image, Modal } from 'react-native';
import { Menu, Search, Filter, Shield, Plus, Minus, X, Check } from 'lucide-react-native';
import ProductCard from '../components/ProductCard';
import { apiRequest, getImageUrl } from '../api';
import { CartContext } from '../context/CartContext';

export default function HomeScreen({ onOpenMenu, onSelectProduct }) {
  const { addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const [categories, setCategories] = useState([
    { id: '', name: 'All Groups', image: null },
    { id: 'cat_tanks', name: 'Water Storage Tanks', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/tank.png' },
    { id: 'cat_cpvc', name: 'CPVC Pipes & Fittings', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/cpvc.png' },
    { id: 'cat_upvc', name: 'UPVC Pipes & Fittings', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/upvc.png' },
    { id: 'cat_swr', name: 'SWR Drainage Pipes & Fittings', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/SWR-Pipes.png' },
    { id: 'cat_casing', name: 'UPVC CASING PIPES', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/Casing-Pipe.png' },
    { id: 'cat_agri', name: 'Agriculture Pipes & Fittings', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/Agri-Pipes.png' },
    { id: 'cat_hdpe', name: 'HDPE PIPE & FITTINGS', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/hdpe.png' },
    { id: 'cat_sprinkler', name: 'Sprinkler Pipes & Fittings', image: 'https://www.ganeshgouriindustries.com/images/index/Sprinkler-Pipe.png' },
    { id: 'cat_column', name: 'UPVC COLUMN PIPES', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/Column-Pipes.png' },
    { id: 'cat_sanitary', name: 'Toilet Seat Cover & Flushing Cistern', image: 'https://www.ganeshgouriindustries.com/images/index/SANITARY-WARE.png' },
    { id: 'cat_eco_drainage', name: 'Eco Drainage Pipes', image: 'https://www.ganeshgouriindustries.com/images/index/Dranage-Pipe.png' },
    { id: 'cat_garden', name: 'Garden, Braided & LDPE Pipes', image: 'https://www.ganeshgouriindustries.com/images/index/C.png' },
    { id: 'cat_solvent', name: 'Solvent Cement & Lubricants', image: 'https://www.ganeshgouriindustries.com/assets/img/product/solvent-cement.webp' },
    { id: 'cat_drip', name: 'DRIP IRRIGATION SYSTEM', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/drip.png' },
    { id: 'cat_household', name: 'HOUSEHOLD PRODUCTS', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/household.png' },
    { id: 'cat_faucets', name: 'FAUCETS', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/faucet.png' }
  ]);

  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedSubCat, setSelectedSubCat] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchBackendCategories();
    fetchBackendSubCategories();
  }, []);

  useEffect(() => {
    fetchBackendData();
  }, [selectedCat, selectedSubCat, search]);

  const fetchBackendSubCategories = async () => {
    const res = await apiRequest('/subcategories');
    if (res.success && res.subCategories) {
      setSubCategories(res.subCategories);
    }
  };

  const fetchBackendCategories = async () => {
    const res = await apiRequest('/categories');
    if (res.success && res.categories && res.categories.length > 0) {
      setCategories([{ id: '', name: 'All Groups', image: null }, ...res.categories]);
    }
  };

  const fetchBackendData = async () => {
    let url = '/products?';
    if (selectedCat) url += `categoryId=${selectedCat}&`;
    if (selectedSubCat) url += `subcategoryId=${selectedSubCat}&`;
    if (search) url += `search=${encodeURIComponent(search)}&`;

    const res = await apiRequest(url);
    if (res.success && res.products) {
      setProducts(res.products);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesCat = !selectedCat || p.categoryId === selectedCat;
    const matchesSubCat = !selectedSubCat || p.subcategoryId === selectedSubCat;
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSubCat && matchesSearch;
  });

  const handleSelectCategory = (catId) => {
    setSelectedCat(catId);
    setSelectedSubCat('');
  };

  const handleSelectSubCategory = (subCatId) => {
    setSelectedSubCat(subCatId);
  };

  const currentSubCats = subCategories.filter(sc => sc.categoryId === selectedCat);
  const showSubCategories = selectedCat && !selectedSubCat && !search && currentSubCats.length > 0;

  const handleOpenProductDetail = (product) => {
    setSelectedProduct(product);
    setQty(1);
    setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : '');
    setSuccessMsg(false);
  };

  const handleConfirmAddToCart = () => {
    if (!selectedProduct) return;
    addToCart(selectedProduct, qty, selectedSize);
    setSuccessMsg(true);
    setTimeout(() => {
      setSelectedProduct(null);
      setSuccessMsg(false);
    }, 1200);
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={onOpenMenu} style={styles.menuBtn}>
          <Menu size={22} color="#0f172a" />
        </TouchableOpacity>

        <View style={styles.titleBox}>
          <Text style={styles.headerTitle}>Gouri Aqua Plast</Text>
          <Text style={styles.headerSub}>Tanks, Pipes & Fittings Catalog</Text>
        </View>

        <View style={styles.policyBadge}>
          <Shield size={14} color="#0ea5e9" />
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={18} color="#64748b" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search product name or model..."
            placeholderTextColor="#64748b"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Main Content Area */}
      {(!selectedCat && !search) ? (
        <FlatList
          data={categories.filter(c => c.id !== '')}
          keyExtractor={(item, index) => item.id || `cat_${index}`}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.groupCard} activeOpacity={0.8} onPress={() => handleSelectCategory(item.id)}>
              <View style={styles.groupImageContainer}>
                {item.image ? (
                  <Image source={{ uri: getImageUrl(item.image) }} style={styles.groupImage} resizeMode="contain" />
                ) : (
                  <View style={styles.groupImagePlaceholder} />
                )}
              </View>
              <View style={styles.groupTextContainer}>
                <Text style={styles.groupName} numberOfLines={2}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.gridContent}
        />
      ) : showSubCategories ? (
        <React.Fragment>
          {/* Category Slider for easy navigation back */}
          <View style={styles.categorySection}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
              {categories.map((cat, index) => {
                const isSelected = selectedCat === cat.id;
                return (
                  <TouchableOpacity
                    key={cat.id || `chip_${index}`}
                    style={[styles.catChip, isSelected && styles.catChipActive]}
                    onPress={() => handleSelectCategory(cat.id)}
                  >
                    {cat.image ? (
                      <Image source={{ uri: getImageUrl(cat.image) }} style={styles.catChipImg} resizeMode="contain" />
                    ) : null}
                    <Text style={[styles.catChipText, isSelected && styles.catChipTextActive]}>
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.sectionHeaderBox}>
            <Text style={styles.sectionHeaderText}>Select Sub Category</Text>
          </View>

          <FlatList
            data={currentSubCats}
            keyExtractor={(item, index) => item.id || `subcat_${index}`}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.groupCard} activeOpacity={0.8} onPress={() => handleSelectSubCategory(item.id)}>
                <View style={styles.groupImageContainer}>
                  {item.image ? (
                    <Image source={{ uri: getImageUrl(item.image) }} style={styles.groupImage} resizeMode="contain" />
                  ) : (
                    <View style={styles.groupImagePlaceholder} />
                  )}
                </View>
                <View style={styles.groupTextContainer}>
                  <Text style={styles.groupName} numberOfLines={2}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.gridContent}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* Category Slider */}
          <View style={styles.categorySection}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
              {categories.map((cat, index) => {
                const isSelected = selectedCat === cat.id;
                return (
                  <TouchableOpacity
                    key={cat.id || `chip_${index}`}
                    style={[styles.catChip, isSelected && styles.catChipActive]}
                    onPress={() => handleSelectCategory(cat.id)}
                  >
                    {cat.image ? (
                      <Image source={{ uri: getImageUrl(cat.image) }} style={styles.catChipImg} resizeMode="contain" />
                    ) : null}
                    <Text style={[styles.catChipText, isSelected && styles.catChipTextActive]}>
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Optional: Sub Category Slider if subcategories exist and one is selected */}
          {selectedCat && currentSubCats.length > 0 && !search && (
            <View style={styles.subCategorySection}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
                <TouchableOpacity
                  style={[styles.catChip, !selectedSubCat && styles.catChipActive]}
                  onPress={() => setSelectedSubCat('')}
                >
                  <Text style={[styles.catChipText, !selectedSubCat && styles.catChipTextActive]}>
                    All
                  </Text>
                </TouchableOpacity>
                {currentSubCats.map((sub, index) => {
                  const isSelSub = selectedSubCat === sub.id;
                  return (
                    <TouchableOpacity
                      key={sub.id || `subchip_${index}`}
                      style={[styles.catChip, isSelSub && styles.catChipActive]}
                      onPress={() => handleSelectSubCategory(sub.id)}
                    >
                      <Text style={[styles.catChipText, isSelSub && styles.catChipTextActive]}>
                        {sub.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}

          {/* Products Grid (2 per row) */}
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <ProductCard product={item} onSelect={handleOpenProductDetail} />
            )}
            contentContainerStyle={styles.gridContent}
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>No matching quotation products found.</Text>
              </View>
            }
          />
        </React.Fragment>
      )}

      {/* Product Detail & size selection modal */}
      <Modal
        visible={!!selectedProduct}
        animationType="fade"
        transparent={true}
        onRequestClose={() => !successMsg && setSelectedProduct(null)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => !successMsg && setSelectedProduct(null)}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            {selectedProduct && (
              <View style={{ width: '100%' }}>
                {/* Header */}
                <View style={styles.modalHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modalProductTitle} numberOfLines={1}>
                      {selectedProduct.name}
                    </Text>
                    <Text style={styles.modalCategoryTitle}>
                      {selectedProduct.categoryName || 'Catalog Item'}
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.closeModalBtn} 
                    onPress={() => !successMsg && setSelectedProduct(null)}
                  >
                    <X size={20} color="#64748b" />
                  </TouchableOpacity>
                </View>

                {/* Content */}
                <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScroll}>
                  <Image source={{ uri: getImageUrl(selectedProduct.image) }} style={styles.modalImage} resizeMode="contain" />
                  
                  <Text style={styles.modalSectionTitle}>Specifications</Text>
                  <Text style={styles.modalDescription}>
                    {selectedProduct.description || 'No description available for this item.'}
                  </Text>

                  {/* Size Options Selection */}
                  {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                    <View style={styles.sizesSection}>
                      <Text style={styles.modalSectionTitle}>Select Size Option</Text>
                      <View style={styles.sizeChipsRow}>
                        {selectedProduct.sizes.map((sz, i) => {
                          const isSel = selectedSize === sz;
                          return (
                            <TouchableOpacity
                              key={i}
                              style={[styles.sizeSelectorChip, isSel && styles.sizeSelectorChipActive]}
                              onPress={() => !successMsg && setSelectedSize(sz)}
                            >
                              <Text style={[styles.sizeSelectorChipText, isSel && styles.sizeSelectorChipTextActive]}>
                                {sz}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  )}

                  {/* Quantity Counter */}
                  <View style={styles.qtySection}>
                    <Text style={styles.modalSectionTitle}>Configure Quantity</Text>
                    <View style={styles.stepperContainer}>
                      <TouchableOpacity
                        style={styles.stepperBtn}
                        onPress={() => !successMsg && setQty(prev => Math.max(1, prev - 10))}
                      >
                        <Text style={styles.stepperBtnTxt}>-10</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        style={styles.stepperBtn}
                        onPress={() => !successMsg && setQty(prev => Math.max(1, prev - 1))}
                      >
                        <Minus size={14} color="#0f172a" />
                      </TouchableOpacity>

                      <Text style={styles.stepperValue}>{qty}</Text>

                      <TouchableOpacity
                        style={styles.stepperBtn}
                        onPress={() => !successMsg && setQty(prev => prev + 1)}
                      >
                        <Plus size={14} color="#0f172a" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.stepperBtn}
                        onPress={() => !successMsg && setQty(prev => prev + 10)}
                      >
                        <Text style={styles.stepperBtnTxt}>+10</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>

                {/* Footer Add Button */}
                <View style={styles.modalFooter}>
                  {successMsg ? (
                    <View style={styles.successMessageBtn}>
                      <Check size={18} color="#ffffff" style={{ marginRight: 6 }} />
                      <Text style={styles.successMessageText}>Added to Quote Cart!</Text>
                    </View>
                  ) : (
                    <TouchableOpacity 
                      style={styles.confirmAddBtn} 
                      onPress={handleConfirmAddToCart}
                    >
                      <Text style={styles.confirmAddBtnText}>Add to Quote Cart</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  menuBtn: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
  },
  titleBox: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '800',
  },
  headerSub: {
    color: '#0ea5e9',
    fontSize: 11,
    fontWeight: '600',
  },
  policyBadge: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(14, 165, 233, 0.12)',
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
  },
  searchInput: {
    flex: 1,
    color: '#0f172a',
    fontSize: 13,
  },
  categorySection: {
    marginBottom: 8,
  },
  categoryScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  catChipImg: {
    width: 20,
    height: 20,
    marginRight: 8,
    borderRadius: 4,
  },
  catChipActive: {
    backgroundColor: 'rgba(14, 165, 233, 0.15)',
    borderColor: '#0ea5e9',
  },
  catChipText: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600',
  },
  catChipTextActive: {
    color: '#0ea5e9',
    fontWeight: '800',
  },
  gridContent: {
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
  emptyBox: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#64748b',
    fontSize: 13,
  },
  groupCard: {
    flex: 1,
    margin: 6,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  sectionHeaderBox: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a',
  },
  subCategorySection: {
    marginBottom: 8,
    marginTop: -4,
  },
  groupImageContainer: {
    width: '100%',
    height: 120,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  groupImage: {
    width: '100%',
    height: '100%',
  },
  groupImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e2e8f0',
  },
  groupTextContainer: {
    width: '100%',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupName: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    elevation: 8,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    marginBottom: 12,
  },
  modalProductTitle: {
    fontSize: 16,
    fontWeight: '805',
    color: '#0f172a',
  },
  modalCategoryTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0ea5e9',
    marginTop: 2,
  },
  closeModalBtn: {
    padding: 4,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  modalScroll: {
    maxHeight: 380,
  },
  modalImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    marginBottom: 16,
  },
  modalSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 18,
    marginBottom: 16,
  },
  sizesSection: {
    marginBottom: 16,
  },
  sizeChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sizeSelectorChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  sizeSelectorChipActive: {
    borderColor: '#0ea5e9',
    backgroundColor: 'rgba(14, 165, 233, 0.1)',
  },
  sizeSelectorChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  sizeSelectorChipTextActive: {
    color: '#0ea5e9',
    fontWeight: '800',
  },
  qtySection: {
    marginBottom: 12,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepperBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  stepperBtnTxt: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  stepperValue: {
    width: 48,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  modalFooter: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 14,
  },
  confirmAddBtn: {
    width: '100%',
    height: 46,
    backgroundColor: '#0ea5e9',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmAddBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  successMessageBtn: {
    width: '100%',
    height: 46,
    backgroundColor: '#10b981',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successMessageText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '850',
  },
});
