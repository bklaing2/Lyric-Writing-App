import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const DATA_PATH = 'data/songs/songs.json';
const OPTIONS = {
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

const initialState = {
  songs: [],
  openSong: null,
};



export const loadSongs = createAsyncThunk(
  'browser/loadSongs',
  async () => {
    return fetch(DATA_PATH, OPTIONS)
      .then(songs => { return songs.json(); })
  }
);


// Main slice
export const browserSlice = createSlice({
  name: 'browser',
  initialState,
  
  // Reducers
  reducers: {
    createSong: state => {
      const song = {
        id: Date.now(), // TODO: Change later
        title: 'New Song',
        meta: {
          tempo: 120,
          keySig: 'C',
          timeSig: { top: 4, bottom: 4 }
        },
        sections: []
      }

      state.songs.push(song);
      state.openSong = state.songs[state.songs.length - 1].id

      // TODO: Write to database
    },
    setOpenSong: (state, action) => { state.openSong = action.payload; },
  },

  // Extra reducers
  extraReducers: builder => {
    builder
      .addCase(loadSongs.pending, state => {
        // console.log('Pending');
      })
      .addCase(loadSongs.fulfilled, (state, action) => {
        console.log(action.payload.songs);
        state.songs = action.payload.songs;
      });
  }
});


// Selectors
export const selectOpenSong = state => state.browser.openSong;
export const selectSongs = state => state.browser.songs;



// Exports
export default browserSlice.reducer;

export const {
  createSong,
  setOpenSong,
} = browserSlice.actions;