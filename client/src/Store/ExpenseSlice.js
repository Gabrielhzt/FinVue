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
        },
        updateExpense(state, action) {
            const { id, type, name, amount, date } = action.payload;
            const existingExpense = state.expenses.find(expense => expense.id.toString() === id);
            if (existingExpense) {
                existingExpense.type = type;
                existingExpense.name = name;
                existingExpense.amount = amount;
                existingExpense.date = date;
            }
        }
    }
});

export const { addExpense, updateExpense } = expenseSlice.actions;
export default expenseSlice.reducer;