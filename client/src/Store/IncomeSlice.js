import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchIncomes = createAsyncThunk(
  'incomes/fetchIncomes',
  async (_, { getState }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:24635/incomes`, {
            headers: {
              Authorization: token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching incomes:', error);
        throw error;
    }
  }
);

export const addIncome = createAsyncThunk(
  'incomes/addIncome',
  async (incomeData, { getState }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:24635/incomes/add',
        { ...incomeData }, {
            headers: {
              Authorization: token
            }
        });
        return response.data;
    } catch (error) {
      console.error('Error adding income:', error);
      throw error;
    }
  }
);

export const updateIncome = createAsyncThunk(
  'incomes/updateIncome',
  async ({ incomeId, incomeData }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`http://localhost:24635/incomes/update/${incomeId}`, 
        { ...incomeData }, {
            headers: {
              Authorization: token
            }
        });
        return response.data;
    } catch (error) {
      console.error('Error updating income:', error);
      throw error;
    }
  }
);

export const deleteIncome = createAsyncThunk(
  'incomes/deleteIncome',
    async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:24635/incomes/delete/${id}`, {
                headers: {
                  Authorization: token
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting income:', error);
            throw error;
        }
  }
);

export const fetchFilteredIncomes = createAsyncThunk(
    'incomes/fetchFilteredIncomes',
    async (_, { getState }) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:24635/incomes/allfilter', {
          headers: {
            Authorization: token,
          },
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching filtered incomes:', error);
        throw error;
      }
    }
);

export const fetchTotalIncomes = createAsyncThunk(
    'incomes/fetchTotalIncomes',
        async (_, { getState }) => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:24635/incomes/total`, {
                headers: {
                    Authorization: token
                }
                });
                return response.data;
            } catch (error) {
                console.error('Error fetching total incomes:', error);
                throw error;
            }
        }
);

const initialState = {
  incomes: [],
  allfilter: [],
  totalIncomes: [],
  error: null,
  status: 'idle'
};

export const incomesSlice = createSlice({
  name: 'incomes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.incomes = action.payload;
        state.error = null;
      })
      .addCase(fetchIncomes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        state.incomes.push(action.payload);
      })
      .addCase(updateIncome.fulfilled, (state, action) => {
        const index = state.incomes.findIndex(income => income.id === action.payload.id);
        if (index !== -1) {
          state.incomes[index] = action.payload;
        }
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.incomes = state.incomes.filter(income => income.id !== action.payload.id);
      })
      .addCase(fetchFilteredIncomes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allfilter = action.payload;
        state.error = null;
      })
      .addCase(fetchTotalIncomes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTotalIncomes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.totalIncomes = action.payload;
        state.error = null;
      })
      .addCase(fetchTotalIncomes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectIncomes = (state) => state.incomes.incomes;
export const selectIncomesError = (state) => state.incomes.error;
export const selectIncomesStatus = (state) => state.incomes.status;

export default incomesSlice.reducer;