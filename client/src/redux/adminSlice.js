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

const adminSlice = createSlice({
    name: 'admin',

    initialState: {
        allUsers: [],
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
    }
})

export default adminSlice.reducer
export const {clearError, clearMessage} = adminSlice.actions;