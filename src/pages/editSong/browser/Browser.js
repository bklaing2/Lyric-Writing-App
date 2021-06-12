import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadSongs,

  loadSong,
  // saveSong,

  createSong,
  setOpenSong,

  selectOpenSong,
  selectSongs,
} from '../../../state/songSlice';

import styles from './Browser.module.css';

import Song from './song/Song';



export default function Browser() {
  
  // Setup
  const openSong = useSelector(selectOpenSong);
  const songs = useSelector(selectSongs);

  const dispatch = useDispatch();
  useEffect(() => dispatch(loadSongs()), []);


  // Button functions
  const newSong = () => dispatch(createSong());

  const onSongClick = song => {
    // dispatch(saveSong());
    dispatch(setOpenSong(song));
    dispatch(loadSong(song));
  }


  // Other elements
  const songList = songs.map((song, i) =>
    <Song
      key={song._id}
      selected={song._id === openSong}
      onClick={() => onSongClick(song._id)}>

      {song.title}
    </Song>
  );


  // Main elements
  return (
    <section className={styles.container}>

      <div className={styles.header}>
        <h2>
          My Songs
          <button onClick={newSong}>+</button>
        </h2>
      </div>

      <ul>
        {songList}
      </ul>
    </section>
  );
}
