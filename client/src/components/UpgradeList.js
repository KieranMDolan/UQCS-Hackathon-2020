import React, { useEffect, useMemo, useRef, useState, useContext } from 'react';
import { Tooltip, Avatar, List, ListItem, ListItemAvatar, Typography } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { SERVER } from '../appconstants';
import UserContext from './UserContext';
import socket from '../socket';
import useUpgradeList from '../hooks/useUpgradeList';

export default function UpgradeList(props) {

  const user = useContext(UserContext);
  const upgradeList = useUpgradeList();
  function upgradeItem(item) {
    console.log({ item });
    socket.emit("buy", { _id: user._id, item });
    // setUser({ ...user, passive_items: [...user.passive_items, item] });
  }
  function handleSync() {
    const newUser = { ...user };
    newUser.joules = props.joules;
    socket.emit("update", newUser);
  }

  return (
    <List className="list-container">
      {
        upgradeList.map((item) => {
          //Abstract out
          return (
            <div key={item._id}>
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
            </div>
          )
        })}
      <button onClick={handleSync} className="buttons">
        Sync
      </button>
    </List>
  )
}
