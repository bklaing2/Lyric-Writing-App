import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import mainReducer from '../features/main/mainSlice';
// import songListReducer from '../features/main/songBrowser/songList/songListSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    main: mainReducer,
    // songList: songListReducer,
  },
});