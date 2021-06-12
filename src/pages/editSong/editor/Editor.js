import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateSong,

  addSection,

  selectSong,
} from '../../../state/songSlice';

import styles from './Editor.module.css';

import Section from './section/Section.js';



export default function Editor() {
  const song = useSelector(selectSong);
  console.log(song);

  const dispatch = useDispatch();

  const update = (type, data) => {
    dispatch(updateSong({
      id: song._id,
      type: type,
      data: data
    }))
  }


  // Button functions
  const onTitleClick = () => {
    update('title', prompt('Title', song.title));
  }

  const onMetaClick = () => {
    var meta = {
      tempo: prompt('Tempo', song.meta.tempo),
      keySig: prompt('Key Signature', song.meta.keySig),
      timeSig: {
        top: prompt('Time Signature Top', song.meta.timeSig.top),
        bottom: prompt('Time Signature Bottom', song.meta.timeSig.bottom)
      },
    };

    update('meta', meta);
  };

  const newSection = () => dispatch(addSection(song._id));


  // Other elements
  const sections = song.sections.map((section, i) =>
    <Section key={`${song.id}_${i}`} section={section} i={i} />
  );
  

  // Main elements
  return (
    <section className={styles.container}>
      <h2 onClick={onTitleClick}>
        {song.title}
      </h2>

      <div className={styles.meta} onClick={onMetaClick}>
        {song.meta.tempo} {song.meta.keySig} {song.meta.timeSig.top}/{song.meta.timeSig.bottom}
      </div>

      <ul className={styles.sections}>
        {sections}
      </ul>

      <button onClick={newSection}>+</button>
    </section>
  );
}
