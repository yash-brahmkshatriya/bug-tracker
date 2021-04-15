import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
  ListItemText,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { getRandomColor } from './projDetStyles';
import DeleteIcon from '@material-ui/icons/Delete';

const PersonItem = ({ person, deletable = false, key, openDialog }) => {
  const theme = useTheme();

  const onDeleteClick = () => openDialog(person.email);

  let names = person.name.split(' ');
  let initials = names[0].charAt(0).toUpperCase();
  if (names.length > 1)
    initials += names[names.length - 1].charAt(0).toUpperCase();

  const avatarStyles = {
    color: theme.palette.getContrastText(getRandomColor()),
    backgroundColor: getRandomColor(),
  };
  return (
    <ListItem alignItems="flex-start" key={key}>
      <ListItemAvatar>
        <Avatar style={avatarStyles}>{initials}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={person.name} secondary={person.email} />
      {deletable ? (
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={onDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      ) : null}
    </ListItem>
  );
};

export default PersonItem;
