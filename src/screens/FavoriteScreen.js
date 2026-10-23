import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import { Bookmark, Trash2, PlusCircle, Menu, Search, Bell } from 'lucide-react-native';
import { FavoriteContext } from '../context/FavoriteContext';
import { CartContext } from '../context/CartContext';
import { getImageUrl } from '../api';

const { width } = Dimensions.get('window');

export default function FavoriteScreen({ onNavigateHome, onOpenMenu, onNavigateNotifications, onNavigateSearch }) {
  const { favorites, toggleFavorite } = useContext(FavoriteContext);
  const { addToCart } = useContext(CartContext);
  const unreadNotifications = 0; // Or grab from context if available

  return (
    <ImageBackground
      source={require('../../assets/splash_bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onOpenMenu} style={styles.headerIconBtn}>
            <Menu color="#27347a" size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>SAVED</Text>
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

        {favorites.length === 0 ? (
          <View style={styles.emptyBox}>
            <Bookmark size={48} color="#27347a" />
            <Text style={styles.emptyTitle}>No Saved Products</Text>
            <Text style={styles.emptySub}>Tap the bookmark icon on any product to save it here.</Text>
            <TouchableOpacity style={styles.browseBtn} onPress={onNavigateHome}>
              <Text style={styles.browseText}>Browse Catalog</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id}
            numColumns={2}
            removeClippedSubviews={true}
            initialNumToRender={6}
            maxToRenderPerBatch={6}
            windowSize={5}
            updateCellsBatchingPeriod={50}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.favoriteCard}>
                
                {/* Top Image Section */}
                <View style={styles.cardImageContainer}>
                  <Image source={getImageUrl(item.image)} style={styles.cardImage} resizeMode="contain" fadeDuration={0} />
                  <TouchableOpacity style={styles.bookmarkIconBtn} onPress={() => toggleFavorite(item)}>
                    <View style={styles.bookmarkCircle}>
                      <Bookmark color="#ffffff" fill="#ffffff" size={14} />
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Bottom Info Section */}
                <View style={styles.cardInfo}>
                  <View style={styles.textWrapper}>
                    <Text style={styles.cardCategory} numberOfLines={1}>{item.categoryName || 'PRODUCT'}</Text>
                    <Text style={styles.cardTitle} numberOfLines={2}>{item.name}</Text>
                  </View>

                  {/* Actions Row */}
                  <View style={styles.actionRow}>
                    <TouchableOpacity 
                      style={styles.addCartBtn}
                      onPress={() => addToCart(item, 1)}
                    >
                      <PlusCircle size={14} color="#ffffff" />
                      <Text style={styles.addCartText}>Add to Cart for Quatation</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={styles.removeBtn}
                      onPress={() => toggleFavorite(item)}
                    >
                      <Trash2 size={16} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
            )}
          />
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
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
  favoriteCard: {
    width: (width - 40) / 2, // 2 columns with margin
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 0, // In screenshot, outer border doesn't seem heavily rounded, just sharp edges for the bottom white part. Actually let's use tiny radius if any, looks flat in screenshot
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  cardImageContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#dcf0fa', // The specific light blue tint from the screenshot
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: 10,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  bookmarkIconBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
  bookmarkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#27347a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    backgroundColor: '#ffffff',
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  textWrapper: {
    alignItems: 'center',
    marginBottom: 10,
    minHeight: 45,
    justifyContent: 'center',
  },
  cardCategory: {
    color: '#000000',
    fontSize: 9,
    fontWeight: '500',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  cardTitle: {
    color: '#27347a',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addCartBtn: {
    flex: 1,
    backgroundColor: '#38bdf8', // Cyan-ish blue from screenshot
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  addCartText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '800',
    marginLeft: 4,
  },
  removeBtn: {
    backgroundColor: '#ef4444',
    padding: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#27347a',
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
