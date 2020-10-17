import React from 'react'
import { Avatar, List, ListItem, ListItemAvatar } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';

// for retrieving items
function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

export default function UpgradeList() {
    return (
        <List className="list-container" dense="true">
        {generate(
          <ListItem className="list-item">
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Single-line item"
            />
          </ListItem>,
        )}
      </List>
    )
}
