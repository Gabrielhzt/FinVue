import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    incomes: []
};

const incomeSlice = createSlice({
    name: 'income',
    initialState,
    reducers: {
        addIncome(state, action) {
            const { type, name, amount, date } = action.payload;
            state.incomes.push({ id: Date.now(), type, name, amount, date });
        },
        updateIncome(state, action) {
            const { id, type, name, amount, date } = action.payload;
            const existingIncome = state.incomes.find(income => income.id.toString() === id);
            if (existingIncome) {
                existingIncome.type = type;
                existingIncome.name = name;
                existingIncome.amount = amount;
                existingIncome.date = date;
            }
        }
    }
});

export const { addIncome, updateIncome } = incomeSlice.actions;
export default incomeSlice.reducer;
