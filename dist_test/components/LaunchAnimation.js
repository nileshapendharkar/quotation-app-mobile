'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = LaunchAnimation;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _lucideReactNative = require('lucide-react-native');

var _Dimensions$get = _reactNative.Dimensions.get('window');

var width = _Dimensions$get.width;

function LaunchAnimation(_ref) {
  var onFinish = _ref.onFinish;

  var logoScale = (0, _react.useRef)(new _reactNative.Animated.Value(0.3)).current;
  var logoOpacity = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  var textOpacity = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  var textTranslateY = (0, _react.useRef)(new _reactNative.Animated.Value(20)).current;
  var progressBarWidth = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  var containerOpacity = (0, _react.useRef)(new _reactNative.Animated.Value(1)).current;

  (0, _react.useEffect)(function () {
    // 1. Logo scale and opacity fade in
    _reactNative.Animated.parallel([_reactNative.Animated.spring(logoScale, {
      toValue: 1,
      tension: 15,
      friction: 6,
      useNativeDriver: true
    }), _reactNative.Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true
    })]).start(function () {
      // 2. Brand text slide up and fade in
      _reactNative.Animated.parallel([_reactNative.Animated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      }), _reactNative.Animated.timing(textTranslateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true
      })]).start(function () {
        // 3. Progress bar animation
        _reactNative.Animated.timing(progressBarWidth, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false
        }).start(function () {
          // 4. Fade out entire screen
          _reactNative.Animated.timing(containerOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
          }).start(function () {
            if (onFinish) onFinish();
          });
        });
      });
    });
  }, []);

  var progressInterpolate = progressBarWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return _react2['default'].createElement(
    _reactNative.Animated.View,
    { style: [styles.container, { opacity: containerOpacity }] },
    _react2['default'].createElement(_reactNative.StatusBar, { barStyle: 'dark-content', backgroundColor: '#ffffff' }),
    _react2['default'].createElement(
      _reactNative.View,
      { style: styles.content },
      _react2['default'].createElement(
        _reactNative.Animated.View,
        {
          style: [styles.logoContainer, {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }]
          }]
        },
        _react2['default'].createElement(_lucideReactNative.ShieldCheck, { size: 50, color: '#ffffff' })
      ),
      _react2['default'].createElement(
        _reactNative.Animated.View,
        {
          style: {
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
            alignItems: 'center'
          }
        },
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.title },
          'Gouri Aqua Plast'
        ),
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.subtitle },
          'Ganesh Gouri Industries'
        ),
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.tagline },
          'Premium Tanks, Pipes & Fittings'
        )
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.progressBarBg },
        _react2['default'].createElement(_reactNative.Animated.View, { style: [styles.progressBarActive, { width: progressInterpolate }] })
      )
    )
  );
}

var styles = _reactNative.StyleSheet.create({
  container: _extends({}, _reactNative.StyleSheet.absoluteFillObject, {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999
  }),
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 40
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
    elevation: 8
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: 0.5
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0ea5e9',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1.5
  },
  tagline: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
    marginTop: 8
  },
  progressBarBg: {
    width: width * 0.5,
    height: 4,
    backgroundColor: '#f1f5f9',
    borderRadius: 2,
    marginTop: 40,
    overflow: 'hidden'
  },
  progressBarActive: {
    height: '100%',
    backgroundColor: '#0ea5e9',
    borderRadius: 2
  }
});
module.exports = exports['default'];
/* Animated Logo Container */ /* Animated Text Wrapper */ /* Progress Bar Loader */