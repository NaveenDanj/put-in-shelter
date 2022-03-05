import { configureStore } from '@reduxjs/toolkit'
import CurrentUserReducer from './Slices/CurrentUserSlice'


export const store = configureStore({
  reducer: {
    currentUser : CurrentUserReducer
  },
  middleware : getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

