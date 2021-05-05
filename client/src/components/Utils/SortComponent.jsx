import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useParams, useHistory } from 'react-router-dom';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  useMediaQuery,
  List,
  Divider,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { getDashBoardDetails, exploreProjects } from '../../redux/actions';
import SearchResultItem from '../Project/SearchResultItem';
import ThreadList from '../Threads/ThreadList';
import Information from '../Utils/Information';
import { createProject } from '../../redux/project/ActionCreator';
import AddItem from '../Utils/AddItem';
import MenuBar from '../Utils/MenuBar';
import { filterByProperty } from '../Utils/utilFuncs';
export const SortOptions = ({ options, sortFunction }) => {
  const [val, setVal] = React.useState('date');
  const handleChange2 = (event) => {
    setVal(event.target.value);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sortFunction('ascending', val));
  }, [val]);
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={val}
      onChange={handleChange2}
    >
      {options.map((opt) => (
        <MenuItem value={opt.value}>{opt.name}</MenuItem>
      ))}
    </Select>
  );
};
export const SortDirection = () => {
  const [val, setVal] = React.useState('descending');
  const handleChange2 = (event) => {
    setVal(event.target.value);
  };
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={val}
      onChange={handleChange2}
    >
      <MenuItem value="descending">Descending</MenuItem>
      <MenuItem value="ascending">Ascending</MenuItem>
    </Select>
  );
};
