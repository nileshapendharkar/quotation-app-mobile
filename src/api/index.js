const API_BASE_URL = 'https://quotation-app-backend.onrender.com/api';

let userToken = null;

export const setAuthToken = (token) => {
  userToken = token;
};

import { productImages } from '../utils/imageMapping';

export const getImageUrl = (path) => {
  if (!path) return { uri: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&q=80' };
  
  if (path.startsWith('http')) {
    return { uri: path };
  }
  
  if (productImages[path]) {
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

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Mobile API Error [${endpoint}]:`, err);
    return { success: false, message: 'Network connection failed' };
  }
};
