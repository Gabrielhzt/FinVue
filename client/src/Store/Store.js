// store.js
import { configureStore } from '@reduxjs/toolkit';
import incomeReducer from './IncomeSlice';
import expenseReducer from './ExpenseSlice';
import memberReducer from './MemberSlice';
import profileReducer from './ProfileSlice';

export const store = configureStore({
  reducer: {
    incomes: incomeReducer,
    expenses: expenseReducer,
    members: memberReducer,
    profile: profileReducer
  },
});