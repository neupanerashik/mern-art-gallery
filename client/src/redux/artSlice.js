import axios from "axios";
import { updateMyData } from './userSlice.js';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// get arts
export const getAllArts = createAsyncThunk('getAllArts', async ({keyword='', category='', maxPrice, minPrice, sortByPrice}, {rejectWithValue}) => { 
    const link = `/api/v1/arts?keyword=${keyword}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortByPrice=${sortByPrice}`
    try {
        const {data, status} = await axios.get(link);
        if(status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
  }
)


// get specific art
export const readArtwork = createAsyncThunk('readArtwork', async (id, {rejectWithValue}) => { 
    try {
        const {data, status} = await axios.get(`/api/v1/art/${id}`);
        if(status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
  }
)


// add to likes
export const addToLikes = createAsyncThunk('addToLikes', async (artData, { rejectWithValue, dispatch }) => {
    try {
        const { data, status } = await axios.post('/api/v1/likes/add', artData, {withCredentials: true, headers: {'Content-Type': 'application/json'}});
        if (status >= 300) {return rejectWithValue(data)};
        dispatch(updateMyData(data.user));
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


// remove from likes
export const removeFromLikes = createAsyncThunk('removeFromLikes', async (artId, { rejectWithValue, dispatch }) => {
    try {
        const { data, status } = await axios.delete('/api/v1/likes/remove', { 
            data: {artId},
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


// create review 
export const createReview = createAsyncThunk('createReview', async (reviewData,  {rejectWithValue}) => {
	try{
		const {data, status} = await axios.put('/api/v1/art/review', reviewData, {headers: {'Content-Type': 'application/json'}})
        if (status >= 300) {return rejectWithValue(data)};
        return data;
	}catch(err){
		rejectWithValue(err.response.data);
	}
})


export const artSlice = createSlice({
    name: 'art',

    initialState: {
        allArts: [],
        newArrivals: [],
        highestRated: [],
        specialOffers: [],
        artwork: {},
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
        // get arts
        builder.addCase(getAllArts.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getAllArts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allArts = action.payload.arts;
        }).addCase(getAllArts.rejected, (state, action) => {
            state.isLoading = false;
            state.allArts = [];
        })

        // get specific art
        builder.addCase(readArtwork.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(readArtwork.fulfilled, (state, action) => {
            state.isLoading = false;
            state.artwork = action.payload.artwork;
        }).addCase(readArtwork.rejected, (state, action) => {
            state.isLoading = false;
            state.artwork = {};
        })

        // create review
        builder.addCase(createReview.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(createReview.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message;
        }).addCase(createReview.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        })
    }
});

export const {clearError, clearMessage} = artSlice.actions;
export default artSlice.reducer;