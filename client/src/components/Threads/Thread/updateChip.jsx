import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import BugReportIcon from '@material-ui/icons/BugReport';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import StyledChip from '../../Utils/StyledChip';
import { Box, Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import { updateThread } from '../../../redux/actions';
const useStyles = makeStyles((theme) => ({
  formControl: {
    marginRight: theme.spacing(1),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  MuiInputBase: {
    padding: 0,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

function getStyles(theme) {
  return {
    fontWeight: theme.typography.fontWeightMedium,
  };
}

function getProps(value, items) {
  return items.find((item) => item.value === value);
}
let selectPriority, selectBugtype, selectClosed;
const ChipSelect = ({ items, item, setItem }) => {
  const classes = useStyles();
  const theme = useTheme();

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  return (
    <div>
      <Box className={classes.formControl}>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          value={item}
          onChange={handleChange}
          disableUnderline
          classes={{
            root: classes.root,
          }}
          renderValue={(value) => {
            const { _, icon, bgcolor } = getProps(value, items);
            return (
              <StyledChip
                color="secondary"
                size="small"
                icon={icon}
                bgcolor={bgcolor}
                key={value}
                label={value}
                className={classes.chip}
              />
            );
          }}
          MenuProps={MenuProps}
        >
          {items.map((name) => (
            <MenuItem
              key={name.value}
              value={name.value}
              style={getStyles(theme)}
            >
              {name.value}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </div>
  );
};

const UpdateChip = ({ projectId, threadId, initialValues, setEditingPm }) => {
  const [itemClosed, setItemClosed] = useState(initialValues[0]);
  const [itemBugType, setItemBugType] = useState(initialValues[1]);
  const [itemPriority, setItemPriority] = useState(initialValues[2]);
  const isClosed = [
    { value: 'Closed', icon: <HistoryOutlinedIcon />, bgcolor: '#f44336' },
    { value: 'Open', icon: <InfoOutlinedIcon />, bgcolor: '#4caf50' },
  ];
  const priority = [
    { value: 'Critical', icon: <ArrowUpwardIcon />, bgcolor: '#795548' },
    { value: 'High', icon: <ArrowUpwardIcon />, bgcolor: '#FF5722' },
    { value: 'Medium', icon: <ArrowUpwardIcon />, bgcolor: '#FF9800' },
    { value: 'Low', icon: <ArrowUpwardIcon />, bgcolor: '#CDDC39' },
    { value: 'Not applicable', icon: <ArrowUpwardIcon />, bgcolor: '#607D8B' },
    { value: 'Enhancement', icon: <ArrowUpwardIcon />, bgcolor: '#009688' },
  ];
  const bugType = [
    { value: 'Bug', icon: <BugReportIcon />, bgcolor: '#D32F2F' },
    { value: 'Query', icon: <HelpOutlineIcon />, bgcolor: '#03A9F4' },
  ];
  const dispatch = useDispatch();
  const handleOnClick = () => {
    dispatch(
      updateThread(
        projectId,
        itemPriority,
        itemClosed === 'Closed',
        null,
        null,
        itemBugType,
        threadId
      )
    );
  };
  return (
    <>
      <Box display="flex" justifyContent="flex-start" alignItems="center">
        <ChipSelect
          items={isClosed}
          item={itemClosed}
          setItem={setItemClosed}
        />
        <ChipSelect
          items={bugType}
          item={itemBugType}
          setItem={setItemBugType}
        />
        <ChipSelect
          items={priority}
          item={itemPriority}
          setItem={setItemPriority}
        />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <IconButton
          //variant="outlined"
          type="submit"
          onClick={() => setEditingPm(false)}
          style={{ borderRadius: '24px', marginRight: '6px' }}
        >
          <CloseIcon />
        </IconButton>
        <IconButton
          //variant="outlined"
          type="submit"
          onClick={handleOnClick}
          style={{ borderRadius: '24px' }}
        >
          <SaveIcon />
        </IconButton>
      </Box>
    </>
  );
};
export default UpdateChip;
