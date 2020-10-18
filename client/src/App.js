
import { SERVER } from './appconstants';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import './App.css';
import Main from './components/main/Main';
import UpgradeList from './components/UpgradeList';
import socketIOClient from "socket.io-client";
import ReactAudioPlayer from 'react-audio-player';

// const skillURL = `${SERVER}/resources/skill_items`;
// const prestigeURL = `${SERVER}/resources/prestige_items`;
import UserContext from './components/UserContext';
const bodySrc = `${SERVER}images/body.png`
const songSrc = `${SERVER}/music.ogg`;
const passiveURL = `${SERVER}resources/passive_items`;

function App() {
  const socketRef = useRef(null);
  const [user, setUser] = useState(null);

  const [score, setScore] = useState({
    comboCount: 0,
    comboMax: 30,
    scoreFactor: 1,
    baseScore: 1,
    // joules: 0,
  });

  const [passiveItems, setPassiveItems] = useState([]);

  const [joules, setJoules] = useState(0);
  useEffect(() => {
    (async () => {
      const result = await fetch(passiveURL);
      const json = await result.json();
      setPassiveItems(json);
    })();
    socketRef.current = socketIOClient(SERVER);
    const sock = socketRef.current;
    sock.on('initial', (user) => {
      console.log(user);
      setUser(user);
    });
    sock.emit('login', "anhad");
  }, []);

  const providerValue = useMemo(() => {
    return {
      user,
      setUser,
      upgradeList: null
  }
  }, [user, setUser]); //Only recomputes as object when logintoken or setLogintoken change

  return (
    <UserContext.Provider value={providerValue}>
      <div className="App">

        <img className="body" src={bodySrc} />


        <div className="playing-container">
          <ReactAudioPlayer
            src={songSrc}
            autoPlay
          />
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
          <h2 className="bpm">{score.combo}</h2>
          
          <h2 className="bpm">{score.comboCount}</h2>
          <h2 className="bpm">BPM</h2>
          <h3>x{score.comboCount}</h3>
        </div>

        <div className="list-container">
          <h2>Upgrades</h2>
          <UpgradeList socket={socketRef} passiveItems={passiveItems}/>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
