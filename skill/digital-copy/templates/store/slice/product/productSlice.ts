import {createSlice} from '@reduxjs/toolkit'
import {fetchProducts} from '../../asyncThunk/productThunk.ts'
import type {ProductState} from '../../../interfaces/product.ts'

const initialState: ProductState = {
    items:[],
    loading:false,
    error:''
}

const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchProducts.pending , (state)=>{
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchProducts.fulfilled , (state , action)=>{
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected , (state , action)=>{
                if(action.meta.aborted){
                    return;      // a newer request is already loading
                }
                state.loading = false;
                state.error = action.error.message ?? 'something went wrong';
            })
    },
})

export default productSlice.reducer
