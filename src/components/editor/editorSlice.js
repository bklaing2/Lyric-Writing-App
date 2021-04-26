import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const DATA_PATH = 'data/songs/songs.json';
const OPTIONS = {
  method: 'post',
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },

  body: JSON.stringify({
    test: 'TEST',
  })
};



const initialState = {
  song: {
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
};




export const saveSong = createAsyncThunk(
  'editor/saveSong',
  async song => {
    return fetch(DATA_PATH, OPTIONS)
      .then(songs => { return songs.json(); })
  }
);

export const loadSong = createAsyncThunk(
  'editor/loadSong',
  async song => {
    return fetch(`${DATA_PATH}/${song}.json`, OPTIONS)
      .then(songs => { return songs.json(); })
  }
);


export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  
  reducers: {
    // Song parameter functions
    editTitle: (state, action) => {
      state.song.title = action.payload;
    },
    editMeta: (state, action) => {
      state.song.meta = action.payload;
    },

    // Song section functions
    addSection: (state, action) => {
      var section = {
        label: 'New Section',
        content: '',
      }
      state.song.sections.push(section);
    },
    deleteSection: (state, action) => {
      state.song.sections.splice(action.payload, 1)
    },
    editSectionLabel: (state, action) => {
      state.song.sections[action.payload.i].label = action.payload.label;
    },
    editSectionContent: (state, action) => {
      state.song.sections[action.payload.i].content = action.payload.content;
    },
  },

  // Extra reducers
  extraReducers: builder => {
    builder
      .addCase(saveSong.pending, state => {
        console.log('Pending SAVE');
      })
      .addCase(saveSong.fulfilled, (state, action) => {
        console.log('Fulfilled SAVE');
        // state.song = action.payload;
      })

      .addCase(loadSong.pending, state => {
        console.log('Pending LOAD');
      })
      .addCase(loadSong.fulfilled, (state, action) => {
        console.log('Fulfilled LOAD');
        state.song = action.payload;
      });
  }
});

export const {
  editTitle,
  editMeta,
  
  addSection,
  deleteSection,
  editSectionLabel,
  editSectionContent,
} = editorSlice.actions;


// Selectors
export const selectSong = state => state.editor.song;


export default editorSlice.reducer;
