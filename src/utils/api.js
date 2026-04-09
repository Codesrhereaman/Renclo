// src/utils/api.js
// Axios-like wrapper for all backend API calls
// Automatically attaches the Firebase ID token to every request

import { auth } from '../config/firebase';

const BASE_URL = '/api';

// ─── Core Fetcher ─────────────────────────────────────────────────────────────

const request = async (method, endpoint, body = null) => {
  // Get fresh Firebase token (auto-refreshes if expired)
  let token = null;
  if (auth.currentUser) {
    token = await auth.currentUser.getIdToken();
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const config = { method, headers };
  if (body) config.body = JSON.stringify(body);

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, config);
    
    // Check if response has content
    const contentType = res.headers.get('content-type');
    let data = null;
    
    if (contentType && contentType.includes('application/json')) {
      const text = await res.text();
      if (text) {
        try {
          data = JSON.parse(text);
        } catch (parseErr) {
          console.error('JSON parse error:', parseErr);
          const err = new Error('Invalid JSON response from server');
          err.status = res.status;
          throw err;
        }
      }
    }

    if (!res.ok) {
      const err = new Error(data?.message || `HTTP ${res.status}`);
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data || { success: true };
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error('Cannot reach server. Is the backend running?');
    }
    throw err;
  }
};

const get    = (url)          => request('GET',    url);
const post   = (url, body)    => request('POST',   url, body);
const put    = (url, body)    => request('PUT',    url, body);
const del    = (url)          => request('DELETE', url);

// ─── Auth API ─────────────────────────────────────────────────────────────────

export const authAPI = {
  // Call after Firebase signup/login to create/sync Firestore profile
  syncProfile:  (data)   => post('/auth/sync-profile', data),
  getMe:        ()       => get('/auth/me'),
  updateGender: (data)   => post('/auth/update-gender', data),
  logout:       ()       => post('/auth/logout'),
  deleteAccount:()       => del('/auth/delete-account'),
};

// ─── User API ─────────────────────────────────────────────────────────────────

export const userAPI = {
  getProfile:     ()           => get('/users/profile'),
  updateProfile:  (data)       => put('/users/profile', data),
  getAddresses:   ()           => get('/users/addresses'),
  addAddress:     (address)    => post('/users/addresses', address),
  updateAddress:  (id, data)   => put(`/users/addresses/${id}`, data),
  deleteAddress:  (id)         => del(`/users/addresses/${id}`),
};

// ─── Products API ─────────────────────────────────────────────────────────────

export const productAPI = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/products${qs ? `?${qs}` : ''}`);
  },
  getFeatured:  ()           => get('/products/featured'),
  getCategories:()           => get('/products/categories'),
  getById:      (id)         => get(`/products/${id}`),
  getMyProducts:()           => get('/products/owner/my-products'),
  create:       (data)       => post('/products', data),
  update:       (id, data)   => put(`/products/${id}`, data),
  delete:       (id)         => del(`/products/${id}`),
  addReview:    (id, data)   => post(`/products/${id}/review`, data),
};

// ─── Cart API ─────────────────────────────────────────────────────────────────

export const cartAPI = {
  get:     ()                                          => get('/cart'),
  add:     (productId, quantity=1, rentalDays=3, size='') => post('/cart/add', { productId, quantity, rentalDays, size }),
  update:  (productId, updates)                        => put(`/cart/update/${productId}`, updates),
  remove:  (productId)                                 => del(`/cart/remove/${productId}`),
  clear:   ()                                          => del('/cart/clear'),
};

// ─── Wishlist API ─────────────────────────────────────────────────────────────

export const wishlistAPI = {
  get:     ()           => get('/wishlist'),
  toggle:  (productId)  => post('/wishlist/toggle', { productId }),
  add:     (productId)  => post('/wishlist/add', { productId }),
  remove:  (productId)  => del(`/wishlist/remove/${productId}`),
  clear:   ()           => del('/wishlist/clear'),
};

// ─── Orders API ───────────────────────────────────────────────────────────────

export const orderAPI = {
  create:  (data)     => post('/orders', data),
  getAll:  (params={}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/orders${qs ? `?${qs}` : ''}`);
  },
  getById: (orderId)  => get(`/orders/${orderId}`),
  cancel:  (orderId, reason) => put(`/orders/${orderId}/cancel`, { reason }),
  getOwnerActivities: () => get('/orders/owner/activities'),
};

const api = { auth: authAPI, user: userAPI, product: productAPI, cart: cartAPI, wishlist: wishlistAPI, order: orderAPI };
export default api;
