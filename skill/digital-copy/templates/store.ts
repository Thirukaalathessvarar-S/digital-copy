import { configureStore } from '@reduxjs/toolkit'
import itemReducer from '../features/items/itemSlice'
import cartReducer from '../features/cart/cartSlice'
import wishReducer from '../features/wishlist/wishSlice'

export const store = configureStore({
  reducer: {
    items:itemReducer,
    cart:cartReducer,
    wish:wishReducer
  },
})

let lastCart = store.getState().cart;
let lastWish = store.getState().wish;
store.subscribe(()=>{
  const {cart , wish} = store.getState();

  if(cart!==lastCart){
    lastCart = cart;
    try{
      localStorage.setItem('cart' , JSON.stringify(lastCart));
    }
    catch{

    }
  }

  if(wish!==lastWish){
    lastWish = wish;
    try{
      localStorage.setItem('wish' , JSON.stringify(lastWish));
    }
    catch{

    }
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
