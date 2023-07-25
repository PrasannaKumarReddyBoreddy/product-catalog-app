import { configureStore, createSlice } from '@reduxjs/toolkit';
import { ProductState } from '../models/interfaces/product-card-props';

const initialProductStates: ProductState={
    products: [],
    loading: false,
    error: ''
}


const productSlice =  createSlice({
name:'product',
initialState: initialProductStates,
reducers:{
    requist(state){
        state.loading = true;
    },
    success(state, action){
        state.loading = false;
        state.products = action.payload;
    },
    failure(state){
        state.error = 'Failed to load Products'
    }
}
});

export const {requist, success, failure} = productSlice.actions;

const store = configureStore({
    reducer: productSlice.reducer,
});

export default store;