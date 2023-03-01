import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const placeBid = createAsyncThunk('placeBid', async (bidData, {rejectWithValue}) => {
    console.log(bidData) 
    try {
        const {data, status} = await axios.post('/api/v1/auction/bid', bidData, {
            withCredentials: true,
            headers: {'Content-Type': 'application/json'}
        }); 
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const getBids = createAsyncThunk('getBids', async (artId, {rejectWithValue}) => {
    try {
        const {data, status} = await axios.get(`/api/v1/auction/${artId}`); 
        if(status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


const auctionSlice = createSlice({
    name: 'auction',

    initialState: {
        allBids: [],
    },

    reducers: {
        clearMessage: (state, action) => {
            state.messsage = null;
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

        // get bids
        builder.addCase(getBids.pending, (state) => {
            state.isLoading = true;
        }).addCase(getBids.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allBids = action.payload.bids
        }).addCase(getBids.rejected, (state, action) => {
            state.isLoading = false;
            state.allBids = []
        })
    }
})

export default auctionSlice.reducer
export const {clearError, clearMessage} = auctionSlice.actions;