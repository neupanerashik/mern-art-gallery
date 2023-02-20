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


// get user profile
export const getUserProfile = createAsyncThunk('getProfile', async (id, { rejectWithValue }) => {
    try {
        const { data, status } = await axios.get(`/api/v1/user/${id}`, {withCredentials: true});
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

export const userSlice = createSlice({
  name: 'user',
  
  initialState: {
    userData: {},
    myData: {},
    isAuthenticated: false
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

    // get user profile
    builder.addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
    }).addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.userData = action.payload.user;
    }).addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.userData = null;
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