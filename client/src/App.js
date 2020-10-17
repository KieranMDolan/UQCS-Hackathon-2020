import React, {useState} from 'react';
import './App.css';
import Main from './components/main/Main';

function App() {
  // const [state, setstate] = useState(initialState)
  return (
    <div className="App">
      <Main />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button>Count up bby</button>
      </header> */}
    </div>
  );
}

export default App;
