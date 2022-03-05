import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  currentUser: null,
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {

    setCurrentUser: (state, action) => {
        state.currentUser = action.payload;
    },
   

  },

})

// Action creators are generated for each case reducer function
export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;