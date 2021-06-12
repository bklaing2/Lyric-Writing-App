import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateTitle,

  editTitle,
  editMeta,

  addSection,

  selectSong,
} from '../../../state/songSlice';

import styles from './Editor.module.css';

import Section from './section/Section.js';



export default function Editor() {
  const song = useSelector(selectSong);
  console.log(song);

  const dispatch = useDispatch();


  // Button functions
  const onTitleClick = () => {
    let newTitle = prompt('Title', song.title)
    // dispatch(editTitle(newTitle));
    dispatch(updateTitle({title: newTitle, id: song._id}));
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

    dispatch(editMeta(meta));
  };

  const newSection = () => dispatch(addSection());


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
