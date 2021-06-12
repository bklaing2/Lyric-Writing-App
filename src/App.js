import React from 'react';
import { Link } from 'react-router-dom';

import './App.css';

import Header from './sharedComponents/header/Header.js';
import Browser from './pages/editSong/browser/Browser';
import Editor from './pages/editSong/editor/Editor';



function App() {

  return (
    <div className='App'>
      {/* <Link to={"/test"}>
        TEST
      </Link> */}
      <header>
        {/* Logo */}
        <h1>Header</h1>
      </header>

      <main>
        <Browser />
        <Editor />
      </main>

      {/* <footer>
        footer
      </footer> */}
    </div>
  );
}

export default App;
