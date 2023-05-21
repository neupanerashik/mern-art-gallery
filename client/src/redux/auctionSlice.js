import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const placeBid = createAsyncThunk('placeBid', async (bidData, {rejectWithValue}) => {
    try {
        const {data, status} = await axios.post(`/api/v1/auction/bid`, bidData, {
            withCredentials: true,
            headers: {'Content-Type': 'application/json'}
        }); 
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

// findHighestBidder
export const findHighestBidder = createAsyncThunk('findHighestBidder', async (artId, {rejectWithValue}) => {  
    try {
        const {data, status} = await axios.get(`/api/v1/auction/highest-bidder?artId=${artId}`);
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const auctionSlice = createSlice({
    name: 'auction',

    initialState: {
        allBids: [],
    },

    reducers: {
        clearMessage: (state, action) => {
            state.message = null;
        },

        clearError: (state, action) => {
            state.error = null;
        }
    },

    extraReducers: (builder) => {

        // place bid
        builder.addCase(placeBid.pending, (state) => {
            state.isLoading = true;
        }).addCase(placeBid.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message;
        }).addCase(placeBid.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        })
    }
})

export default auctionSlice.reducer
export const {clearError, clearMessage} = auctionSlice.actions;