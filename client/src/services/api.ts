import axios from 'axios';

const api = axios.create({
  // baseURL:  'http://localhost:4000/api',
  baseURL:  'https://plot-automation-omr4.vercel.app/api',

});

// Mocking some fallback logic as requested: 
// if the user wants purely dummy data when API fails, we could handle it here.
// But for now, we'll let components handle it or use the backend's dummy fallback.

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
