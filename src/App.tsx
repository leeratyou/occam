import React from 'react';
import logo from './logo.svg';
import './App.css';

import List from './components/List'

const data = Array.from(Array(1000).keys(), item => String(item))

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        
        <List<string>
          data={data}
          keyExtractor={(item) => item}
          renderItem={(item) => <div>{item}</div>}
        />
      </header>
    </div>
  );
}

export default App;
