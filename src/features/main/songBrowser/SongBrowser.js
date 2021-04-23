import React from 'react';
import { useDispatch } from 'react-redux';
import { SongList } from './songList/SongList';
import {
  createSong,
} from '../mainSlice';
import styles from './SongBrowser.module.css';


export function SongBrowser() {
  const dispatch = useDispatch();

  const newSong = () => dispatch(createSong());

  return (
    <section className={styles.container}>

      <div className={styles.header}>
        <h2>
          Song Browser
          <button onClick={newSong}>+</button>
        </h2>
      </div>

      <SongList />
    </section>
  );
}
