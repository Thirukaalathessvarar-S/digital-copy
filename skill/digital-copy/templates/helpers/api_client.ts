import axios, { type AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from './url_helper';

// Get base URL from environment or fallback
const baseURL = import.meta.env.VITE_BACKEND_URL || API_BASE_URL;

// Create Axios instance
const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

// GET
export const get = (
  url: string,
  config: AxiosRequestConfig = {}
) => apiClient.get(url, config);

// POST
export const post = (
  url: string,
  data?: any,
  config: AxiosRequestConfig = {}
) => apiClient.post(url, data, config);

// PUT
export const put = (
  url: string,
  data?: any,
  config: AxiosRequestConfig = {}
) => apiClient.put(url, data, config);

// DELETE
export const del = (
  url: string,
  config: AxiosRequestConfig = {}
) => apiClient.delete(url, config);
