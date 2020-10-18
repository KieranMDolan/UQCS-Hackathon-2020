import { SERVER } from './appconstants';
import React, { useRef, useState } from 'react';
import './App.css';
import Main from './components/main/Main';
import UpgradeList from './components/UpgradeList';
import socketIOClient from 'socket.io-client';
// const skillURL = `${SERVER}/resources/skill_items`;
// const prestigeURL = `${SERVER}/resources/prestige_items`;
const bodySrc = `${SERVER}images/body.png`;

function App() {
  const [score, setScore] = useState({
    comboCount: 0,
    comboMax: 30,
    scoreFactor: 1,
    baseScore: 1,
    // joules: 0,
  });

  const [joules, setJoules] = useState(0);

  const socketRef = useRef(null);
  // const [state, setState] = useState(null);
  // useEffect(()=> {
  //     (async ()=> {
  //         const result = await fetch(skillURL);
  //         const json = await result.json();
  //         setState(json);
  //     })();

  // }, []);
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
        <Main
          score={score}
          setScore={setScore}
          joules={joules}
          setJoules={setJoules}
        />
        <h1>{joules}JOULES</h1>
        <h2 className="bpm">{score.comboCount}BPM</h2>
      </div>

      <div className="list-container">
        <h2>Upgrades</h2>
        <UpgradeList />
      </div>
    </div>
  );
}

export default App;
