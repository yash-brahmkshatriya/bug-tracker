import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import { getDashBoardDetails, exploreProjects } from '../../redux/actions';
import SearchResultItem from '../Project/SearchResultItem';
import ThreadList from '../Threads/ThreadList';
import Information from '../Utils/Information';
import MenuBar from '../Utils/MenuBar';

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

function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const isextraSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const isTabSpan = useMediaQuery(theme.breakpoints.up('lmd'));
  const [value, setValue] = React.useState(0);
  const user = useSelector((state) => state.user.user); // assumed user._id
  const dashBoard = useSelector((state) => state.project.dashBoard);
  const dispatch = useDispatch();
  const explore = (searchString, by) =>
    dispatch(exploreProjects(searchString, by));

  useEffect(() => {
    dispatch(getDashBoardDetails());
  }, [user]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  let spanTextSize = '14px';
  if (isextraSmall) {
    spanTextSize = '9px';
  }
  if (isTabSpan) {
    spanTextSize = '17px';
  }

  return (
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
              <span style={{ fontSize: spanTextSize }}>Project Manager</span>
            }
            {...a11yProps(0)}
          />
          <Tab
            style={{ textTransform: 'none' }}
            label={<span style={{ fontSize: spanTextSize }}>Developer</span>}
            {...a11yProps(1)}
          />
          <Tab
            style={{ textTransform: 'none' }}
            label={<span style={{ fontSize: spanTextSize }}>Contributor</span>}
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <>
            <MenuBar />
            <ProjectList
              projects={dashBoard.projects}
              type="pm"
              explore={explore}
              userId={user._id}
            />
          </>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <>
            <MenuBar />
            <ProjectList
              projects={dashBoard.projects}
              type="dv"
              explore={explore}
              userId={user._id}
            />
          </>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <>
            <MenuBar />
            <ThreadList threads={dashBoard.threads} />
          </>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

const ProjectList = ({ projects, type, explore, userId }) => {
  let res;
  if (projects) {
    if (type === 'pm') {
      res = projects.filter((project) => project.projectManager._id === userId);
    } else {
      res = projects.filter(
        (project) =>
          project.developers.filter((developer) => developer._id === userId)
            .length > 0
      );
    }
  }

  return res && res.length > 0 ? (
    <List style={{ width: '100%' }}>
      {res.map((project) => (
        <>
          <SearchResultItem explore={explore} project={project} />
          <Divider />
        </>
      ))}
    </List>
  ) : (
    <Information message="No items to show here...😕" />
  );
};

export default Dashboard;
