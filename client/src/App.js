import { Avatar, List, ListItem, ListItemAvatar } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import React, { useEffect, useState } from 'react';
import './App.css';
import Main from './components/main/Main';
import body from './images/body.png';

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

function App() {
  // scoring variables
  const [score, setScore] = useState({
    comboCount: 0,
    comboMax: 30,
    scoreFactor: 1,
    baseScore: 1,
    // joules: 0,
  });

  const [joules, setJoules] = useState(0);

  return (
    <div className="App">
      <img className="body" src={body} />

      <div className="skill-container">
        <h3>Skills</h3>
        <button className="skill-button">Count up bby</button>
        <button className="skill-button">Count up bby</button>
        <button className="skill-button">Count up bby</button>
        <button className="skill-button">Count up bby</button>
      </div>

      <div className="game-container">
        <h1>{joules}JOULES</h1>
        <h2 className="bpm">{score.comboCount}BPM</h2>
      </div>

      <List className="list-container" dense="true">
        {generate(
          <ListItem className="list-item">
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Single-line item" />
          </ListItem>
        )}
      </List>
      <Main score={score} setScore={setScore} joules={joules} setJoules={setJoules} />
    </div>
  );
}

export default App;
