import React from 'react';
import './App.css';
import body from './assets/body.png';
import Main from './components/main/Main';
import UpgradeList from './components/UpgradeList';


function App() {
  return (

    <div className="App">
      <img className="body" src={body} />

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

      <UpgradeList></UpgradeList>


    </div>
  );
}

export default App;
