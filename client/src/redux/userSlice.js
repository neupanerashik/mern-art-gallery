import axios from "axios"
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

// register user
export const registerUser = createAsyncThunk('registerUser', async (userData, { rejectWithValue }) => {
    try {
        const { data, status } = await axios.post('/api/v1/register', userData, {headers: {'Content-Type': 'application/json'}});
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// get user profile data
export const getProfile = createAsyncThunk('getProfile', async (_, { rejectWithValue }) => {
    try {
        const { data, status } = await axios.get('/api/v1/profile', {withCredentials: true});
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// login user
export const loginUser = createAsyncThunk('loginUser', async (userData, { rejectWithValue }) => {
    try {
        const { data, status } = await axios.post('/api/v1/login', userData, {headers: {'Content-Type': 'application/json'}});
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



export const userSlice = createSlice({
  name: 'user',
  
  initialState: {
    user: {},
    isAuthenticated: false
  },
  
  reducers: {
    clearError: (state) => {
        state.error = null;
    },

    clearMessage: (state) => {
        state.message = null;
    }
  },

  extraReducers: (builder) => {
    // get profile data
    builder.addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
    }).addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
    }).addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        // state.error = action.payload.message;
    })

    // logout user
    builder.addCase(logoutUser.pending, (state, action) => {
        state.isLoading = true;
        state.isAuthenticated = true;
    }).addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isAuthenticated = false;
        // state.message = action.payload.message;
    }).addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        // state.error = action.payload.message;
    })

    builder.addMatcher(isAnyOf(registerUser.pending, loginUser.pending), (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
    }).addMatcher(isAnyOf(registerUser.fulfilled, loginUser.fulfilled), (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
    }).addMatcher(isAnyOf(registerUser.rejected, loginUser.rejected), (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload.message;
    })

   
  }
})

// Action creators are generated for each case reducer function
export const { clearError, clearMessage } = userSlice.actions

export default userSlice.reducer