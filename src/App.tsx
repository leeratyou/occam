import React from 'react'
import logo from './logo.svg'
import './App.css'

import List from './components/List'

const data = Array.from(Array(25).keys(), item => String(item))

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Example of custom-made virtualized list
        </p>
        
        <List<string>
          rowHeight={50}
          data={data}
          keyExtractor={(item) => item}
          renderItem={(item) => <div>{item}</div>}
          overscan={2}
          before={<div>before</div>}
          after={<div>after</div>}
        />
        
        <div>Some other element after list</div>
      </header>
    </div>
  )
}

export default App
