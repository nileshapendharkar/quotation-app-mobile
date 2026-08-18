import { productImages } from '../utils/imageMapping';
import { apiCircuitBreaker } from './CircuitBreaker';

const API_BASE_URL = 'https://quotation-app-backend.onrender.com/api';

let userToken = null;

export const setAuthToken = (token) => {
  userToken = token;
};



export const getImageUrl = (path) => {
  if (!path) return { uri: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&q=80' };
  
  if (path.startsWith('http') || path.startsWith('data:')) {
    return { uri: path };
  }
  
  if (productImages && productImages[path]) {
    return productImages[path];
  }
  
  const baseUrl = API_BASE_URL.replace('/api', '');
  return { uri: `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}` };
};

export const apiRequest = async (endpoint, method = 'GET', body = null) => {
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
      throw new Error(`HTTP Error: ${res.status}`);
    }
    return await res.json();
  };

  const fallback = (reason) => {
    console.error(`Mobile API Error [${endpoint}]:`, reason);
    return { success: false, message: 'Service temporarily unavailable or network connection failed' };
  };

  return await apiCircuitBreaker.execute(action, fallback);
};
