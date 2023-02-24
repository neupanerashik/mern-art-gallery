import axios from "axios"
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

// register user
export const registerUser = createAsyncThunk('registerUser', async (registerData, { rejectWithValue }) => {
    try {
        const { data, status } = await axios.post('/api/v1/register', registerData, {headers: {'Content-Type': 'application/json'}});
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


// get my profile
export const getMyProfile = createAsyncThunk('getMyProfile', async (_, { rejectWithValue }) => {
    try {
        const { data, status } = await axios.get('/api/v1/profile/me', {withCredentials: true});
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


// login user
export const loginUser = createAsyncThunk('loginUser', async (loginData, { rejectWithValue }) => {
    try {
        const { data, status } = await axios.post('/api/v1/login', loginData, {headers: {'Content-Type': 'application/json'}});
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// logout user
export const logoutUser = createAsyncThunk('logoutUser', async (_, { rejectWithValue }) => {
    try {
        const { data, status } = await axios.get('/api/v1/logout', {withCredentials: true});
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// delete artwork
export const deleteAccount = createAsyncThunk('deleteAccount', async (userId, { rejectWithValue, dispatch }) => {
    try {
        const { data, status } = await axios.delete(`/api/v1/account/delete/${userId}`, { 
            withCredentials: true, 
            headers: {'Content-Type': 'application/json'}
        });
          
        if (status >= 300) {return rejectWithValue(data)};
        dispatch(updateMyData(data.user));
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// logout user
export const getMyChats = createAsyncThunk('getMyChats', async (myId, { rejectWithValue }) => {
    try {
        const { data, status } = await axios.get(`/api/v1/chats?myId=${myId}`, {withCredentials: true});
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const userSlice = createSlice({
  name: 'user',
  
  initialState: {
    myData: {},
    isAuthenticated: false,
    chats: []
  },
  
  reducers: {
    updateMyData: (state, action) => {
        state.myData = action.payload;
    },

    clearError: (state) => {
        state.error = null;
    },

    clearMessage: (state) => {
        state.message = null;
    }
  },

  extraReducers: (builder) => {
    // get my profile
    builder.addCase(getMyProfile.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
    }).addCase(getMyProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.myData = action.payload.user;
    }).addCase(getMyProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.myData = null;
    })


    // logout user
    builder.addCase(logoutUser.pending, (state, action) => {
        state.isLoading = true;
        state.isAuthenticated = true;
    }).addCase(logoutUser.fulfilled, (state, action) => {
        state.myData = null;
        state.isLoading = false;
        state.isAuthenticated = false;
    }).addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
    })

    // delete art
    .addCase(deleteAccount.pending, (state, action) => {
       state.isLoading = true;
   }).addCase(deleteAccount.fulfilled, (state, action) => {
       state.isLoading = false;
       state.message = action.payload.message;
       state.isAuthenticated = false;
   }).addCase(deleteAccount.rejected, (state, action) => {
       state.isLoading = false;
       state.error = action.payload.message;
   })

     // delete art
     .addCase(getMyChats.pending, (state, action) => {
        state.isLoading = true;
    }).addCase(getMyChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats = action.payload.chats;
    }).addCase(getMyChats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
    })
   
    // register user, login user
    builder.addMatcher(isAnyOf(registerUser.pending, loginUser.pending), (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
    }).addMatcher(isAnyOf(registerUser.fulfilled, loginUser.fulfilled), (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.myData = action.payload.user;
        state.message = action.payload.message;
    }).addMatcher(isAnyOf(registerUser.rejected, loginUser.rejected), (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload.message;
    })

  }
})

// Action creators are generated for each case reducer function
export const { updateMyData, clearError, clearMessage } = userSlice.actions

export default userSlice.reducer