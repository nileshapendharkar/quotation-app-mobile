import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text, Dimensions, StatusBar } from 'react-native';
import { ShieldCheck } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function LaunchAnimation({ onFinish }) {
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;
  const progressBarWidth = useRef(new Animated.Value(0)).current;
  const containerOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Logo scale and opacity fade in
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 15,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // 2. Brand text slide up and fade in
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // 3. Progress bar animation
        Animated.timing(progressBarWidth, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
        }).start(() => {
          // 4. Fade out entire screen
          Animated.timing(containerOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => {
            if (onFinish) onFinish();
          });
        });
      });
    });
  }, []);

  const progressInterpolate = progressBarWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: containerOpacity }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.content}>
        {/* Animated Logo Container */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <ShieldCheck size={50} color="#ffffff" />
        </Animated.View>

        {/* Animated Text Wrapper */}
        <Animated.View
          style={{
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
            alignItems: 'center',
          }}
        >
          <Text style={styles.title}>Gouri Aqua Plast</Text>
          <Text style={styles.subtitle}>Ganesh Gouri Industries</Text>
          <Text style={styles.tagline}>Premium Tanks, Pipes & Fittings</Text>
        </Animated.View>

        {/* Progress Bar Loader */}
        <View style={styles.progressBarBg}>
          <Animated.View style={[styles.progressBarActive, { width: progressInterpolate }]} />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: '#0ea5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0ea5e9',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  tagline: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
    marginTop: 8,
  },
  progressBarBg: {
    width: width * 0.5,
    height: 4,
    backgroundColor: '#f1f5f9',
    borderRadius: 2,
    marginTop: 40,
    overflow: 'hidden',
  },
  progressBarActive: {
    height: '100%',
    backgroundColor: '#0ea5e9',
    borderRadius: 2,
  },
});
