import React from 'react';
import { AppBar, Box, InputBase, IconButton } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import SortIcon from '@material-ui/icons/Sort';

const menuBarStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '24ch',
      '&:focus': {
        width: '36ch',
      },
    },
  },
}));

const SearchBar = ({ onChange }) => {
  const classes = menuBarStyles();
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        onChange={onChange}
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
};

const DefaultFunctionalities = [
  <IconButton>
    <SortIcon />
  </IconButton>,
  <IconButton>
    <SortIcon />
  </IconButton>,
];

const defaultOnChange = (e) => console.log(e.target.value);

const MenuBar = ({
  onChangeSearch = defaultOnChange,
  Functionalities = DefaultFunctionalities,
}) => {
  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <SearchBar onChange={onChangeSearch} />
        </Box>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          {Functionalities.map((Func) => Func)}
        </Box>
      </Box>
    </AppBar>
  );
};

export default MenuBar;
