import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    members: []
};

const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        addMember(state, action) {
            const { name, amount } = action.payload;
            state.members.push({ id: Date.now(), name, amount });
        }
    }
});

export const { addMember } = memberSlice.actions;
export default memberSlice.reducer;
