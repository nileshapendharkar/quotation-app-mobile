const API_BASE_URL = 'https://quotation-app-backend.onrender.com/api';

let userToken = null;

export const setAuthToken = (token) => {
  userToken = token;
};

export const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const baseUrl = API_BASE_URL.replace('/api', '');
  return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
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
