import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteSection,
  editSectionLabel,
  editSectionContent,

  updateSection,
} from '../../../../state/songSlice';

import styles from './Section.module.css';


export default function Section(props) {
  const section = props.section;
  const i = props.i;
  const song = props.song;

  const [content, setContent] = useState(section.content);

  const dispatch = useDispatch();


  const update = (type, data) => {
    dispatch(updateSection({
      id: song,
      i: i,
      type: type,
      data: data
    }))
  }


  // Button functions
  const removeSection = () => dispatch(deleteSection({id: song, i: i}));





  const onLabelClick = () => {
    update('label', prompt('Label', section.label));
  }

  const onContentExit = () => {
    update('content', content);
  }

  const editLabel = () => {
    dispatch(editSectionLabel({ label: prompt('Section Name', section.label), i: i } ))
  }

  const editContent = () => {
    console.log('Exited section');
    dispatch(editSectionContent( { content: content, i: i } ))
  }
  

  // Main elements
  return (
    <li>
      <label htmlFor={`section_${i}`} onClick={onLabelClick}>{section.label}</label>
      <button onClick={removeSection}>-</button>
      <br />

      <textarea id={`section_${i}`} name={section.label}
        rows="4" cols="50"
        value={content}
        onChange={e => setContent(e.target.value)}
        onBlur={onContentExit} />
    </li>
  );
}
