import { Avatar, List, ListItem, ListItemAvatar } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import React, { useContext, useEffect, useState } from 'react';
import { SERVER } from '../appconstants';
import UserContext from './UserContext';
const passiveURL = `${SERVER}resources/passive_items`;

export default function UpgradeList(props) {

  const { user, setUser } = useContext(UserContext);

  function upgradeItem(item) {
    console.log({ item });
    props.socket.current.emit("buy", {_id: user._id, item});
    setUser({...user, passive_items: [...passiveItems, item]});
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
