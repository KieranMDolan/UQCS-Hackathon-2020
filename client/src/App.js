import { SERVER } from 'appconstants';
import React, { useRef, useEffect } from 'react';
import './App.css';
import Main from './components/main/Main';
import UpgradeList from './components/UpgradeList';
import socketIOClient from "socket.io-client";

const bodySrc = `${SERVER}images/body.png`

function App() {
  const socketRef = useRef(null);
  useEffect(()=> {
    socketRef.current = socketIOClient(SERVER);
    const sock = socketRef.current;
  }, []);

  return (

    <div className="App">
      <img className="body" src={bodySrc} />

      <div className="playing-container">
        <h2 className="now-playing">Now playing...</h2>
        <div className="skill-container">
          <h3>Skills</h3>
          <button className="skill-button">Count up bby</button>
          <button className="skill-button">Count up bby</button>
          <button className="skill-button">Count up bby</button>
          <button className="skill-button">Count up bby</button>
        </div>

      </div>

      <div className="game-container">
        <Main />
        <h2 className="bpm">BPM</h2>
      </div>
      <UpgradeList />
    </div>
  );
}

export default App;
