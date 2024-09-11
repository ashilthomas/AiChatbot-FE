import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './chatbotSlice';

export const store = configureStore({
    reducer: {
     chatRes:dataSlice
    },
  });
  export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;