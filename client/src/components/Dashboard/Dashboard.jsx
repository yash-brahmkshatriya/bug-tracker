import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  CircularProgress,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../redux/actions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      style={{ overflow: "scroll" }}
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
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    minHeight: "100vh",
  },
}));

function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const user = useSelector((state) => state.user); // assumed user._id
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  let displayProjectManager = <p>all projects</p>;
  let displayDeveloper = <p>all projects</p>;
  let displayContributor = <p>all projects</p>;
  if (project.loading) {
    displayProjectManager = <CircularProgress />;
    displayDeveloper = <CircularProgress />;
    displayContributor = <CircularProgress />;
  } else if (project.err) {
    displayProjectManager = <p>{project.err.message}</p>;
    displayDeveloper = <p>{project.err.message}</p>;
    displayContributor = <p>{project.err.message}</p>;
  } else {
    // project.projects.map(project => {
    //   // project.projectManager._id == user._id -> displayProjectManager <-
    //   // project.developers.map
    // })
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Project Manager" {...a11yProps(0)} />
          <Tab label="Developer" {...a11yProps(1)} />
          <Tab label="Contributor" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          Project Manager
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Developer
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Contributor
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

export default Dashboard;
