import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  editSongTitle,
  editSongMeta,
  addSongSection,
  selectSelectedSong,
} from '../mainSlice';
import styles from './Editor.module.css';

export function Editor() {
  const song = useSelector(selectSelectedSong);

  console.log(song);

  const lines = (lines) => lines.map((line) => 
    <li>{line}</li>
  );
  const sections = song.sections.map((section) =>
    <li>
      <h3>{section.label}</h3>
      
      <ul>{lines(section.lines)}</ul>
    </li>
  );
  const dispatch = useDispatch();
  // const [incrementAmount, setIncrementAmount] = useState('2');

  // const incrementValue = Number(incrementAmount) || 0;

  const editTitle = () => {
    var title = prompt('Title', song.title);
    dispatch(editSongTitle(title));
  ;}

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

  return (
    <section className={styles.container}>
      <h2 onClick={editTitle}>
        {song.title}
      </h2>

      <div className={styles.meta} onClick={editMeta}>
        {song.meta.tempo} {song.meta.keySig} {song.meta.timeSig.top}/{song.meta.timeSig.bottom}
      </div>

      <ul className={styles.sections} onClick={() => dispatch(addSongSection({label: 'test', lines: []}))}>
        {sections}
      </ul>
    </section>
  );
}
