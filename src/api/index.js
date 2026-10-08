import { productImages } from '../utils/imageMapping';
import { apiCircuitBreaker } from './CircuitBreaker';

const getApiBaseUrl = () => {
  if (typeof window !== 'undefined' && window.location && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:5000/api';
  }
  return 'https://quotation-app-backend-master.vercel.app/api';
};

export const API_BASE_URL = getApiBaseUrl();
export const IMAGE_BASE_URL = API_BASE_URL.replace('/api', '');

let userToken = null;
let unauthenticatedHandler = null;
const apiCache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes TTL for instant response times

export const getUserToken = () => userToken;
export const setAuthToken = (token) => {
  userToken = token;
};

export const setUnauthenticatedHandler = (handler) => {
  unauthenticatedHandler = handler;
};

export const clearApiCache = () => {
  apiCache.clear();
};

export const getImageUrl = (path) => {
  if (!path) return { uri: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&q=80' };
  
  if (path.startsWith('http') || path.startsWith('data:')) {
    return { uri: path };
  }
  
  if (productImages && productImages[path]) {
    return productImages[path];
  }
  
  return { uri: `${IMAGE_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}` };
};

export const apiRequest = async (endpoint, method = 'GET', body = null) => {
  const isGet = method.toUpperCase() === 'GET';
  const cacheKey = `${endpoint}_${userToken || 'public'}`;

  // Serve instant cached GET response if available & fresh
  if (isGet && apiCache.has(cacheKey)) {
    const cached = apiCache.get(cacheKey);
    if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }
  }

  // Clear cache for write operations (POST, PUT, DELETE) to guarantee consistency
  if (!isGet) {
    apiCache.clear();
  }

  const headers = {
    'Content-Type': 'application/json',
  };

  if (userToken) {
    headers['Authorization'] = `Bearer ${userToken}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const action = async (signal) => {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, signal });
    if (!res.ok) {
      if ((res.status === 401 || res.status === 403) && unauthenticatedHandler) {
        unauthenticatedHandler();
      }
      if (res.status >= 500) {
        throw new Error(`Server Error: ${res.status}`);
      }
      try {
        const errorData = await res.json();
        return errorData;
      } catch (e) {
        throw new Error(`HTTP Error: ${res.status}`);
      }
    }
    const data = await res.json();

    if (isGet && data && data.success !== false) {
      apiCache.set(cacheKey, { timestamp: Date.now(), data });
    }

    return data;
  };

  const fallback = (reason) => {
    // Serve stale cache on network disconnect or server timeout
    if (isGet && apiCache.has(cacheKey)) {
      console.warn(`[API Cache Fallback] Serving cached data for ${endpoint}`);
      return apiCache.get(cacheKey).data;
    }
    console.error(`Mobile API Error [${endpoint}]:`, reason);
    return { success: false, message: 'Service temporarily unavailable or network connection failed' };
  };

  return await apiCircuitBreaker.execute(action, fallback);
};
