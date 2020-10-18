import React, { useEffect, useMemo, useRef, useState, useContext } from 'react';
import { Tooltip, Avatar, List, ListItem, ListItemAvatar, ServerStyleSheets } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { SERVER } from '../appconstants';
import UserContext from './UserContext';

export default function UpgradeList(props) {

  const { user, setUser } = useContext(UserContext);

  function upgradeItem(item) {
    console.log({ item });
    props.socket.current.emit("buy", { _id: user._id, item });
    setUser({ ...user, passive_items: [...user.passive_items, item] });
  }


  //useMemo
  return (
    <List className="list-container">
      {
        props.passiveItems.map((item) => {
          return (
            <Tooltip title={item.flavour} >
              <ListItem button component="a" className="list-item" onClick={(event) => { upgradeItem(item._id) }}>
                <ListItemAvatar>
                  <Avatar>
                    <FastfoodIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                />
              </ListItem>
            </Tooltip>
          )
        })}
    </List>
  )
}
