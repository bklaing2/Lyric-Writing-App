import React from 'react';
import styles from './Song.module.css';


export default function Song(props) {

  return (
    <li className={props.selected ? styles.selected : null} onClick={props.onClick}>
      {props.children}
    </li>
  );
}
