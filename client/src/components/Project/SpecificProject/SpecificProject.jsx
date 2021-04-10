import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  useMediaQuery,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getProject } from "../../../redux/project/ActionCreator";

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

function SpecificProject() {
  const classes = useStyles();
  const theme = useTheme();
  const isextraSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const isTabSpan = useMediaQuery(theme.breakpoints.up("lmd"));
  const [value, setValue] = React.useState(0);
  const { projectId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProject(projectId));
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  let spanTextSize = "14px";
  if (isextraSmall) {
    spanTextSize = "9px";
  }
  if (isTabSpan) {
    spanTextSize = "17px";
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
            label={
              <span style={{ fontSize: spanTextSize }}>Project Details</span>
            }
            {...a11yProps(0)}
          />
          <Tab
            label={<span style={{ fontSize: spanTextSize }}>Thread List</span>}
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>

      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          Project Details
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Threads List
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

export default SpecificProject;
