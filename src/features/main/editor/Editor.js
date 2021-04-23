import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  editSongTitle,
  editSongMeta,
  addSongSection,
  editSectionLabel,
  editSectionContent,
  selectSelectedSong,
} from '../mainSlice';
import styles from './Editor.module.css';

export function Editor() {
  const song = useSelector(selectSelectedSong);

  const [incrementAmount, setIncrementAmount] = useState('2');

  const dispatch = useDispatch();


  const editTitle = () => {
    var title = prompt('Title', song.title);
    dispatch(editSongTitle(title));
  }

  const editMeta = () => {
    var tempo = prompt('Tempo', song.meta.tempo);
    var keySig = prompt('Key Signature', song.meta.keySig);
    var timeSigTop = prompt('Time Signature Top', song.meta.timeSig.top);
    var timeSigBottom = prompt('Time Signature Bottom', song.meta.timeSig.bottom);

    tempo = (tempo == null || tempo == '') ? song.meta.tempo : tempo;
    keySig = (keySig == null || keySig == '') ? song.meta.keySig : keySig;
    timeSigTop = (timeSigTop == null || timeSigTop == '') ? song.meta.timeSig.top : timeSigTop;
    timeSigBottom = (timeSigBottom == null || timeSigBottom == '') ? song.meta.timeSig.bottom : timeSigBottom;

    var newMeta = {
      tempo: tempo,
      keySig: keySig,
      timeSig: { top: timeSigTop, bottom: timeSigBottom }
    };

    dispatch(editSongMeta(newMeta));
  };


  const updateSectionContent = (content, i) => {
    dispatch(editSectionContent( { content: content, i: i } ))
  }



  // Other elements
  const sections = song.sections.map((section, i) =>
    <li>
      <label for={`section_${i}`} onClick={() => dispatch(editSectionLabel({ label: prompt('Tempo', section.label), i: i } ))}>{section.label}</label>
      <textarea id={`section_${i}`}
        name={section.label}
        rows="4" cols="50"
        value={section.content}
        // onBlur={e => updateSectionContent(e.target.value, i)}
        onChange={e => updateSectionContent(e.target.value, i)} />
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

      <p onClick={() => dispatch(addSongSection())}>+</p>
    </section>
  );
}
