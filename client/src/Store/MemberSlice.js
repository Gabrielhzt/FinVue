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
            console.log(state.members)
        },
        updateMember(state, action) {
            const { id, name, amount } = action.payload;
            console.log(state)
            const existingMember = state.members.find(member => member.id.toString() === id);
            console.log(existingMember)
            if (existingMember) {
                existingMember.name = name;
                existingMember.amount = amount;
            }
        }
    }
});

export const { addMember, updateMember } = memberSlice.actions;
export default memberSlice.reducer;
