import React from 'react';

import './App.css';

import Browser from './components/browser/Browser';
import Editor from './components/editor/Editor';


function App() {

  return (
    <div className='App'>
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
