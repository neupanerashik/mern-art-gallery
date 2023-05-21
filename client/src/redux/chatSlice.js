import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// get chats
export const getMyChats = createAsyncThunk('getMyChats', async (myId, { rejectWithValue }) => {
    try {
        const { data, status } = await axios.get(`/api/v1/chats?myId=${myId}`, {withCredentials: true});
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


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
        const {data, status} = await axios.post(`/api/v1/message/new`, message, {withCredentials: true, headers: {'Content-Type': 'application/json'}});
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: [],
        chatMessages: [],
    },
    reducers: {},
    extraReducers: (builder) => {

        // get my chat
        builder.addCase(getMyChats.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getMyChats.fulfilled, (state, action) => {
            state.isLoading = false;
            state.chats = action.payload.chats;
        }).addCase(getMyChats.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        })

        // get chat messages
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