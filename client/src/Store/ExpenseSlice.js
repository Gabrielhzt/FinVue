import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expenses: []
};

const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        addExpense(state, action) {
            const { type, name, amount, date } = action.payload;
            state.expenses.push({ id: Date.now(), type, name, amount, date });
        }
    }
});

export const { addExpense } = expenseSlice.actions;
export default expenseSlice.reducer;