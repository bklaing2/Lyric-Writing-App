import { createSlice } from '@reduxjs/toolkit';

const song1 = {
  id: 'song1Id',
  title: 'song1',
  meta: {
    tempo: 120,
    keySig: 'C',
    timeSig: { top: 4, bottom: 4 }
  },
  sections: [
    { label: 'Verse', lines: ['line 1', 'line 2', 'line 3'] },
    { label: 'Chorus', lines: ['line 1', 'line 2'] },
  ]
}

const song2 = {
  id: 'song2Id',
  title: 'song2',
  meta: {
    tempo: 155,
    keySig: 'C#',
    timeSig: { top: 4, bottom: 4 }
  },
  sections: [
    { label: 'Verse', lines: ['line 1', 'line 2', 'line 3'] },
  ]
}

const song3 = {
  id: 'song3Id',
  title: 'song3',
  meta: {
    tempo: 80,
    keySig: 'B#',
    timeSig: { top: 6, bottom: 8 }
  },
  sections: [
    { label: 'Verse 1', lines: ['line 1', 'line 2', 'line 3'] },
    { label: 'Chorus 1', lines: ['line 1', 'line 2'] },
    { label: 'Verse 2', lines: ['line 1', 'line 2'] },
    { label: 'Chorus 2', lines: ['line 1', 'line 2', 'line 3'] },
  ]
}

const initialState = {
  songs: [song1, song2, song3],
  selectedSong: song1.id,
};


const getSelectedSong = (songs, selectedSong) => songs.find((song) => {
  console.log(song.id + ' ' + selectedSong);
  return song.id === selectedSong;
});

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  
  reducers: {
    createNewSong: (state, action) => {
      state.songs.push(action.payload);
    },
    selectSong: (state, action) => {
      state.selectedSong = action.payload;
    },
    editSongTitle: (state, action) => {
      getSelectedSong(state.songs, state.selectedSong).title = action.payload;
    },
    editSongMeta: (state, action) => {
      getSelectedSong(state.songs, state.selectedSong).meta = action.payload;
    },
    addSongSection: (state, action) => {
      getSelectedSong(state.songs, state.selectedSong).sections.push(action.payload);
    }
  },
});

export const { createNewSong, selectSong, editSongTitle, editSongMeta, addSongSection } = mainSlice.actions;

export const selectSongs = (state) => state.main.songs;
// export const selectSongNames = (state) => state.main.songs.map((song) => {id, title});
export const selectSelectedSong = (state) => getSelectedSong(state.main.songs, state.main.selectedSong);

export default mainSlice.reducer;
