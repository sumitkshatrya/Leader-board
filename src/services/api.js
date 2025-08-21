import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
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

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message;
    return Promise.reject(new Error(message));
  }
);

// User API calls - UPDATED TO MATCH BACKEND ROUTES
export const userAPI = {
  getUsers: (page = 1, limit = 10) => api.get(`/users?page=${page}&limit=${limit}`),
  addUser: (name) => api.post('/users', { name }),
  getUserStats: (userId, page = 1, limit = 10) => 
    api.get(`/users/${userId}/stats?page=${page}&limit=${limit}`),
};

// Points API calls - UPDATED TO MATCH BACKEND ROUTES
export const pointsAPI = {
  claimPoints: (userId) => api.post('/points/claim', { userId }),
};

// Leaderboard API calls - UPDATED TO MATCH BACKEND ROUTES
export const leaderboardAPI = {
  getLeaderboard: (page = 1, limit = 10) => 
    api.get(`/leaderboard?page=${page}&limit=${limit}`),
};

// History API calls - UPDATED TO MATCH BACKEND ROUTES
export const historyAPI = {
  getHistory: (page = 1, limit = 10) => 
    api.get(`/history?page=${page}&limit=${limit}`),
  getUserHistory: (userId, page = 1, limit = 10) => 
    api.get(`/history/user/${userId}?page=${page}&limit=${limit}`),
};

// Health check
export const healthCheck = () => api.get('/health');
// Mock function for development (remove in production)
export const mockClaimPoints = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const points = Math.floor(Math.random() * 10) + 1;
      resolve({ points, success: true });
    }, 500);
  });
};

export default api;