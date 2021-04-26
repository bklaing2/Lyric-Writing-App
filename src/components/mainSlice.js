import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const DATA_PATH = 'data/songs';
const OPTIONS = {
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

const song1 = {
  id: 'song1Id',
  title: 'song1',
  meta: {
    tempo: 120,
    keySig: 'C',
    timeSig: { top: 4, bottom: 4 }
  },
  sections: [
    { label: 'Verse', content: 'content verse 1'},
    { label: 'Chorus', content: 'content chorus 1'},
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
    { label: 'Verse', content: 'content verse 2'},
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
    { label: 'Verse 1', content: 'content verse 3'},
    { label: 'Chorus 1', content: 'content chorus 3'},
    { label: 'Verse 2', content: 'content verse 3'},
    { label: 'Chorus 2', content: 'content chorus 3'},
  ]
}

const initialState = {
  songs: [song1],//, song2, song3],
  openSong: song1.id,
};


const getSong = (songs, selectedSong) => songs.find(song => {
  return song.id === selectedSong;
});





export const loadSongs = createAsyncThunk(
  'main/loadSongs',
  async () => {
    return fetch(`${DATA_PATH}/songs.json`, OPTIONS)
      .then(songs => { return songs.json(); })
  }
);


export const mainSlice = createSlice({
  name: 'main',
  initialState,
  
  reducers: {
    // Song functions
    createSong: (state, action) => {
      const song = {
        id: Date.now(),
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
    },
    deleteSong: (state, action) => {
      var index = state.songs.map(song => { return song.id }).indexOf(action.payload)
      state.songs.splice(index, 1);
    },
    setOpenSong: (state, action) => { state.openSong = action.payload; },

    // Song parameter functions
    editSongTitle: (state, action) => {
      getSong(state.songs, state.openSong).title = action.payload;
    },
    editSongMeta: (state, action) => {
      getSong(state.songs, state.openSong).meta = action.payload;
    },

    // Song section functions
    addSection: (state, action) => {
      var section = {
        label: 'New Section',
        content: '',
      }
      getSong(state.songs, state.openSong).sections.push(section);
    },
    deleteSection: (state, action) => {
      getSong(state.songs, state.openSong).sections.splice(action.payload, 1)
    },
    editSectionLabel: (state, action) => {
      getSong(state.songs, state.openSong).sections[action.payload.i].label = action.payload.label;
    },
    editSectionContent: (state, action) => {
      getSong(state.songs, state.openSong).sections[action.payload.i].content = action.payload.content;
    },
  },
  // Extra reducers
  extraReducers: builder => {
    builder
      .addCase(loadSongs.pending, state => {
        console.log('Pending');
      })
      .addCase(loadSongs.fulfilled, (state, action) => {
        console.log(action.payload.songs);
        state.songs = action.payload.songs;
      });
  }
});

export const {
  createSong,
  deleteSong,
  setOpenSong,
  
  editSongTitle,
  editSongMeta,
  
  addSection,
  deleteSection,
  editSectionLabel,
  editSectionContent,
} = mainSlice.actions;


// Selectors
export const selectOpenSongId = state => state.main.openSong;
export const selectOpenSong = state => getSong(state.main.songs, state.main.openSong);

export const selectSongNames = state => state.main.songs;



export default mainSlice.reducer;
