import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (_, { getState }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:24635/profile', {
        headers: {
          Authorization: token
        }
      });
      console.log(response)
      return response.data;
    } catch (error) {
      console.log('Error fetching user profile:', error);
      throw error;
    }
  }
);

export const updateFullName = createAsyncThunk(
  'profile/updateFullName',
  async (fullname) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:24635/profile/name',
      {fullname}, {
        headers: {
          Authorization: token
        }
      });
      console.log(response)
      return response.data.fullName;
    } catch (error) {
      console.log('Error fetching user profile:', error);
      throw error;
    }
  }
);

export const updateEmail = createAsyncThunk(
  'profile/updateEmail',
  async (email, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:24635/profile/email',
      { email }, {
        headers: {
          Authorization: token
        }
      });
      return email;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePassword = createAsyncThunk(
  'profile/updatePassword',
  async (password, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:24635/profile/password', { password }, {
        headers: {
          Authorization: token
        }
      });
      return 'Password updated successfully';
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  fullName: '',
  email: '',
  error: null,
  status: 'idle',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload)
        state.fullName = action.payload.full_name;
        state.email = action.payload.email;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateFullName.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateFullName.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload)
        state.fullName = action.payload;
        state.error = null;
      })
      .addCase(updateFullName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateEmail.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateEmail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.email = action.payload;
        state.error = null;
      })
      .addCase(updateEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectUser = (state) => state.profile.fullName;
export const selectError = (state) => state.profile.error;
export const selectStatus = (state) => state.profile.status;

export default profileSlice.reducer;
