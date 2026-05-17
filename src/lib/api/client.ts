import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor scaffolding
api.interceptors.request.use(
  (config) => {
    // Add auth token here later
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor scaffolding
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors like 401, 500 etc.
    return Promise.reject(error);
  }
);
