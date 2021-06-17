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


export const updateSong = createAsyncThunk(
  'song/updateSong',
  async ({id, type, data}) => {
    console.log(`UPDATE SONG::\tid:${id},\ttype:${type},\tdata:${data}`);
    const res = await songDataService.updateSong(id, type, data);
    return res.data;
  }
);


export const addSection = createAsyncThunk(
  'song/addSection',
  async id => {
    var data = {label: 'New Section', content: 'TEMP'};
    console.log(`ADD SECTION::\tid:${id},\tdata:${data}`);
    const res = await songDataService.addSongSection(id, data);
    return res.data;
  }
);

export const deleteSection = createAsyncThunk(
  'song/deleteSection',
  async ({id, i}) => {
    console.log(`DELETE SECTION::\tid:${id},\i:${i}`);
    const res = await songDataService.deleteSongSection(id, i);
    return res.data;
  }
);

export const updateSection = createAsyncThunk(
  'song/updateSection',
  async ({id, i, type, data}) => {
    console.log(`UPDATE SECTION::\tid:${id},\ti:${i}\ttype:${type},\tdata:${data}`);
    const res = await songDataService.updateSongSection(id, i, type, data);
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

export const deleteSong = createAsyncThunk(
  'song/deleteSong',
  async id => {
    console.log(id);
    const res = await songDataService.deleteSong(id);
    return { _id: res.data };
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

    // Song section functions
    // addSection: (state, action) => {
    //   var section = {
    //     label: 'New Section',
    //     content: '',
    //   }
    //   state.song.sections.push(section);
    // },
    // deleteSection: (state, action) => {
    //   state.song.sections.splice(action.payload, 1)
    // },
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

      .addCase(updateSong.pending, state => {
        console.log('UPDATE SONG: pending');
      })
      .addCase(updateSong.fulfilled, (state, action) => {
        console.log('UPDATE SONG: fulfilled');
        state.song[action.payload.type] = action.payload.data;

        if (action.payload.type === 'title') {
          var song = state.songs.find(song => { return song._id === action.payload.id });
          song.title = action.payload.data;
        }
      })

      .addCase(addSection.pending, state => {
        console.log('ADD SECTION: pending');
      })
      .addCase(addSection.fulfilled, (state, action) => {
        console.log('ADD SECTION: fulfilled');
        state.song.sections.push(action.payload.data);
      })

      .addCase(deleteSection.pending, state => {
        console.log('DELETE SECTION: pending');
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        console.log('DELETE SECTION: fulfilled');
        console.log(action.payload);
        state.song.sections.splice(action.payload.data, 1);
      })

      .addCase(updateSection.pending, state => {
        console.log('UPDATE SECTION: pending');
      })
      .addCase(updateSection.fulfilled, (state, action) => {
        console.log('UPDATE SECTION: fulfilled');
        state.song.sections[action.payload.i][action.payload.type] = action.payload.data;
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

      .addCase(deleteSong.pending, state => {
        console.log('DELETE SONG: pending');
      })
      .addCase(deleteSong.fulfilled, (state, action) => {
        console.log('DELETE SONG: fulfilled');
        // state.songs.push(action.payload);
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
  
  // addSection,
  // deleteSection,
  editSectionLabel,
  editSectionContent,
} = songSlice.actions;