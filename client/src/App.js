
import { SERVER, formatNumber } from './appconstants';
import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import './App.css';
import Main from './components/main/Main';
import UpgradeList from './components/UpgradeList';
import socketIOClient from "socket.io-client";
import ReactAudioPlayer from 'react-audio-player';


import UserContext from './components/UserContext';
const bodySrc = `${SERVER}images/body.png`
const hospitalSrc = `${SERVER}images/hospital.png`
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
  });

  const [passiveItems, setPassiveItems] = useState([]);
  const [joules, setJoules] = useState(0);

  const providerValue = useMemo(() => {
    let sumItems = {};
    if (user) {
      sumItems = passiveItems.reduce((acc, curr) => {
        const id = curr._id;
        const itemCount = user.passive_items.reduce((sum, item) => (item === id) ? sum + 1 : sum, 0);
        acc[curr._id] = itemCount;
        return acc;
      }, {});
    }
    const upgradeList = passiveItems.map((item) => {
      const newItem = { ...item };
      newItem.count = sumItems[newItem._id];
      return newItem;
    });
    const totalJps = upgradeList.reduce((acc, curr) => acc + curr.count * curr.jps, 0);
    console.log({ totalJps });
    return {
      user,
      setUser,
      upgradeList,
      totalJps
    }
  }, [user, setUser, passiveItems]); //Only recomputes as object when dependancies change

  const JPS = useRef(0);
  useEffect(() => {
    JPS.current = !!providerValue.totalJps ? providerValue.totalJps : 0;
    // console.log(`Ressetting JPS: ${providerValue.totalJps} and ref: ${JPS.current}`);
  }, [providerValue]);
  const updateJPS = () => {
    // console.log(`runnning update ${JPS.current}`)
    setJoules(prevJoules => Math.floor(prevJoules + JPS.current));
  }

  // const updateJPS = useMemo(() => {
  //   console.log(`Function ran now joules: ${joules} , ${providerValue.totalJps}`);
  //   const jps = providerValue.totalJps;
  //   return () => {
  //     console.log({ jps });
  //     setJoules(prevJoules => {
  //       return Math.floor(prevJoules + providerValue.totalJps)
  //     })
  //   }
  // }, [providerValue.totalJps])

  // const updateJPS = ()=>{
  //   console.log({providerValue})
  //   setJoules(prevJoules=>Math.floor(prevJoules + providerValue.totalJps))
  // };

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
      // setUser(user);
      setJoules(user.joules);
    });
    sock.emit('login', "anhad");

    const jpsTimer = setInterval(updateJPS, 1000);
    return () => {
      clearInterval(jpsTimer);
    }
  }, []);

  // useEffect(() => {
  //   console.log("Function ran");
  //   const jpsTimer = setInterval(() => {
  //     setJoules(prevJoules=>Math.floor(prevJoules + providerValue.totalJps))
  //   }, 1000);
  //   //Potential way to combat is to have more granular timer
  //   return () => clearInterval(jpsTimer);
  // }, [providerValue.totalJps]);

  // setInterval(() => {
  //   console.log("update jps")
  //   setJoules(prevJoules=>Math.floor(prevJoules + providerValue?.totalJps))
  // }, 1000);


  // let joulesPerSecond = 0;

  // if (user) {
  //   const { upgradeList } = providerValue;
  //   upgradeList.forEach((item) => {
  //     console.log(item);$
  //     let temp = 0.02 * item.count * item.jps;
  //     joulesPerSecond += temp;
  //   });
  // }
  // setInterval(() => { setJoules(Math.floor(joules + )) }, 1000);

  return (
    <UserContext.Provider value={providerValue}>
      <div className="App">
        <img className="body" src={bodySrc} />
        <div className="playing-container">
          <ReactAudioPlayer
            src={songSrc}
            autoPlay
          />
          <h2 className="now-playing">Now playing</h2>
          <div className="skill-container">
            <h3>Skills</h3>
            <button className="skill-button">Defibrillator</button>
            <button className="skill-button">Buffet</button>
            <button className="skill-button">Sugar Rush</button>
            <button className="skill-button">Pacemaker</button>
          </div>

        </div>

        <div className="game-container">
          <Main
            score={score}
            setScore={setScore}
            joules={joules}
            setJoules={setJoules}
          />

          <h2 className="bpm">{providerValue.totalJps}J/s</h2>
          <h2 className="bpm">x{score.comboCount}</h2>
          <h1>{formatNumber(joules)}JOULES</h1>

          <h2 className="bpm">BPM</h2>
        </div>

        <div className="list-container">
          <h2>Upgrades</h2>
          <UpgradeList socket={socketRef} passiveItems={passiveItems} joules={joules} />

        </div>

      </div>
    </UserContext.Provider>
  );
}

export default App;
