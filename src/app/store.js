import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../components/counter/counterSlice';
import mainReducer from '../components/mainSlice';
import browserReducer from '../components/browser/browserSlice';
import editorReducer from '../components/editor/editorSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    main: mainReducer,
    browser: browserReducer,
    editor: editorReducer,
  },
});