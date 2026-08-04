import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Heart, Trash2, PlusCircle, ArrowLeft } from 'lucide-react-native';
import { FavoriteContext } from '../context/FavoriteContext';
import { CartContext } from '../context/CartContext';

export default function FavoriteScreen({ onNavigateHome }) {
  const { favorites, toggleFavorite } = useContext(FavoriteContext);
  const { addToCart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.headerTitle}>Favorite Bookmarks</Text>
        <Text style={styles.headerSub}>{favorites.length} Saved Products (Name + Image Only)</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyBox}>
          <Heart size={48} color="#334155" />
          <Text style={styles.emptyTitle}>No Favorite Products Yet</Text>
          <Text style={styles.emptySub}>Tap the heart icon on any product to save it here.</Text>
          <TouchableOpacity style={styles.browseBtn} onPress={onNavigateHome}>
            <Text style={styles.browseText}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.favoriteCard}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />

              <View style={styles.cardInfo}>
                <Text style={styles.cardCategory}>{item.categoryName || 'Product Catalog'}</Text>
                <Text style={styles.cardTitle} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.zeroPricePolicy}>Quotation Purpose • No Price</Text>

                <View style={styles.actionRow}>
                  <TouchableOpacity 
                    style={styles.addCartBtn}
                    onPress={() => addToCart(item, 1)}
                  >
                    <PlusCircle size={14} color="#fff" />
                    <Text style={styles.addCartText}>Add to Quote Cart</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.removeBtn}
                    onPress={() => toggleFavorite(item)}
                  >
                    <Trash2 size={16} color="#ef4444" />
                  </TouchableOpacity>
                </View>
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
  listContent: {
    padding: 16,
    paddingBottom: 80,
    gap: 14,
  },
  favoriteCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardImage: {
    width: 110,
    height: 110,
    backgroundColor: '#f1f5f9',
  },
  cardInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  cardCategory: {
    color: '#0ea5e9',
    fontSize: 11,
    fontWeight: '700',
  },
  cardTitle: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  zeroPricePolicy: {
    color: '#64748b',
    fontSize: 11,
    marginVertical: 4,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  addCartBtn: {
    backgroundColor: '#0ea5e9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  addCartText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '800',
  },
  removeBtn: {
    padding: 6,
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
  browseBtn: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  browseText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 14,
  },
});
