import {configureStore} from "@reduxjs/toolkit";
import profileReducer from "./redux/profileSlice";
import userReducer from './redux/userSlice'
import artReducer from './redux/artSlice'
import cartReducer from './redux/cartSlice'
import chatReducer from './redux/chatSlice'
import adminReducer from './redux/adminSlice'
import auctionReducer from './redux/auctionSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        art: artReducer,
        cart: cartReducer,
        chat: chatReducer,
        admin: adminReducer,
        auction: auctionReducer
    }
})

export default store;