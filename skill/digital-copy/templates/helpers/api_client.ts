import axios, { type AxiosRequestConfig } from 'axios';
import { API_BASE_URL, AUTH, CLOUDINARY_UPLOAD_URL } from './url_helper';
import type { AuthHandlers, TokenPair } from '../interfaces/auth';

// Get base URL from environment or fallback
const baseURL = import.meta.env.VITE_BACKEND_URL || API_BASE_URL;

// Create Axios instance
const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set once by store.ts , so this file never imports the store (that would be a circular import)
let authHandlers: AuthHandlers | null = null;
let refreshing: Promise<string> | null = null;

export const setupAuthRefresh = (handlers: AuthHandlers) => {
  authHandlers = handlers;
};

// A refresh token works only once , so every request that fails meanwhile waits for the same refresh
const refreshAccessToken = () => {
  if (!refreshing) {
    refreshing = apiClient
      .post(`/${AUTH}/refresh`, { refreshToken: authHandlers?.getRefreshToken() ?? '' })
      .then((body: any) => {
        const tokens: TokenPair = { accessToken: body.data.accessToken, refreshToken: body.data.refreshToken };
        authHandlers?.saveTokens(tokens);
        return tokens.accessToken;
      })
      .finally(() => {
        refreshing = null;
      });
  }
  return refreshing;
};

// Response interceptor: an expired access token is renewed once , then the request is sent again
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const request = error.config;
    const isAuthCall = request?.url?.startsWith(`/${AUTH}/`);   // a 401 here means wrong password or a dead session
    if (error.response?.status !== 401 || !request || request._retry || isAuthCall || !authHandlers?.getRefreshToken()) {
      return Promise.reject(error);
    }
    request._retry = true;

    // another request may have renewed the token already , then just use the new one
    const usedToken = String(request.headers?.Authorization ?? '').replace('Bearer ', '');
    const currentToken = authHandlers.getAccessToken();
    try {
      const accessToken = currentToken !== '' && currentToken !== usedToken ? currentToken : await refreshAccessToken();
      request.headers.Authorization = `Bearer ${accessToken}`;
      return apiClient(request);
    }
    catch (refreshError: any) {
      // only a refused refresh ends the session , a network error does not
      if (refreshError?.response?.status === 401) {
        authHandlers.signOut();
      }
      return Promise.reject(error);
    }
  }
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

// The upload service gets its own instance: a different address , no backend tokens and no refresh handler
const uploadClient = axios.create({
  baseURL: CLOUDINARY_UPLOAD_URL,
});

uploadClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

// UPLOAD (FormData , axios sets the multipart header itself)
export const upload = (
  data: FormData
) => uploadClient.post('', data);
