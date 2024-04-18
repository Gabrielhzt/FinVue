import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMembers = createAsyncThunk(
  'members/fetchMembers',
  async (_, { getState }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:24635/members`, {
            headers: {
              Authorization: token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching members:', error);
        throw error;
    }
  }
);

export const addMember = createAsyncThunk(
  'members/addMember',
  async (memberData, { getState }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:24635/members/add',
        { ...memberData }, {
            headers: {
              Authorization: token
            }
        });
        return response.data;
    } catch (error) {
      console.error('Error adding member:', error);
      throw error;
    }
  }
);

export const updateMember = createAsyncThunk(
  'members/updateMember',
  async ({ memberId, memberData }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`http://localhost:24635/members/update/${memberId}`, 
        { ...memberData }, {
            headers: {
              Authorization: token
            }
        });
        return response.data;
    } catch (error) {
      console.error('Error updating member:', error);
      throw error;
    }
  }
);

export const deleteMember = createAsyncThunk(
  'members/deleteMember',
    async (memberId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:24635/members/delete/${memberId}`, {
                headers: {
                  Authorization: token
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting member:', error);
            throw error;
        }
  }
);

export const fetchTotalMembers = createAsyncThunk(
    'members/fetchTotalMembers',
        async (_, { getState }) => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:24635/members/total`, {
                headers: {
                    Authorization: token
                }
                });
                return response.data;
            } catch (error) {
                console.error('Error fetching total members:', error);
                throw error;
            }
        }
);

const initialState = {
    members: [], 
    totalMembers: [],
    error: null,
    members_status: 'idle',
    totalMembers_status: 'idle'
};

export const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.members_status = 'loading';
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.members_status = 'succeeded';
        state.members = action.payload;
        state.error = null;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.members_status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.members.push(action.payload);
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        const index = state.members.findIndex(member => member.id === action.payload.id);
        if (index !== -1) {
          state.members[index] = action.payload;
        }
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.members = state.members.filter(member => member.id !== action.payload.id);
      })
      .addCase(fetchTotalMembers.pending, (state) => {
        state.totalMembers_status = 'loading';
      }).addCase(fetchTotalMembers.fulfilled, (state, action) => {
        state.totalMembers_status = 'succeeded';
        state.totalMembers = action.payload;
        state.error = null;
      }).addCase(fetchTotalMembers.rejected, (state, action) => {
        state.totalMembers_status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectMembers = (state) => state.members.members;

export default membersSlice.reducer;

