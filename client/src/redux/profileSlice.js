import axios from 'axios';
import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit'
import { updateMyData } from './userSlice.js';

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


// update profile
export const updateProfile = createAsyncThunk('updateProfile', async (profileData, { rejectWithValue, dispatch }) => {
    try {
        const { data, status } = await axios.put(`/api/v1/profile/update`, profileData, {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        });
        if (status >= 300) {return rejectWithValue(data)};
        dispatch(updateMyData(data.user));
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});



// update profile
export const updateAvatar = createAsyncThunk('updateAvatar', async (avatar, { rejectWithValue, dispatch }) => {
    try {
        const { data, status } = await axios.put(`/api/v1/profile/avatar/update`, avatar, {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        });
        if (status >= 300) {return rejectWithValue(data)};
        dispatch(updateMyData(data.user));
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


// slices
const profileSlice = createSlice({
	name: 'profile',

	initialState: {
        userData: {}
    },

	reducers: {
		clearError: (state, action) => {
            state.error = null;
        },

        clearMessage: (state, action) => {
            state.message = null;
        },
	}, 

	extraReducers: (builder) => {

        // get user profile
        builder.addCase(getUserProfile.pending, (state) => {
            state.isLoading = true;
            state.isAuthenticated = false;
        }).addCase(getUserProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = action.payload.user;
        }).addCase(getUserProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.userData = null;
        })

        // update profile and avatar
         .addMatcher(isAnyOf(updateProfile.pending, updateAvatar.pending), (state, action) => {
            state.isLoading = true;
        }).addMatcher(isAnyOf(updateProfile.fulfilled, updateAvatar.fulfilled), (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message;
        }).addMatcher(isAnyOf(updateProfile.rejected, updateAvatar.rejected), (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        })
	}
})


// actions and reducers exports
export const {clearError, clearMessage} = profileSlice.actions;
export default profileSlice.reducer;
