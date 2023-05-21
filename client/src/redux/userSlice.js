import axios from "axios"
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

// register user
export const registerUser = createAsyncThunk('registerUser', async (registerData, { rejectWithValue }) => {
    try {
        const { data, status } = await axios.post(`/api/v1/register`, registerData, {headers: {'Content-Type': 'application/json'}});
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


// get my profile
export const getMyProfile = createAsyncThunk('getMyProfile', async (_, { rejectWithValue }) => {
    try {
        const { data, status } = await axios.get(`/api/v1/profile/me`, {withCredentials: true});
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


// login user
export const loginUser = createAsyncThunk('loginUser', async (loginData, { rejectWithValue }) => {
    try {
        const { data, status } = await axios.post(`/api/v1/login`, loginData, {headers: {'Content-Type': 'application/json'}});
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// logout user
export const logoutUser = createAsyncThunk('logoutUser', async (_, { rejectWithValue }) => {
    try {
        const { data, status } = await axios.get(`/api/v1/logout`, {withCredentials: true});
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


export const createOrder = createAsyncThunk('createOrder', async (orderData,  {rejectWithValue}) => {
    try{
        const {data, status} = await axios.post(`/api/v1/order/new`, {orderData}, {
            withCredentials: true,
            headers: {'Content-Type': 'application/json'}
        });
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


// get orders made
export const getOrdersMade = createAsyncThunk('getOrdersMade', async (_, {rejectWithValue}) => {
    try {
        const { data, status } = await axios.get(`/api/v1/orders/made`, {withCredentials: true});
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


// get orders received
export const getOrdersReceived = createAsyncThunk('getOrdersReceived', async (_, {rejectWithValue}) => {
    try {
        const { data, status } = await axios.get(`/api/v1/orders/received`, {withCredentials: true});
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

// subscribe
export const subscribe = createAsyncThunk('subscribe', async (email, {rejectWithValue}) => {
    try {
        const { data, status } = await axios.post(`/api/v1/subscribe`, {email}, {
            headers: {'Content-Type': 'application/json'}
        });
        if (status >= 300) {return rejectWithValue(data)};
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const userSlice = createSlice({
  name: 'user',
  
  initialState: {
    myData: {},
    isAuthenticated: false,
    order: {},
    orders: [],
    ordersMade: [],
    ordersReceived: [],
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
    builder.addCase(deleteAccount.pending, (state, action) => {
       state.isLoading = true;
   }).addCase(deleteAccount.fulfilled, (state, action) => {
       state.isLoading = false;
       state.message = action.payload.message;
       state.isAuthenticated = false;
   }).addCase(deleteAccount.rejected, (state, action) => {
       state.isLoading = false;
       state.error = action.payload.message;
   })

   
    //createOrder
    builder.addCase(createOrder.pending, (state, action) => {
        state.isLoading = true;
    }).addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
        state.message = action.payload.message;
    }).addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
    })


    //orders made
    builder.addCase(getOrdersMade.pending, (state, action) => {
        state.isLoading = true;
    }).addCase(getOrdersMade.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ordersMade = action.payload.ordersMade;
    }).addCase(getOrdersMade.rejected, (state, action) => {
        state.isLoading = false;
        state.ordersMade = [];
    })


    //orders received
    builder.addCase(getOrdersReceived.pending, (state, action) => {
        state.isLoading = true;
    }).addCase(getOrdersReceived.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ordersReceived = action.payload.ordersReceived;
    }).addCase(getOrdersReceived.rejected, (state, action) => {
        state.isLoading = false;
        state.ordersReceived = [];
    })


    // subscribe
    builder.addCase(subscribe.pending, (state, action) => {
        state.isLoading = true;
    }).addCase(subscribe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
    }).addCase(subscribe.rejected, (state, action) => {
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