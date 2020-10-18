import React, { useEffect, useMemo, useRef, useState, useContext } from 'react';
import { Tooltip, Avatar, List, ListItem, ListItemAvatar, Typography } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { SERVER } from '../appconstants';
import UserContext from './UserContext';

export default function UpgradeList(props) {

  const { user, setUser, upgradeList } = useContext(UserContext);

  function upgradeItem(item) {
    console.log({ item });
    props.socket.current.emit("buy", { _id: user._id, item });
    setUser({ ...user, passive_items: [...user.passive_items, item] });
  }
  function handleSync() {
    const newUser = {...user};
    newUser.joules = props.joules;
    props.socket.current.emit("update", newUser);  
  }

  return (
    <List className="list-container">
      {
        upgradeList.map((item) => {
          return (
            <Tooltip title={item.flavour} >
              <ListItem button component="a" className="list-item" onClick={(event) => { upgradeItem(item._id) }}>
                <ListItemAvatar>
                  <Avatar src={`${SERVER}images/${item.image}`}>
                    <FastfoodIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography>{item.name}</Typography>}
                />
                <Typography variant="h6">
                [{item.count}]
                </Typography>
              </ListItem>
            </Tooltip>
          )
        })}
      <button onClick={handleSync} className="buttons">
        Sync
          </button>
    </List>
  )
}
