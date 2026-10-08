import React, { useState, useEffect, useContext, useRef, useMemo, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, Image, Modal, BackHandler, ImageBackground, SafeAreaView, Dimensions } from 'react-native';
import { Menu, Search, Filter, Shield, Plus, Minus, X, Check, Bell } from 'lucide-react-native';
import ProductCard from '../components/ProductCard';
import { apiRequest, getImageUrl } from '../api';
import { CartContext } from '../context/CartContext';
import { FavoriteContext } from '../context/FavoriteContext';

const { width } = Dimensions.get('window');

// Module-level constants — avoid recreating on every render
const BANNERS = [
  require('../../assets/5.png'),
  require('../../assets/6.png'),
  require('../../assets/7.png'),
  require('../../assets/8.png'),
  require('../../assets/9.png')
];

export default function ProductScreen({ onOpenMenu, onSelectProduct, onNavigateNotifications }) {
  const { addToCart } = useContext(CartContext);
  const { isFavorite, toggleFavorite } = useContext(FavoriteContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const [lastAddedInfo, setLastAddedInfo] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [activeBanner, setActiveBanner] = useState(0);
  const bannerRef = useRef(null);
  const activeBannerRef = useRef(0);
  activeBannerRef.current = activeBanner;

  const unreadNotifications = 0;

  useEffect(() => {
    if (selectedCat || search || showSearch) return;

    const timer = setInterval(() => {
      const nextIndex = (activeBannerRef.current + 1) % BANNERS.length;
      if (bannerRef.current) {
        bannerRef.current.scrollTo({ x: nextIndex * width, animated: true });
      }
      setActiveBanner(nextIndex);
    }, 3000);

    return () => clearInterval(timer);
  }, [selectedCat, search, showSearch]);

  const [categories, setCategories] = useState([
    { id: '', name: 'All Groups', image: null },
    { id: 'cat_tanks', name: 'Water Storage Tanks', image: '/images/categories/cat_tanks.png' },
    { id: 'cat_cpvc', name: 'CPVC Pipes & Fittings', image: '/images/categories/cat_cpvc.png' },
    { id: 'cat_upvc', name: 'UPVC Pipes & Fittings', image: '/images/categories/cat_upvc.png' },
    { id: 'cat_swr', name: 'SWR Drainage Pipes & Fittings', image: '/images/categories/cat_swr.png' },
    { id: 'cat_casing', name: 'UPVC CASING PIPES', image: '/images/categories/cat_casing.png' },
    { id: 'cat_agri', name: 'Agriculture Pipes & Fittings', image: '/images/categories/cat_agri.png' },
    { id: 'cat_hdpe', name: 'HDPE PIPE & FITTINGS', image: '/images/categories/cat_hdpe.png' },
    { id: 'cat_sprinkler', name: 'Sprinkler Pipes & Fittings', image: '/images/categories/cat_sprinkler.png' },
    { id: 'cat_column', name: 'UPVC COLUMN PIPES', image: '/images/categories/cat_column.png' },
    { id: 'cat_sanitary', name: 'Toilet Seat Cover & Flushing Cistern', image: 'https://www.ganeshgouriindustries.com/images/index/SANITARY-WARE.png' },
    { id: 'cat_eco_drainage', name: 'Eco Drainage Pipes', image: '/images/categories/cat_eco_drainage.png' },
    { id: 'cat_dwc', name: 'DWC', image: '/images/categories/cat_dwc.png' },
    { id: 'cat_garden', name: 'Garden, Braided & LDPE Pipes', image: '/images/categories/cat_garden.png' },
    { id: 'cat_solvent', name: 'Solvent Cement & Lubricants', image: 'https://www.ganeshgouriindustries.com/assets/img/product/solvent-cement.webp' },
    { id: 'cat_drip', name: 'DRIP IRRIGATION SYSTEM', image: '/images/categories/cat_drip.png' },
    { id: 'cat_household', name: 'HOUSEHOLD PRODUCTS', image: '/images/categories/cat_household.png' },
    { id: 'cat_faucets', name: 'FAUCETS', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/faucet.png' }
  ]);

  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedSubCat, setSelectedSubCat] = useState('');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search input — only fire API call after 300ms pause
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchBackendCategories();
    fetchBackendSubCategories();
  }, []);

  useEffect(() => {
    fetchBackendData();
  }, [selectedCat, selectedSubCat, debouncedSearch]);

  useEffect(() => {
    const onBackPress = () => {
      if (selectedProduct) {
        setSelectedProduct(null);
        return true;
      }
      if (showSearch) {
        setShowSearch(false);
        setSearch('');
        return true;
      }
      if (selectedSubCat) {
        setSelectedSubCat('');
        return true;
      }
      if (selectedCat) {
        setSelectedCat('');
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => backHandler.remove();
  }, [selectedProduct, selectedSubCat, selectedCat, showSearch]);

  const fetchBackendSubCategories = async () => {
    const res = await apiRequest('/subcategories');
    if (res.success && res.subCategories) {
      setSubCategories(res.subCategories);
    }
  };

  const fetchBackendCategories = async () => {
    const res = await apiRequest('/categories');
    if (res.success && res.categories && res.categories.length > 0) {
      setCategories(prev => {
        const merged = [...res.categories];
        // Ensure any local categories like DWC are preserved if missing from backend server response
        prev.forEach(localCat => {
          if (localCat.id && !merged.some(c => c.id === localCat.id)) {
            merged.push(localCat);
          }
        });
        return [{ id: '', name: 'All Groups', image: null }, ...merged];
      });
    }
  };

  const fetchBackendData = async () => {
    let url = '/products?';
    if (selectedCat) url += `categoryId=${selectedCat}&`;
    if (selectedSubCat) url += `subcategoryId=${selectedSubCat}&`;
    if (debouncedSearch) url += `search=${encodeURIComponent(debouncedSearch)}&`;

    const res = await apiRequest(url);
    if (res.success && res.products) {
      setProducts(res.products);
    }
  };

  // Server already filters — no need for redundant client-side filtering
  // Just use `products` directly

  const handleSelectCategory = useCallback((catId) => {
    setSelectedCat(catId);
    setSelectedSubCat('');
    setShowSearch(false);
  }, []);

  const handleSelectSubCategory = useCallback((subCatId) => {
    setSelectedSubCat(subCatId);
  }, []);

  const currentSubCats = useMemo(() => 
    subCategories.filter(sc => sc.categoryId === selectedCat),
    [subCategories, selectedCat]
  );
  const showSubCategories = selectedCat && !selectedSubCat && !search && currentSubCats.length > 0;

  const handleOpenProductDetail = useCallback((product) => {
    setSelectedProduct(product);
    setQty(1);
    setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : '');
    setSuccessMsg(false);
  }, []);

  const handleConfirmAddToCart = () => {
    if (!selectedProduct) return;
    if (selectedProduct.sizes && selectedProduct.sizes.length > 0 && !selectedSize) {
      alert('Please select a size before adding to cart.');
      return;
    }
    addToCart(selectedProduct, qty, selectedSize);
    const sizeLabel = selectedSize ? `${qty}× ${selectedSize}` : `${qty}× item`;
    setLastAddedInfo(sizeLabel);
    setSuccessMsg(true);
    // Keep the modal open — just reset after a brief success flash so the user
    // can pick another size and add again. The user closes manually via X / back.
    setTimeout(() => {
      setSuccessMsg(false);
      setQty(1);
    }, 1500);
  };

  const handleBannerScroll = useCallback((event) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width - 0.1);
    if (slide !== activeBannerRef.current) {
      setActiveBanner(slide);
    }
  }, []);

  // FlatList renderItem for virtualized product grid
  const renderProductItem = useCallback(({ item }) => (
    <View style={styles.gridItemWrapper}>
      <ProductCard 
        product={item} 
        favorited={isFavorite(item.id)}
        onToggleFavorite={toggleFavorite}
        onSelect={handleOpenProductDetail} 
      />
    </View>
  ), [handleOpenProductDetail, isFavorite, toggleFavorite]);

  const productKeyExtractor = useCallback((item) => item.id, []);

  return (
    <ImageBackground
      source={require('../../assets/splash_bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onOpenMenu} style={styles.headerIconBtn}>
            <Menu color="#27347a" size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>CATALOG</Text>
          <View style={styles.headerRight}>
             <TouchableOpacity style={styles.headerIconBtn} onPress={() => setShowSearch(!showSearch)}>
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

        {showSearch && (
          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <Search size={18} color="#64748b" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search product name or model..."
                placeholderTextColor="#64748b"
                value={search}
                onChangeText={setSearch}
                autoFocus
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch('')}>
                  <X size={18} color="#64748b" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {selectedCat || search || showSearch ? (
          <FlatList
            data={products}
            renderItem={renderProductItem}
            keyExtractor={productKeyExtractor}
            numColumns={2}
            ListHeaderComponent={
              <View>
                {/* Main Category Chips if a category is selected */}
                {selectedCat && !search && (
                  <View style={[styles.subCategorySection, { paddingBottom: currentSubCats.length > 0 ? 5 : 16 }]}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipScroll}>
                      {categories.filter(c => c.id !== '').map((cat) => {
                        const isSelCat = selectedCat === cat.id;
                        return (
                          <TouchableOpacity
                            key={cat.id}
                            style={[styles.catChip, isSelCat && styles.catChipActive]}
                            onPress={() => handleSelectCategory(cat.id)}
                          >
                            <Text style={[styles.catChipText, isSelCat && styles.catChipTextActive]}>{cat.name}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                )}

                {/* Subcategory Chips if a category is selected */}
                {selectedCat && !search && currentSubCats.length > 0 && (
                  <View style={[styles.subCategorySection, { paddingTop: 5 }]}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipScroll}>
                      <TouchableOpacity
                        style={[styles.catChip, !selectedSubCat && styles.catChipActive]}
                        onPress={() => setSelectedSubCat('')}
                      >
                        <Text style={[styles.catChipText, !selectedSubCat && styles.catChipTextActive]}>All</Text>
                      </TouchableOpacity>
                      {currentSubCats.map((sub) => {
                        const isSelSub = selectedSubCat === sub.id;
                        return (
                          <TouchableOpacity
                            key={sub.id}
                            style={[styles.catChip, isSelSub && styles.catChipActive]}
                            onPress={() => handleSelectSubCategory(sub.id)}
                          >
                            <Text style={[styles.catChipText, isSelSub && styles.catChipTextActive]}>{sub.name}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                )}
              </View>
            }
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>No matching quotation products found.</Text>
              </View>
            }
            contentContainerStyle={styles.productsFlatListContent}
            removeClippedSubviews={Platform.OS === 'android'}
            maxToRenderPerBatch={8}
            windowSize={5}
            initialNumToRender={8}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Banner Slider */}
            <View style={styles.bannerWrapper}>
              <ScrollView 
                ref={bannerRef}
                horizontal 
                pagingEnabled 
                showsHorizontalScrollIndicator={false} 
                onScroll={handleBannerScroll}
                scrollEventThrottle={16}
              >
                {BANNERS.map((img, idx) => (
                  <Image key={idx} source={img} style={styles.bannerImage} resizeMode="stretch" fadeDuration={0} />
                ))}
              </ScrollView>
              <View style={styles.carouselDots}>
                {BANNERS.map((_, idx) => (
                  <View key={idx} style={[styles.dot, activeBanner === idx && styles.activeDot]} />
                ))}
              </View>
            </View>

            {/* 3x3 Grid Categories */}
            <View style={styles.categoriesSection}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <View style={styles.categoriesGrid}>
                {categories.filter(c => c.id !== '').map((item) => (
                  <TouchableOpacity key={item.id} style={styles.categoryCard} onPress={() => handleSelectCategory(item.id)}>
                    <View style={styles.categoryImageWrapper}>
                      {item.image ? (
                        <Image source={getImageUrl(item.image)} style={styles.categoryImage} resizeMode="contain" fadeDuration={0} />
                      ) : (
                        <View style={styles.categoryImagePlaceholder} />
                      )}
                    </View>
                    <View style={styles.categoryTextWrapper}>
                      <Text style={styles.categoryText} numberOfLines={2}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>

      {/* Product Detail Modal */}
      <Modal
        visible={!!selectedProduct}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setSelectedProduct(null)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setSelectedProduct(null)}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            {selectedProduct && (
              <View style={{ width: '100%' }}>
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
                    onPress={() => setSelectedProduct(null)}
                  >
                    <X size={20} color="#64748b" />
                  </TouchableOpacity>
                </View>

                {successMsg && (
                  <View style={{ backgroundColor: '#10b981', padding: 10, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                    <Check size={16} color="#ffffff" style={{ marginRight: 6 }} />
                    <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: '800' }}>
                      Added {lastAddedInfo} to Cart! Select another size to add more.
                    </Text>
                  </View>
                )}

                <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScroll}>
                  <Image source={getImageUrl(selectedProduct.image)} style={styles.modalImage} resizeMode="contain" />

                  {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                    <View style={styles.sizesSection}>
                      <Text style={styles.sizeSelectionLabel}>Select Size <Text style={{ color: '#ef4444' }}>*</Text></Text>
                      <View style={styles.sizeChipsRow}>
                        {selectedProduct.sizes.map((sz, i) => {
                          const isSel = selectedSize === sz;
                          return (
                            <TouchableOpacity
                              key={i}
                              style={[styles.sizeSelectorChip, isSel && styles.sizeSelectorChipActive]}
                              onPress={() => setSelectedSize(sz)}
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

                  <View style={styles.detailsBlock}>
                    <Text style={styles.detailsBlockTitle}>Product Details</Text>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Product Category</Text>
                      <Text style={styles.detailValue}>{selectedProduct.categoryName || 'N/A'}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Product Name</Text>
                      <Text style={[styles.detailValue, { flex: 1, textAlign: 'right', marginLeft: 16 }]} numberOfLines={1}>{selectedProduct.name}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Unit of Measure (UOM)</Text>
                      <Text style={styles.detailValue}>{selectedProduct.uom || 'Nos'}</Text>
                    </View>
                    {selectedSize ? (
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Selected Size</Text>
                        <Text style={[styles.detailValue, { color: '#0ea5e9' }]}>{selectedSize}</Text>
                      </View>
                    ) : null}
                    {selectedProduct.sizeProductCodes && selectedProduct.sizeProductCodes[selectedSize] ? (
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Product Code</Text>
                        <Text style={[styles.detailValue, { color: '#0ea5e9' }]}>{selectedProduct.sizeProductCodes[selectedSize]}</Text>
                      </View>
                    ) : null}
                    {(selectedProduct.packSizes && selectedProduct.packSizes[selectedSize]) || selectedProduct.packSize ? (
                      <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
                        <Text style={styles.detailLabel}>Packing</Text>
                        <Text style={[styles.detailValue, { color: '#10b981' }]}>
                          {selectedProduct.packSizes && selectedProduct.packSizes[selectedSize] ? `${selectedProduct.packSizes[selectedSize]} Units / Pack` : `${selectedProduct.packSize} Units / Pack`}
                        </Text>
                      </View>
                    ) : null}
                  </View>

                  <Text style={styles.modalSectionTitle}>Description</Text>
                  <Text style={styles.modalDescription}>
                    {selectedProduct.description || 'No description available for this item.'}
                  </Text>

                  {selectedProduct.details && (
                    <React.Fragment>
                      <Text style={styles.modalSectionTitle}>Details</Text>
                      <Text style={styles.modalDescription}>{selectedProduct.details}</Text>
                    </React.Fragment>
                  )}

                  {selectedProduct.specification && (
                    <React.Fragment>
                      <Text style={styles.modalSectionTitle}>Specifications</Text>
                      <Text style={styles.modalDescription}>{selectedProduct.specification}</Text>
                    </React.Fragment>
                  )}

                  <View style={styles.qtySection}>
                    <Text style={styles.modalSectionTitle}>Configure Quantity</Text>
                    <View style={styles.stepperContainer}>
                      <TouchableOpacity style={styles.stepperBtn} onPress={() => setQty(prev => Math.max(1, prev - 10))}>
                        <Text style={styles.stepperBtnTxt}>-10</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.stepperBtn} onPress={() => setQty(prev => Math.max(1, prev - 1))}>
                        <Minus size={14} color="#0f172a" />
                      </TouchableOpacity>
                      <Text style={styles.stepperValue}>{qty}</Text>
                      <TouchableOpacity style={styles.stepperBtn} onPress={() => setQty(prev => prev + 1)}>
                        <Plus size={14} color="#0f172a" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.stepperBtn} onPress={() => setQty(prev => prev + 10)}>
                        <Text style={styles.stepperBtnTxt}>+10</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>

                <View style={styles.modalFooter}>
                  <TouchableOpacity style={styles.confirmAddBtn} onPress={handleConfirmAddToCart}>
                    <Text style={styles.confirmAddBtnText}>Add to Quote Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
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
  searchSection: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    color: '#0f172a',
    fontSize: 14,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  bannerWrapper: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    position: 'relative',
  },
  bannerImage: {
    width: width,
    height: '100%',
  },
  carouselDots: {
    position: 'absolute',
    bottom: -15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(39, 52, 122, 0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#27347a',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  categoriesSection: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000000',
    marginLeft: 20,
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '31.5%',
    aspectRatio: 0.70,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    justifyContent: 'space-between',
  },
  categoryImageWrapper: {
    flex: 1,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f1f5f9',
    borderRadius: 6,
  },
  categoryTextWrapper: {
    backgroundColor: '#e0f2fe',
    paddingVertical: 6,
    paddingHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
    lineHeight: 14,
  },
  subCategorySection: {
    paddingTop: 12,
    marginBottom: 14,
  },
  chipScroll: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 10,
    alignItems: 'center',
  },
  catChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  catChipActive: {
    backgroundColor: '#27347a',
    borderColor: '#27347a',
    shadowColor: '#27347a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
    transform: [{ scale: 1.06 }],
  },
  catChipText: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '700',
  },
  catChipTextActive: {
    color: '#ffffff',
    fontWeight: '900',
  },
  gridContainer: {
    paddingHorizontal: 10,
  },
  productsGrid: {
    paddingBottom: 10,
  },
  productsFlatListContent: {
    paddingHorizontal: 10,
    paddingBottom: 90,
  },
  gridItemWrapper: {
    flex: 1,
    padding: 6,
  },
  emptyBox: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '500',
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
    fontWeight: '800',
    color: '#0f172a',
  },
  modalCategoryTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0ea5e9',
    marginTop: 2,
  },
  closeModalBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  modalScroll: {
    maxHeight: 460,
  },
  modalImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    marginBottom: 16,
  },
  sizesSection: {
    marginBottom: 16,
  },
  sizeSelectionLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 10,
  },
  sizeChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sizeSelectorChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
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
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  sizeSelectorChipTextActive: {
    color: '#0ea5e9',
    fontWeight: '800',
  },
  detailsBlock: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
  },
  detailsBlockTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  detailLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0f172a',
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
    height: 48,
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
    height: 48,
    backgroundColor: '#10b981',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successMessageText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
});
