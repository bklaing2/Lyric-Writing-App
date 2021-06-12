import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../sharedComponents/counter/counterSlice';
import songReducer from './songSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    song: songReducer,
  },
});