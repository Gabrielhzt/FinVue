// store.js
import { configureStore } from '@reduxjs/toolkit';
import incomeReducer from './IncomeSlice';
import expenseReducer from './ExpenseSlice';
import memberReducer from './MemberSlice';

export const store = configureStore({
  reducer: {
    incomes: incomeReducer,
    expenses: expenseReducer,
    members: memberReducer,
  },
});