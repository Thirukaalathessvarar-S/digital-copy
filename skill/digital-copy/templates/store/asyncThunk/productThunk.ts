import {createAsyncThunk} from '@reduxjs/toolkit'
import {getProducts} from '../../helpers/backend_helper.ts'
import type {Product} from '../../interfaces/product.ts'

export const fetchProducts = createAsyncThunk('product/fetchProducts' , async (): Promise<Product[]> =>{
    const data = await getProducts();
    return data.data;
})
