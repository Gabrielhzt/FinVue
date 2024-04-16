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
      return response.data;
    } catch (error) {
      console.log('Error fetching user profile:', error);
      throw error;
    }
  }
);

const initialState = {
  user: null,
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
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.profile.user;
export const selectError = (state) => state.profile.error;
export const selectStatus = (state) => state.profile.status;

export default profileSlice.reducer;
