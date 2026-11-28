export const API_BASE_URL = 'http://localhost:3000';
export const PRODUCT = 'product';
export const CATEGORY = 'category';
export const AUTH = 'auth';

// Upload service: files go straight from the browser with an unsigned preset (public values only)
export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
export const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
export const CLOUDINARY_FOLDER = 'shop/images';
