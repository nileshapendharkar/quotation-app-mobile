import React, { useContext, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground, Image, Dimensions } from 'react-native';
import { Menu, Bell, Plus, Info, User } from 'lucide-react-native';
import { AuthContext } from '../context/AuthContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.42;
const CARD_MARGIN = 16;
const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN;

export default function HomeScreen({ onOpenMenu, onNavigateProduct, onNavigateOrders, onNavigateNotifications }) {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('Create');
  const scrollRef = useRef(null);

  const tabs = ['Create', 'Total', 'Draft', 'Submit', 'Decline'];
  
  const unreadNotifications = 0;

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    const index = tabs.indexOf(tab);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: index * SNAP_INTERVAL, animated: true });
    }
  };

  const handleCardsScroll = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / SNAP_INTERVAL);
    if (index >= 0 && index < tabs.length) {
      const tab = tabs[index];
      setActiveTab(prevTab => {
        if (prevTab !== tab) return tab;
        return prevTab;
      });
    }
  };

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
            <Menu color="#1e3a8a" size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>HOME</Text>
          <TouchableOpacity style={styles.headerIconBtn} onPress={onNavigateNotifications}>
            <Bell color="#1e3a8a" size={24} />
            {unreadNotifications > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadNotifications}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Welcome Card */}
          <View style={styles.welcomeCard}>
            <View style={styles.welcomeTextContent}>
              <Text style={styles.welcomeLabel}>Welcome back,</Text>
              <Text style={styles.companyName} numberOfLines={1}>{(user && (user.companyName || user.name)) || 'Gouri Aqua Plast'}</Text>
              <Text style={styles.dateText}>19 August, 2026</Text>
              
              <Text style={styles.welcomeSubtextBold}>The Easy Way to Create & Manage Quotations</Text>
              <Text style={styles.welcomeSubtext}>
                Create professional quotations in just a few clicks, keep all your quotation records organized, and manage your entire quotation workflow effortlessly. Work smarter, respond faster, and stay on top of every business opportunity.
              </Text>
            </View>
            <TouchableOpacity 
              style={[styles.avatarContainer, { backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' }]}
              onPress={() => setSideMenuVisible(true)}
              activeOpacity={0.8}
            >
              <Image 
                source={(user && user.profileImage) ? { uri: user.profileImage } : require('../../assets/icon.png')} 
                style={styles.avatar} 
                resizeMode="cover" 
              />
            </TouchableOpacity>
          </View>

          {/* Horizontal Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
            {tabs.map((tab) => (
              <TouchableOpacity key={tab} style={styles.tabBtn} onPress={() => handleTabPress(tab)}>
                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
                {activeTab === tab && <View style={styles.activeDot} />}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Action/Stat Cards (Horizontal Scroll) */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.cardsScrollContainer}
            ref={scrollRef}
            onScroll={handleCardsScroll}
            scrollEventThrottle={16}
          >
            {/* Create Card */}
            <TouchableOpacity style={styles.createCard} onPress={onNavigateProduct}>
              <View style={styles.createIconCircle}>
                <Plus color="#ffffff" size={40} />
              </View>
            </TouchableOpacity>

            {/* Total Card */}
            <TouchableOpacity style={styles.statCard} onPress={onNavigateOrders}>
              <View style={styles.statImageContainer}>
                <Image source={require('../../assets/1.png')} style={styles.statImage} resizeMode="contain" />
              </View>
              <View style={styles.statBottomContent}>
                <Text style={styles.statNumber}>01</Text>
                <Text style={styles.viewAllTextSmall}>View All {'>'}</Text>
              </View>
            </TouchableOpacity>

            {/* Draft Card */}
            <TouchableOpacity style={styles.statCard} onPress={onNavigateOrders}>
              <View style={styles.statImageContainer}>
                <Image source={require('../../assets/2.png')} style={styles.statImage} resizeMode="contain" />
              </View>
              <View style={styles.statBottomContent}>
                <Text style={styles.statNumber}>02</Text>
                <Text style={styles.viewAllTextSmall}>View All {'>'}</Text>
              </View>
            </TouchableOpacity>

            {/* Submit Card */}
            <TouchableOpacity style={styles.statCard} onPress={onNavigateOrders}>
              <View style={styles.statImageContainer}>
                <Image source={require('../../assets/3.png')} style={styles.statImage} resizeMode="contain" />
              </View>
              <View style={styles.statBottomContent}>
                <Text style={styles.statNumber}>03</Text>
                <Text style={styles.viewAllTextSmall}>View All {'>'}</Text>
              </View>
            </TouchableOpacity>

            {/* Decline Card */}
            <TouchableOpacity style={styles.statCard} onPress={onNavigateOrders}>
              <View style={styles.statImageContainer}>
                <Image source={require('../../assets/4.png')} style={styles.statImage} resizeMode="contain" />
              </View>
              <View style={styles.statBottomContent}>
                <Text style={styles.statNumber}>04</Text>
                <Text style={styles.viewAllTextSmall}>View All {'>'}</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>

          {/* Recent Quotations */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Quatations</Text>
            <TouchableOpacity onPress={onNavigateOrders}>
              <Text style={styles.sectionLink}>View All {'>'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.emptyRecentBox}>
            <Text style={styles.emptyRecentText}>No Recent Quotations</Text>
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <View style={styles.infoIconCircle}>
              <Info color="#000" size={14} />
            </View>
            <Text style={styles.infoText}>
              Prices are not included in the quotation; only the product names and quantities are mentioned.
            </Text>
          </View>

          {/* Quick Action */}
          <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>Quick Action</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActionsContainer}>
            <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: '#ffd4b2' }]}>
              <View style={styles.quickActionImageContainer}>
                 <Image source={require('../../assets/home_how_to_use.png')} style={styles.quickActionImage} resizeMode="contain" />
              </View>
              <View style={styles.quickActionFooter}>
                <Text style={styles.quickActionText}>How to Use</Text>
                <Text style={styles.quickActionArrow}>{'>'}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: '#ffc1d4' }]}>
              <View style={styles.quickActionImageContainer}>
                 <Image source={require('../../assets/home_help.jpg')} style={styles.quickActionImage} resizeMode="contain" />
              </View>
              <View style={styles.quickActionFooter}>
                <Text style={styles.quickActionText}>Help & Support</Text>
                <Text style={styles.quickActionArrow}>{'>'}</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>

        </ScrollView>
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
    color: '#1e3a8a',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 1,
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  welcomeCard: {
    backgroundColor: '#3b82f6', // Will apply a gradient-like look with solid deep blue for now
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  welcomeTextContent: {
    flex: 1,
    paddingRight: 10,
  },
  welcomeLabel: {
    color: '#e0f2fe',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  companyName: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  dateText: {
    color: '#bae6fd',
    fontSize: 12,
    marginBottom: 12,
    fontWeight: '500',
  },
  welcomeSubtextBold: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 2,
  },
  welcomeSubtext: {
    color: '#e0f2fe',
    fontSize: 9,
    lineHeight: 14,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ffffff',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  tabBtn: {
    marginRight: 24,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 4,
  },
  tabTextActive: {
    color: '#1e3a8a',
    fontWeight: '800',
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ef4444',
  },
  cardsScrollContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  createCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.3,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: CARD_MARGIN,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  createIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#27347a', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  statCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.3,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: CARD_MARGIN,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    overflow: 'hidden',
  },
  statImageContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statImage: {
    width: '100%',
    height: '100%',
  },
  statBottomContent: {
    alignItems: 'center',
    width: '100%',
  },
  statNumber: {
    fontSize: 38,
    fontWeight: '800',
    color: '#27347a',
    marginBottom: 4,
  },
  viewAllTextSmall: {
    fontSize: 12,
    color: '#64748b',
    alignSelf: 'flex-end',
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 5,
  },
  sectionTitle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
  },
  sectionLink: {
    color: '#1e3a8a',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyRecentBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)', 
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  emptyRecentText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#d8b4c0', // A mauve/dusty pink color matching screenshot 6
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 30,
    marginHorizontal: 20,
  },
  infoIconCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  infoText: {
    flex: 1,
    color: '#000000',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  quickActionCard: {
    width: 200,
    height: 140,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  quickActionImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  quickActionImage: {
    width: '80%',
    height: '80%',
  },
  quickActionFooter: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  quickActionArrow: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748b',
  }
});
