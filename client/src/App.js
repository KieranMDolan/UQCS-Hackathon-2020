import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import NavigationBar from './components/NavBar';
import PersistentDrawerRight from './components/SideBar'
import { makeStyles } from '@material-ui/core/styles';
import body from './images/body.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  heart: {
    marginRight: "35vw"
  },
  body: {
    marginLeft: "auto",
    height: "45vw"
  }
})); 

function App() {
  const classes = useStyles();
  
  return (

    <div className="App">
      <NavigationBar></NavigationBar>
      <div className="main">
        <div className=""></div>

        <header className="App-header">
          <button className={classes.heart}>Count up bby</button>
          <img className={classes.body} src={body}/>
        </header>

      </div>


    </div>
  );
}

export default App;
