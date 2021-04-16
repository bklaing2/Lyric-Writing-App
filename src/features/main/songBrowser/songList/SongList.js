import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSong,
  selectSongs,
  // selectSongNames,
  selectSelectedSong,
} from '../../mainSlice';
import styles from './SongList.module.css';

export function SongList() {
  const dispatch = useDispatch();

  const songs = useSelector(selectSongs).map((song) =>
    <li onClick={() => dispatch(selectSong(song.id))}>{song.title}</li>
  );
  const selectedSong = useSelector(selectSelectedSong);

  return (
    <ul>
      {songs}
    </ul>
  );
}
