import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, Image } from 'react-native';
import { Menu, Search, Filter, Shield } from 'lucide-react-native';
import ProductCard from '../components/ProductCard';
import { apiRequest } from '../api';

export default function HomeScreen({ onOpenMenu, onSelectProduct }) {
  const [categories, setCategories] = useState([
    { id: '', name: 'All Categories' },
    { id: 'cat_1', name: 'Industrial Safety', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400&q=80' },
    { id: 'cat_2', name: 'Office Electronics', image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=400&q=80' },
    { id: 'cat_3', name: 'Heavy Machinery Parts', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80' },
    { id: 'cat_4', name: 'Packaging Materials', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80' }
  ]);

  const [products, setProducts] = useState([
    {
      id: "prod_1",
      name: "Pro-Grade Heavy Duty Safety Helmet",
      categoryId: "cat_1",
      categoryName: "Industrial Safety",
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&q=80",
      description: "Impact-resistant ABS shell with 6-point textile suspension."
    },
    {
      id: "prod_2",
      name: "High-Visibility Reflective Vest (Class 3)",
      categoryId: "cat_1",
      categoryName: "Industrial Safety",
      image: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=500&q=80",
      description: "Breathable polyester fabric with 2-inch reflective stripes."
    },
    {
      id: "prod_3",
      name: "Ergonomic Mesh Task Chair",
      categoryId: "cat_2",
      categoryName: "Office Electronics",
      image: "https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=500&q=80",
      description: "Adjustable lumbar support and 3D armrests."
    },
    {
      id: "prod_4",
      name: "Dual-Band Enterprise Wi-Fi 6 Router",
      categoryId: "cat_2",
      categoryName: "Office Electronics",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&q=80",
      description: "High-density multi-gigabit throughput."
    },
    {
      id: "prod_5",
      name: "Precision Hydraulic Pressure Control Valve",
      categoryId: "cat_3",
      categoryName: "Heavy Machinery Parts",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&q=80",
      description: "Forged alloy steel body rated for high pressure systems."
    },
    {
      id: "prod_6",
      name: "Heavy-Duty Ceramic Ball Bearings (Set of 10)",
      categoryId: "cat_3",
      categoryName: "Heavy Machinery Parts",
      image: "https://images.unsplash.com/photo-1618042164219-62c820f10723?w=500&q=80",
      description: "Low-friction silicon nitride ceramic balls."
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
          <Text style={styles.headerTitle}>Product Catalog</Text>
          <Text style={styles.headerSub}>Strictly Zero Price Policy</Text>
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
