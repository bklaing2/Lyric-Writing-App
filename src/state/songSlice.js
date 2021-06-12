import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import songDataService from "../services/song.service";


const initialState = {
  songs: [],
  openSong: null,
  song: {
    id: 'TEMP',
    title: 'TEMP',
    meta: {
      tempo: 120,
      keySig: 'C',
      timeSig: { top: 4, bottom: 4 }
    },
    sections: [
      { label: 'TEMP', content: 'TEMP'},
    ]
  }
};



// Async
export const loadSong = createAsyncThunk(
  'song/loadSong',
  async song => {
    const res = await songDataService.getSong(song);
    return res.data;
  }
);

export const updateTitle = createAsyncThunk(
  'song/updateTitle',
  async data => {
    console.log(data.title);
    console.log(data.id);
    const res = await songDataService.updateTitle(data.id, data.title);
    return res.data;
  }
);

export const updateMeta = createAsyncThunk(
  'song/updateMeta',
  async (meta, id) => {
    const res = await songDataService.updateMeta(meta);
    return res.data;
  }
);


export const loadSongs = createAsyncThunk(
  'song/loadSongs',
  async () => {
    const res = await songDataService.getSongs();
    return res.data;
  }
);


export const createSong = createAsyncThunk(
  'song/createSong',
  async () => {
    const song = {
      title: 'New Song',
      meta: {
        tempo: 120,
        keySig: 'C',
        timeSig: { top: 4, bottom: 4 }
      },
      sections: []
    }

    const res = await songDataService.createSong(song);
    return { _id: res.data, title: song.title };
  }
);


// Main slice
export const songSlice = createSlice({
  name: 'song',
  initialState,
  
  // Reducers
  reducers: {
    setOpenSong: (state, action) => { state.openSong = action.payload; },

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
      .addCase(loadSong.pending, state => {
        console.log('LOAD SONG: pending');
      })
      .addCase(loadSong.fulfilled, (state, action) => {
        console.log('LOAD SONG: fulfilled');
        state.song = action.payload;
      })

      .addCase(updateTitle.pending, state => {
        console.log('UPDATE TITLE: pending');
      })
      .addCase(updateTitle.fulfilled, (state, action) => {
        console.log('UPDATE TITLE: fulfilled');
        
        state.song.title = action.payload.title;
        var song = state.songs.find(song => { return song._id === action.payload.id });
        song.title = action.payload.title;
      })

      .addCase(updateMeta.pending, state => {
        console.log('UPDATE META: pending');
      })
      .addCase(updateMeta.fulfilled, (state, action) => {
        console.log('UPDATE META: fulfilled');
      })
      
      .addCase(loadSongs.pending, state => {
        console.log('LOAD SONGS: pending');
      })
      .addCase(loadSongs.fulfilled, (state, action) => {
        console.log('LOAD SONGS: fulfilled');
        state.songs = action.payload;
      })
      
      .addCase(createSong.pending, state => {
        console.log('CREATE SONG: pending');
      })
      .addCase(createSong.fulfilled, (state, action) => {
        console.log('CREATE SONG: fulfilled');
        state.songs.push(action.payload);
      })
  }
});


// Selectors
export const selectOpenSong = state => state.song.openSong;
export const selectSong = state => state.song.song;
export const selectSongs = state => state.song.songs;



// Exports
export default songSlice.reducer;

export const {
  setOpenSong,

  editTitle,
  editMeta,
  
  addSection,
  deleteSection,
  editSectionLabel,
  editSectionContent,
} = songSlice.actions;