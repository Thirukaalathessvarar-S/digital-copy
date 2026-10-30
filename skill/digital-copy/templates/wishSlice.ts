import {createSlice , type PayloadAction} from '@reduxjs/toolkit'

export type Wish = {
    id:number;
    title:string;
    image:string;
    price:number;
}
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
        addWish(state , action : PayloadAction<Wish>){  //action creator
            // already saved , so nothing to add
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
