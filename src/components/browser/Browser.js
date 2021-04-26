import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadSongs,

  selectOpenSong,
  selectSongs,

  createSong,
  setOpenSong,
} from './browserSlice';
import { saveSong, loadSong } from '../editor/editorSlice';

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
    // dispatch(saveSong(openSong));
    dispatch(setOpenSong(song));
    dispatch(loadSong(song));
  }


  // Other elements
  const songList = songs.map((song, i) =>
    <Song
      key={song.id}
      selected={song.id === openSong}
      onClick={() => onSongClick(song.id)}>

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
