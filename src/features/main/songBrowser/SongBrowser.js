import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SongList } from './songList/SongList';
import {
  createNewSong,
} from '../mainSlice';
import styles from './SongBrowser.module.css';

const song = {
  id: Date.now(),
  title: 'test',
  meta: {
    tempo: 120,
    keySig: 'C',
    timeSig: { top: 4, bottom: 4 }
  },
  sections: [
    // { label: 'Verse', lines: ['line 1', 'line 2', 'line 3'] },
    // { label: 'Chorus', lines: ['line 1', 'line 2'] },
  ]
}

export function SongBrowser() {
  const dispatch = useDispatch();

  return (
    <section className={styles.container}>

      <div className={styles.header}>
        <h2>
          Song Browser
          <button onClick={() => dispatch(createNewSong(song))}>+</button>
        </h2>
      </div>

      <SongList />
    </section>
  );
}
