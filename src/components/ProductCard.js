import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart, PlusCircle, Check } from 'lucide-react-native';
import { FavoriteContext } from '../context/FavoriteContext';
import { CartContext } from '../context/CartContext';
import { getImageUrl } from '../api';

export default function ProductCard({ product, onSelect }) {
  const { toggleFavorite, isFavorite } = useContext(FavoriteContext);
  const { addToCart } = useContext(CartContext);

  const favorited = isFavorite(product.id);

  return (
    <View style={styles.card}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => onSelect && onSelect(product)}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: getImageUrl(product.image) }} style={styles.image} resizeMode="cover" />
          
          <TouchableOpacity 
            style={styles.heartButton}
            onPress={() => toggleFavorite(product)}
          >
            <Heart size={18} color={favorited ? '#ef4444' : '#ffffff'} fill={favorited ? '#ef4444' : 'transparent'} />
          </TouchableOpacity>

          {product.categoryName && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{product.categoryName}</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>{product.name}</Text>
          <Text style={styles.policyTag}>Zero Price • Quotation Only</Text>

          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => onSelect && onSelect(product)}
          >
            <PlusCircle size={16} color="#ffffff" />
            <Text style={styles.addButtonText}>Select Size & Qty</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  imageContainer: {
    height: 140,
    position: 'relative',
    backgroundColor: '#f1f5f9',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 6,
    borderRadius: 20,
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
  },
  content: {
    padding: 12,
  },
  title: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
    marginBottom: 4,
  },
  policyTag: {
    color: '#0ea5e9',
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },
});
