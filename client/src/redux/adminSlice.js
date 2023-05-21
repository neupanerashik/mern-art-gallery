import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

//getAllUsers thunk
export const getUsers = createAsyncThunk('getUsers', async ({keyword=''}, {rejectWithValue}) => {
    try {
        const {data, status} = await axios.get(`/api/v1/admin/users?keyword=${keyword}`, {withCredentials: true});
        if(status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// deleteUser
export const deleteUser = createAsyncThunk('deleteUser', async (userId, { rejectWithValue, dispatch }) => {
    try {
        const { data, status } = await axios.delete(`/api/v1/admin/user/delete/${userId}`, {withCredentials: true});  
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

//getAllOrders thunk
export const getAllOrders = createAsyncThunk('admin/getAllOrders', async (_, {rejectWithValue}) => {
    try {
        const {data, status} = await axios.get(`/api/v1/admin/orders`);
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})
  
  
//updateOrder thunk
export const updateOrder = createAsyncThunk('admin/updateOrder', async ({orderId, orderStatus}, {rejectWithValue}) => {  
    try {
        const {data, status} = await axios.put(`/api/v1/admin/order/${orderId}`, {orderStatus}, {
            headers: {'Content-Type': 'application/json'}, 
            withCredentials: true
        });
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})
  
  
//deleteOrder thunk
export const deleteOrder = createAsyncThunk('admin/deleteOrder', async (orderId, {rejectWithValue}) => {
    try {
        const {data, status} = await axios.delete(`/api/v1/admin/order/${orderId}`);
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// getStats thunk
export const getStats = createAsyncThunk('admin/getStats', async (_, {rejectWithValue}) => {
    try{
        const {data, status} = await axios.get(`/api/v1/admin/stats`);
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    }catch (err){
        return rejectWithValue(err.response.data);
    }
})

const adminSlice = createSlice({
    name: 'admin',

    initialState: {
        allUsers: [],
        allOrders: [],
        stats: {}
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

        // get allUsers
        builder.addCase(getUsers.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allUsers = action.payload.users;
        }).addCase(getUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.allUsers = [];
        })

         // update order
         builder.addCase(updateOrder.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(updateOrder.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(updateOrder.rejected, (state, action) => {
            state.isLoading = false;
        })

        // get allUsers
        builder.addCase(getAllOrders.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getAllOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allOrders = action.payload.orders;
        }).addCase(getAllOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.allOrders = [];
        })

        // getStats
        builder.addCase(getStats.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getStats.fulfilled, (state, action) => {
            state.isLoading = false;
            state.stats = action.payload;
        }).addCase(getStats.rejected, (state, action) => {
            state.isLoading = false;
            state.stats = {}
        })
    }
})

export default adminSlice.reducer
export const {clearError, clearMessage} = adminSlice.actions;