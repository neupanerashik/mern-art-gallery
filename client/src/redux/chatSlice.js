import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getChatMessages = createAsyncThunk('getChatMessages', async (chatId, {rejectWithValue}) => {
    try {
        const {data, status} = await axios.get(`/api/v1/messages?chatId=${chatId}`);
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


export const sendMessage = createAsyncThunk('sendMessage', async (message, {rejectWithValue}) => {
    try {
        const {data, status} = await axios.post('/api/v1/message/new', message, {withCredentials: true, headers: {'Content-Type': 'application/json'}});
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chatMessages: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getChatMessages.pending, (state) => {
            state.isLoading = true;
        }).addCase(getChatMessages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.chatMessages = action.payload.chatMessages;
        }).addCase(getChatMessages.rejected, (state, action) => {
            state.isLoading = false;
            state.chatMessages = [];
        })
    } 
});

export default chatSlice.reducer;