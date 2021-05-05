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
import {
  getDashBoardDetails,
  exploreProjects,
  sortProjects,
} from '../../redux/actions';
import SearchResultItem from '../Project/SearchResultItem';
import ThreadList from '../Threads/ThreadList';
import Information from '../Utils/Information';
import { createProject } from '../../redux/project/ActionCreator';
import AddItem from '../Utils/AddItem';
import MenuBar from '../Utils/MenuBar';
import { filterByProperty } from '../Utils/utilFuncs';
import { SortOptions, SortDirection } from '../Utils/SortComponent';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const isextraSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const isTabSpan = useMediaQuery(theme.breakpoints.up('lmd'));
  const [value, setValue] = React.useState(0);
  const user = useSelector((state) => state.user.user);
  const dashBoard = useSelector((state) => state.project.dashBoard);
  const [filtered, setFiltered] = useState({
    projects: dashBoard.projects,
    threads: dashBoard.threads,
  });
  const dispatch = useDispatch();
  const projectState = useSelector((state) => state.project);
  const projectId =
    Object.keys(projectState.project).length > 0
      ? projectState.project._id
      : null;
  const explore = (searchString, by) =>
    dispatch(exploreProjects(searchString, by));

  useEffect(() => {
    dispatch(getDashBoardDetails());
  }, [user]);

  useEffect(() => {
    setFiltered({ projects: dashBoard.projects, threads: dashBoard.threads });
  }, [dashBoard]);
  const onSearch = {
    projects: (searchString, property = 'name') =>
      setFiltered((prevState) => {
        if (searchString === '')
          return {
            projects: dashBoard.projects,
            threads: dashBoard.threads,
          };
        else
          return {
            ...prevState,
            projects: filterByProperty(
              dashBoard.projects,
              property,
              searchString
            ),
          };
      }),
    threads: (searchString, property = 'title') =>
      setFiltered((prevState) => {
        if (searchString === '')
          return {
            projects: dashBoard.projects,
            threads: dashBoard.threads,
          };
        else
          return {
            ...prevState,
            threads: filterByProperty(
              dashBoard.threads,
              property,
              searchString
            ),
          };
      }),
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const addProjectForm = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validate: (values) => {
      let errors = {};
      let { title, description } = values;
      title = title.trim();
      description = description.trim();

      if (!title) errors.title = 'title is Required';
      if (!description) errors.description = 'Description is Required';
      return errors;
    },
    onSubmit: (values) => {
      dispatch(createProject(values.title, values.description));
    },
  });
  useEffect(() => {
    if (
      !projectState.loading &&
      Object.keys(projectState.project).length > 0 &&
      addProjectForm.isSubmitting
    ) {
      console.log(projectState.project);
      addProjectForm.setSubmitting(false);
      history.push(`/projects/${projectId}`);
    }
  }, [projectState]);
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
            <MenuBar
              onChangeSearch={onSearch.projects}
              Functionalities={[
                <AddItem addThreadForm={addProjectForm} type="project" />,
              ]}
            />
            <ProjectList
              projects={filtered.projects}
              type="pm"
              explore={explore}
              userId={user._id}
              isDeletable={true}
            />
          </>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <>
            <MenuBar
              onChangeSearch={onSearch.projects}
              Functionalities={[
                <SortOptions
                  options={[
                    { value: 'name', name: 'Name' },
                    { value: 'createdAt', name: 'CreatedAt' },
                  ]}
                  sortFunction={sortProjects}
                />,
                <SortDirection />,
              ]}
            />
            <ProjectList
              projects={filtered.projects}
              type="dv"
              explore={explore}
              userId={user._id}
            />
          </>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <>
            <MenuBar
              Functionalities={[
                <SortOptions
                  options={[
                    { value: 'title', name: 'Title' },
                    { value: 'createdAt', name: 'CreatedAt' },
                  ]}
                  sortFunction={sortProjects}
                />,
                <SortDirection />,
              ]}
              onChangeSearch={onSearch.threads}
              searchOptions={[
                {
                  name: 'Title',
                  value: 'title',
                },
              ]}
            />
            <ThreadList threads={filtered.threads} />
          </>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

const ProjectList = ({ projects, type, explore, userId, isDeletable }) => {
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
          <SearchResultItem
            explore={explore}
            project={project}
            isDeletable={isDeletable}
          />
          <Divider />
        </>
      ))}
    </List>
  ) : (
    <Information message="No items to show here...😕" />
  );
};

export default Dashboard;
