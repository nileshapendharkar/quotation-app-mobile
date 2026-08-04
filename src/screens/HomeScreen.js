import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, Image } from 'react-native';
import { Menu, Search, Filter, Shield } from 'lucide-react-native';
import ProductCard from '../components/ProductCard';
import { apiRequest } from '../api';

export default function HomeScreen({ onOpenMenu, onSelectProduct }) {
  const [categories, setCategories] = useState([
    { id: '', name: 'All Groups', image: null },
    { id: 'cat_tanks', name: 'Water Storage Tanks', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/tank.png' },
    { id: 'cat_cpvc', name: 'CPVC Pipes & Fittings', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/cpvc.png' },
    { id: 'cat_upvc', name: 'UPVC Pipes & Fittings', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/upvc.png' },
    { id: 'cat_swr', name: 'SWR Drainage Pipes & Fittings', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/SWR-Pipes.png' },
    { id: 'cat_casing', name: 'Casing Pipes - Blue', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/Casing-Pipe.png' },
    { id: 'cat_agri', name: 'Agriculture Pipes & Fittings', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/Agri-Pipes.png' },
    { id: 'cat_hdpe', name: 'HDPE Pipes', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/hdpe.png' },
    { id: 'cat_sprinkler', name: 'Sprinkler Pipes', image: 'https://www.ganeshgouriindustries.com/images/index/Sprinkler-Pipe.png' },
    { id: 'cat_column', name: 'Column Pipes', image: 'https://www.ganeshgouriindustries.com/images/index/new-product/Column-Pipes.png' },
    { id: 'cat_sanitary', name: 'Toilet Seat Cover & Flushing Cistern', image: 'https://www.ganeshgouriindustries.com/images/index/SANITARY-WARE.png' },
    { id: 'cat_eco_drainage', name: 'Eco Drainage Pipes', image: 'https://www.ganeshgouriindustries.com/images/index/Dranage-Pipe.png' },
    { id: 'cat_garden', name: 'Garden, Braided & LDPE Pipes', image: 'https://www.ganeshgouriindustries.com/images/index/C.png' }
  ]);

  const [products, setProducts] = useState([]);
  const [selectedCat, setSelectedCat] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchBackendCategories();
    fetchBackendData();
  }, [selectedCat, search]);

  const fetchBackendCategories = async () => {
    const res = await apiRequest('/categories');
    if (res.success && res.categories && res.categories.length > 0) {
      setCategories([{ id: '', name: 'All Groups', image: null }, ...res.categories]);
    }
  };

  const fetchBackendData = async () => {
    let url = '/products?';
    if (selectedCat) url += `categoryId=${selectedCat}&`;
    if (search) url += `search=${encodeURIComponent(search)}&`;

    const res = await apiRequest(url);
    if (res.success && res.products) {
      setProducts(res.products);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesCat = !selectedCat || p.categoryId === selectedCat;
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

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

      {/* Category Slider */}
      <View style={styles.categorySection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {categories.map((cat) => {
            const isSelected = selectedCat === cat.id;
            return (
              <TouchableOpacity
                key={cat.id || 'all'}
                style={[styles.catChip, isSelected && styles.catChipActive]}
                onPress={() => setSelectedCat(cat.id)}
              >
                {cat.image ? (
                  <Image source={{ uri: cat.image }} style={styles.catChipImg} resizeMode="contain" />
                ) : null}
                <Text style={[styles.catChipText, isSelected && styles.catChipTextActive]}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Products Grid (2 per row) */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard product={item} onSelect={onSelectProduct} />
        )}
        contentContainerStyle={styles.gridContent}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>No matching quotation products found.</Text>
          </View>
        }
      />
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
});
