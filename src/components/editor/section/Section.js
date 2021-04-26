import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteSection,
  editSectionLabel,
  editSectionContent,
} from '../editorSlice';

import styles from './Section.module.css';


export default function Section(props) {
  const section = props.section;
  const i = props.i;

  const [content, setContent] = useState(section.content);

  const dispatch = useDispatch();


  // Button functions
  const removeSection = () => dispatch(deleteSection(i))

  const editLabel = () => {
    dispatch(editSectionLabel({ label: prompt('Section Name', section.label), i: i } ))
  }

  const editContent = () => {
    dispatch(editSectionContent( { content: content, i: i } ))
  }
  

  // Main elements
  return (
    <li>
      <label htmlFor={`section_${i}`} onClick={editLabel}>{section.label}</label>
      <button onClick={removeSection}>-</button>
      <br />

      <textarea id={`section_${i}`} name={section.label}
        rows="4" cols="50"
        value={content}
        onChange={e => setContent(e.target.value)}
        onBlur={editContent} />
    </li>
  );
}
