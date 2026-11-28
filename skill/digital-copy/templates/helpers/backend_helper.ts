import { get, post, put, del, upload } from './api_client';
import * as url from './url_helper';
import type { ProductBody } from '../interfaces/product';

// Product
export const getProducts = () => get(`/${url.PRODUCT}`);
export const getProductsByCategory = (category: string) => get(`/${url.PRODUCT}/category/${category}`);
export const searchProducts = (search: string) => get(`/${url.PRODUCT}/search`, { params: { search } });
export const getProductDetails = (id: string) => get(`/${url.PRODUCT}/${id}`);
export const postProduct = (data: ProductBody, token: string) => post(`/${url.PRODUCT}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const updateProduct = (id: string, data: ProductBody, token: string) => put(`/${url.PRODUCT}/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteProduct = (id: string, token: string) => del(`/${url.PRODUCT}/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// Category
export const getCategories = () => get(`/${url.CATEGORY}`);

// Upload (resolves to the image url that the backend stores)
export const uploadImage = (file: File): Promise<string> => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', url.CLOUDINARY_UPLOAD_PRESET);
  data.append('folder', url.CLOUDINARY_FOLDER);
  return upload(data).then((body: any) => body.secure_url);
};
