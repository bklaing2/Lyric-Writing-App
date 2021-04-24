import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Section } from './section/Section.js'

import {
  editSongTitle,
  editSongMeta,

  addSection,

  selectSelectedSong,
} from '../mainSlice';
import styles from './Editor.module.css';

export function Editor() {
  const song = useSelector(selectSelectedSong);

  const dispatch = useDispatch();


  // Button functions
  const editTitle = () => {
    dispatch(editSongTitle(prompt('Title', song.title)));
  }

  const editMeta = () => {
    var meta = {
      tempo: prompt('Tempo', song.meta.tempo),
      keySig: prompt('Key Signature', song.meta.keySig),
      timeSig: {
        top: prompt('Time Signature Top', song.meta.timeSig.top),
        bottom: prompt('Time Signature Bottom', song.meta.timeSig.bottom)
      },
    };

    dispatch(editSongMeta(meta));
  };


  const newSection = () => dispatch(addSection());


  // Other elements
  const sections = song.sections.map((section, i) =>
    <Section key={i} section={section} i={i} />
  );
  

  // Main elements
  return (
    <section className={styles.container}>
      <h2 onClick={editTitle}>
        {song.title}
      </h2>

      <div className={styles.meta} onClick={editMeta}>
        {song.meta.tempo} {song.meta.keySig} {song.meta.timeSig.top}/{song.meta.timeSig.bottom}
      </div>

      <ul className={styles.sections}>
        {sections}
      </ul>

      <button onClick={newSection}>+</button>
    </section>
  );
}
