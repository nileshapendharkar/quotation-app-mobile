import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart, PlusCircle } from 'lucide-react-native';
import { getImageUrl } from '../api';

function ProductCard({ product, onSelect, favorited = false, onToggleFavorite }) {
  return (
    <View style={styles.card}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => onSelect && onSelect(product)}>
        <View style={styles.imageContainer}>
          <Image 
            source={getImageUrl(product.image)} 
            style={styles.image} 
            resizeMode="contain"
            fadeDuration={0}
          />
          
          {onToggleFavorite && (
            <TouchableOpacity 
              style={styles.heartButton}
              onPress={() => onToggleFavorite(product)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Heart 
                size={18} 
                color={favorited ? '#ef4444' : '#ffffff'} 
                fill={favorited ? '#ef4444' : 'transparent'} 
              />
            </TouchableOpacity>
          )}

          {product.categoryName && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{product.categoryName}</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>{product.name}</Text>
          <Text style={styles.policyTag}>Zero Price • Quotation Only</Text>

          <View style={styles.addButton}>
            <PlusCircle size={16} color="#ffffff" />
            <Text style={styles.addButtonText}>Configure Qty</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(ProductCard, (prev, next) => {
  return prev.product.id === next.product.id &&
         prev.product.name === next.product.name &&
         prev.favorited === next.favorited;
});

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
    aspectRatio: 1,
    width: '100%',
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
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
    marginBottom: 4,
    minHeight: 36,
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
    marginTop: 'auto',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },
});
