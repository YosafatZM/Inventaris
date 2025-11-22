import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

// Karyawan API
export const karyawanAPI = {
  getAll: () => api.get('/karyawan'),
  getById: (id) => api.get(`/karyawan/${id}`),
  create: (data) => api.post('/karyawan', data),
  update: (id, data) => api.put(`/karyawan/${id}`, data),
  delete: (id) => api.delete(`/karyawan/${id}`),
};

// Barang API
export const barangAPI = {
  getAll: () => api.get('/barang'),
  getById: (id) => api.get(`/barang/${id}`),
  create: (data) => api.post('/barang', data),
  update: (id, data) => api.put(`/barang/${id}`, data),
  delete: (id) => api.delete(`/barang/${id}`),
};

export default api;