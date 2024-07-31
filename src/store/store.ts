import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import todoReducer from '../slices/todoSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(/* add custom middleware if needed */),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
