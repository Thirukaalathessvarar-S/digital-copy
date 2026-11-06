import {createAsyncThunk} from '@reduxjs/toolkit'
import {getData} from '../../helpers/api.ts'
import type {Product} from '../../interfaces/product.ts'

export const fetchProducts = createAsyncThunk('product/fetchProducts' , async (url:string): Promise<Product[]> =>{
    const data = await getData(url);
    return data.products;
})
