import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  useMediaQuery,
  Paper,
  Divider,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getProject, getAllThreads } from '../../redux/actions';
import ProjectDetails from './ProjectDetails';
import ThreadList from '../Threads/ThreadList';
import ProjectTitle from './ProjectTitle';
import { useFormik } from 'formik';
import { useStyles as threadStyles } from '../Threads/threadStyles';
import ProjectDescription from './ProjectDescription';
import LoadingComponent from '../Utils/Loading';
import Developers from './Developers';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    minHeight: '100vh',
  },
}));

function SpecificProject() {
  const classes = useStyles();
  const css = threadStyles();
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const isTabSpan = useMediaQuery(theme.breakpoints.up('lmd'));
  const [value, setValue] = React.useState(0);
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const projectState = useSelector((state) => state.project);
  const project = projectState.project;
  const threads = useSelector((state) => state.thread.threads);
  const isProjectManager =
    useSelector((state) => state.user.user?._id || undefined) ===
    (projectState.project?.projectManager?._id || undefined);

  useEffect(() => {
    dispatch(getProject(projectId));
    dispatch(getAllThreads(projectId));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  let spanTextSize = '14px';
  if (isXSmall) {
    spanTextSize = '9px';
  }
  if (isTabSpan) {
    spanTextSize = '17px';
  }
  return !projectState.loading && projectState.err === null ? (
    <>
      <ProjectDetails project={project} />
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab
              style={{ textTransform: 'none' }}
              label={
                <span style={{ fontSize: spanTextSize }}>
                  Developer Details
                </span>
              }
              {...a11yProps(0)}
            />
            <Tab
              style={{ textTransform: 'none' }}
              label={<span style={{ fontSize: spanTextSize }}>Threads</span>}
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Developers
              isProjectManager={isProjectManager}
              projectId={project._id}
              developers={project.developers}
            />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <ThreadList threads={threads} keepProjectNameHidden={true} />
          </TabPanel>
        </SwipeableViews>
      </div>
    </>
  ) : (
    <LoadingComponent />
  );
}

export default SpecificProject;
