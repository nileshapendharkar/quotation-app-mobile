import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, Image } from 'react-native';
import { Menu, Search, Filter, Shield } from 'lucide-react-native';
import ProductCard from '../components/ProductCard';
import { apiRequest } from '../api';

export default function HomeScreen({ onOpenMenu, onSelectProduct }) {
  const [categories, setCategories] = useState([
    { id: '', name: 'All Products' },
    { id: 'cat_tanks', name: 'Water Storage Tanks' },
    { id: 'cat_upvc', name: 'UPVC Pipes & Fittings' },
    { id: 'cat_cpvc', name: 'CPVC Pipes & Fittings' },
    { id: 'cat_swr', name: 'SWR Drainage' },
    { id: 'cat_agri', name: 'Agriculture Pipes' },
    { id: 'cat_hdpe', name: 'HDPE Pipes' },
    { id: 'cat_accessories', name: 'Accessories' }
  ]);

  const [products, setProducts] = useState([
    {
      id: "prod_1",
      name: "10 Layer Ora Water Tank",
      categoryId: "cat_tanks",
      categoryName: "Water Storage Tanks",
      image: "https://www.ganeshgouriindustries.com/assets/img/product/10-layer-orange-water-tank.webp",
      description: "Premium 10-layer orange water storage tank. 500L to 10000L."
    },
    {
      id: "prod_2",
      name: "10 Layer Gold Water Tank",
      categoryId: "cat_tanks",
      categoryName: "Water Storage Tanks",
      image: "https://www.ganeshgouriindustries.com/assets/img/product/10-layer-gold-water-tank.webp",
      description: "10-layer gold series with UV protection and food-grade inner layer."
    },
    {
      id: "prod_3",
      name: "3 Layer Water Tank",
      categoryId: "cat_tanks",
      categoryName: "Water Storage Tanks",
      image: "https://www.ganeshgouriindustries.com/assets/img/product/3-layer-water-tank.webp",
      description: "Triple layer tank with black middle layer. ISI certified."
    },
    {
      id: "prod_7",
      name: "UPVC Plumbing Pipes (Sch 40 & 80)",
      categoryId: "cat_upvc",
      categoryName: "UPVC Pipes & Fittings",
      image: "https://www.ganeshgouriindustries.com/assets/img/product/upvc-pipes-fittings.webp",
      description: "Lead-free ASTM UPVC pipes. 15mm to 50mm."
    },
    {
      id: "prod_9",
      name: "CPVC Pipes (SDR 11 Series)",
      categoryId: "cat_cpvc",
      categoryName: "CPVC Pipes & Fittings",
      image: "https://www.ganeshgouriindustries.com/assets/img/product/cpvc-pipe-fittings.webp",
      description: "Hot & cold water CPVC pipes. Up to 93°C."
    },
    {
      id: "prod_11",
      name: "SWR Drainage Pipes",
      categoryId: "cat_swr",
      categoryName: "SWR Drainage",
      image: "https://www.ganeshgouriindustries.com/assets/img/product/swr-drainage-pipes-fittings.webp",
      description: "Soil, waste and rainwater drainage. 75mm to 160mm."
    }
  ]);

  const [selectedCat, setSelectedCat] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchBackendData();
  }, [selectedCat, search]);

  const fetchBackendData = async () => {
    let url = '/products?';
    if (selectedCat) url += `categoryId=${selectedCat}&`;
    if (search) url += `search=${encodeURIComponent(search)}&`;

    const res = await apiRequest(url);
    if (res.success && res.products && res.products.length > 0) {
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
          <Menu size={22} color="#f8fafc" />
        </TouchableOpacity>

        <View style={styles.titleBox}>
          <Text style={styles.headerTitle}>Gouri Aqua Plast</Text>
          <Text style={styles.headerSub}>Tanks, Pipes & Fittings Catalog</Text>
        </View>

        <View style={styles.policyBadge}>
          <Shield size={14} color="#38bdf8" />
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
    backgroundColor: '#0b0f19',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 12,
    backgroundColor: '#0f172a',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  menuBtn: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  titleBox: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '800',
  },
  headerSub: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '600',
  },
  policyBadge: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
  },
  searchInput: {
    flex: 1,
    color: '#f8fafc',
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
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  catChipActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.2)',
    borderColor: '#38bdf8',
  },
  catChipText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
  },
  catChipTextActive: {
    color: '#38bdf8',
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
