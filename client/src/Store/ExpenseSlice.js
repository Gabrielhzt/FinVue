import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async (_, { getState }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:24635/expenses`, {
            headers: {
              Authorization: token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw error;
    }
  }
);

export const addExpense = createAsyncThunk(
  'expenses/addExpense',
  async (expenseData, { getState }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:24635/expenses/add',
        { ...expenseData }, {
            headers: {
              Authorization: token
            }
        });
        return response.data;
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  }
);

export const updateExpense = createAsyncThunk(
  'expenses/updateExpense',
  async ({ expenseId, expenseData }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`http://localhost:24635/expenses/update/${expenseId}`, 
        { ...expenseData }, {
            headers: {
              Authorization: token
            }
        });
        return response.data;
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  }
);

export const deleteExpense = createAsyncThunk(
  'expenses/deleteExpense',
    async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:24635/expenses/delete/${id}`, {
                headers: {
                  Authorization: token
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting expense:', error);
            throw error;
        }
  }
);

export const fetchFilteredExpenses = createAsyncThunk(
    'expenses/fetchFilteredExpenses',
    async (_, { getState }) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:24635/expenses/allfilter', {
          headers: {
            Authorization: token,
          },
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching filtered expenses:', error);
        throw error;
      }
    }
);

export const fetchTotalExpenses = createAsyncThunk(
    'expenses/fetchTotalExpenses',
        async (_, { getState }) => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:24635/expenses/total`, {
                headers: {
                    Authorization: token
                }
                });
                return response.data;
            } catch (error) {
                console.error('Error fetching total expenses:', error);
                throw error;
            }
        }
);

const initialState = {
    expenses: [],
    allfilter: [],
    totalExpenses: [],
    error: null,
    status: 'idle'
};

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.expenses = action.payload;
        state.error = null;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(income => income.id === action.payload.id);
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(income => income.id !== action.payload.id);
      })
      .addCase(fetchFilteredExpenses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allfilter = action.payload;
        state.error = null;
      })
      .addCase(fetchTotalExpenses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTotalExpenses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.totalExpenses = action.payload;
        state.error = null;
      })
      .addCase(fetchTotalExpenses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectExpenses = (state) => state.expenses.expenses;
export const selectExpensesError = (state) => state.expenses.error;
export const selectExpensesStatus = (state) => state.expenses.status;

export default expensesSlice.reducer;