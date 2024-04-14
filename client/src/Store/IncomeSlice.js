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
        }
    }
});

export const { addIncome } = incomeSlice.actions;
export default incomeSlice.reducer;
