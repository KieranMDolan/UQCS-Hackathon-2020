import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ServerStyleSheets } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { SERVER } from '../appconstants';
const passiveURL = `${SERVER}resources/passive_items`;

// for retrieving items


export default function UpgradeList(props) {

  function upgradeItem(item) {
    console.log({ item });
    props.socket.current.emit("buy");
  }
  const [passiveItems, setPassiveItems] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await fetch(passiveURL);
      const json = await result.json();
      setPassiveItems(json);
    })();
  }, []);



  //useMemo
  return (
    <List className="list-container">
      {
        passiveItems.map((item) => {
          return (
            <ListItem button component="a" className="list-item" onClick={(event) => { upgradeItem(item._id) }}>
              <ListItemAvatar>
                <Avatar>
                  <FastfoodIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={item.flavour}
              />
            </ListItem>
          )
        })}
    </List>
  )
}
