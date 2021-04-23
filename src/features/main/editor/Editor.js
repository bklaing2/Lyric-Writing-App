import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  editSongTitle,
  editSongMeta,

  addSection,
  deleteSection,
  editSectionLabel,
  editSectionContent,

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
  const removeSection = i => dispatch(deleteSection(i))


  const editLabel = (label, i) => {
    dispatch(editSectionLabel({ label: prompt('Section Name', label), i: i } ))
  }


  const editContent = (content, i) => {
    dispatch(editSectionContent( { content: content, i: i } ))
  }



  // Other elements
  const sections = song.sections.map((section, i) =>
    <li>
      <label for={`section_${i}`} onClick={() => editLabel(section.label, i)}>{section.label}</label>
      <button onClick={() => removeSection(i)}>-</button>
      <br />

      <textarea id={`section_${i}`}
        name={section.label}
        rows="4" cols="50"
        value={section.content}
        // onBlur={e => updateSectionContent(e.target.value, i)}
        onChange={e => editContent(e.target.value, i)} />
    </li>
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
