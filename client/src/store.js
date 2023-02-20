import {configureStore} from "@reduxjs/toolkit";
import profileReducer from "./redux/profileSlice";
import userReducer from './redux/userSlice'
import artReducer from './redux/artSlice'
import cartReducer from './redux/cartSlice'


const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        art: artReducer,
        cart: cartReducer
    }
})

export default store;