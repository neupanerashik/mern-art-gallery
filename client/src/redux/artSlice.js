import axios from "axios";
import { updateMyData } from './userSlice.js';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// upload product
export const uploadArt = createAsyncThunk('uploadArt', async(productData, {rejectWithValue}) => {
    try{
        const { data, status} = await axios.post(`/api/v1/art/upload`, productData, {
            headers: {'Content-Type': 'multipart/form-data'},
            withCredentials: true
        });
        if(status >= 300) {return rejectWithValue(data)};
        return data; 
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})

// get arts
export const getAllArts = createAsyncThunk('getAllArts', async ({keyword='', category='', maxPrice=Number(50000), minPrice=Number(0), sortByPrice=''}, {rejectWithValue}) => { 
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


// delete artwork
export const deleteArt = createAsyncThunk('deleteArt', async (artId, {rejectWithValue}) => {
    try{
        const {data, status} = await axios.delete(`/api/v1/art/delete/${artId}`, {withCredentials: true});
        if(status >= 300) {return rejectWithValue(data)};
        return data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})


// add to likes
export const addToLikes = createAsyncThunk('addToLikes', async (artData, { rejectWithValue, dispatch }) => {
    try {
        const { data, status } = await axios.post(`/api/v1/likes/add`, artData, {withCredentials: true, headers: {'Content-Type': 'application/json'}});
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
        const { data, status } = await axios.delete(`/api/v1/likes/remove`, { 
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
export const createReview = createAsyncThunk('createReview', async (reviewData,  {rejectWithValue, dispatch}) => {
	try{
		const {data, status} = await axios.put(`/api/v1/art/review`, reviewData, {headers: {'Content-Type': 'application/json'}})
        if (status >= 300) {return rejectWithValue(data)};
        return data;
	}catch(err){
		rejectWithValue(err.response.data);
	}
})

// get reviews
export const getReviews = createAsyncThunk('getreviews', async (id, {rejectWithValue}) => { 
    try {
        const {data, status} = await axios.get(`/api/v1/art/${id}/reviews`);
        if(status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
  }
)


///updateOrder thunk
export const updateArtwork = createAsyncThunk('updateArtwork', async (artData, {rejectWithValue}) => {  
    const {artId, name, price, category, discount, description} = artData;
    try {
        const {data, status} = await axios.put(`/api/v1/art/update/${artId}`, {name, price, category, discount, description}, {
            headers: {'Content-Type': 'application/json'}, 
            withCredentials: true
        });
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


export const artSlice = createSlice({
    name: 'art',

    initialState: {
        artwork: {},
        allArts: [],
        allReviews: {},
        newArrivals: [],
        highestRated: [],
        specialOffers: [],
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
        
        // upload product
        builder.addCase(uploadArt.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(uploadArt.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message;
        }).addCase(uploadArt.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        })

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


         // delete art
        builder.addCase(deleteArt.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(deleteArt.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message;
        }).addCase(deleteArt.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        })


         // delete art
        builder.addCase(updateArtwork.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(updateArtwork.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(updateArtwork.rejected, (state, action) => {
            state.isLoading = false;
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

         // get reviews
         builder.addCase(getReviews.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getReviews.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allReviews = action.payload;
        }).addCase(getReviews.rejected, (state, action) => {
            state.isLoading = false;
            state.allReviews = {};
        })

    }
});

export const {clearError, clearMessage} = artSlice.actions;
export default artSlice.reducer;