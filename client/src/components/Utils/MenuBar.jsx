import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  InputBase,
  IconButton,
  Select,
  useMediaQuery,
  useTheme,
  MenuItem,
} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import SortIcon from '@material-ui/icons/Sort';
import { useDebounce } from './utilFuncs';

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
    width: '12ch',
    [theme.breakpoints.up('sm')]: {
      width: '24ch',
      '&:focus': {
        width: '36ch',
      },
    },
  },
}));

const SearchBar = ({ onChange, searchOptions }) => {
  // is searchoptions empty, do required
  const [inpVal, setInpVal] = useState('');
  const [searchOption, setSearchOption] = useState(searchOptions[0].value);
  const debouncedInpVal = useDebounce(inpVal, 500);
  useEffect(() => {
    onChange(debouncedInpVal, searchOption);
  }, [debouncedInpVal]);

  const classes = menuBarStyles();
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        onChange={(e) => setInpVal(e.target.value)}
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
      <Select
        labelId="search-by-menu"
        id="search-by"
        value={searchOption}
        onChange={(e) => setSearchOption(e.target.value)}
        disableUnderline
      >
        {searchOptions.map((opt) => (
          <MenuItem value={opt.value}>{opt.name}</MenuItem>
        ))}
      </Select>
    </div>
  );
};

const DefaultFunctionalities = [
  <IconButton>
    <SortIcon />
  </IconButton>,
];

const defaultSearchOptions = [
  {
    name: 'Name',
    value: 'name',
  },
  {
    name: 'Tag',
    value: 'tags',
  },
];

const defaultOnChange = (e) => console.log(e?.target?.value);

const MenuBar = ({
  onChangeSearch = defaultOnChange,
  Functionalities = DefaultFunctionalities,
  searchOptions = defaultSearchOptions,
}) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={isSmall ? 'column' : 'row'}
      >
        <Box>
          <SearchBar onChange={onChangeSearch} searchOptions={searchOptions} />
        </Box>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          {Functionalities.map((Func) => Func)}
        </Box>
      </Box>
    </AppBar>
  );
};

export default MenuBar;
