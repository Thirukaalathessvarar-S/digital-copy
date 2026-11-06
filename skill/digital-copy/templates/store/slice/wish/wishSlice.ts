import {createSlice , type PayloadAction} from '@reduxjs/toolkit'
import type {Wish} from '../../../interfaces/wish.ts'

function loadWish(): Wish[] {
    try{
        return JSON.parse(localStorage.getItem('wish') ?? '[]');
    }
    catch{
        return [];
    }
}

const initialState: Wish[] = loadWish();

const wishSlice = createSlice({
    name:'wish',
    initialState,
    reducers:{
        addWish(state , action : PayloadAction<Wish>){
            if(state.some((wishItem)=>wishItem.id===action.payload.id)){
                return;
            }
            state.push(action.payload);
        },
        removeWish(state,action:PayloadAction<number>){
            return state.filter((wishItem)=>wishItem.id!==action.payload);
        },
        clearWish(){
            return [];
        }
    },
})

export const {addWish , removeWish , clearWish} = wishSlice.actions
export default wishSlice.reducer
