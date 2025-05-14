import { createSlice , PayloadAction } from "@reduxjs/toolkit";

export interface Products {
    id:number;
    title:string;
    price:number;
    image:string;
}

interface CartState {
    items :Products[];
}

const initialState: CartState = {
    items: [],
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart: (state, action: PayloadAction<Products>) => {
            const exists = state.items.find(item => item.id === action.payload.id);
            if (!exists) {
                state.items.push(action.payload);
            }
          },
          removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
          },
          clearCart: (state) => {
            state.items = [];
          },
    },
})

export const { addToCart, removeFromCart , clearCart } = cartSlice.actions;
export default cartSlice.reducer;