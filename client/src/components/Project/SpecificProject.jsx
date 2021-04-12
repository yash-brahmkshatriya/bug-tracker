import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import {
  Chip,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  useMediaQuery,
  Divider,
  Grid,
  ListItemText,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getProject, exploreProjects } from '../../redux/actions';
import { useStyles as projDetStyles, getRandomColor } from './projDetStyles';
import LoadingComponent from '../Utils/Loading';

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
  const theme = useTheme();
  const isextraSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const isTabSpan = useMediaQuery(theme.breakpoints.up('lmd'));
  const [value, setValue] = React.useState(0);
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project.project);

  useEffect(() => {
    dispatch(getProject(projectId));
  }, []);

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
              <span style={{ fontSize: spanTextSize }}>Project Details</span>
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
          <ProjectDetails project={project} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Threads
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

const ProjectDetails = ({ project }) => {
  const css = projDetStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();
  const dispatch = useDispatch();
  const handleChipClick = (tag) => () => {
    if (tag) {
      history.push(`/projects?query=${tag}&by=tag`);
    }
    dispatch(exploreProjects(tag, 'tag'));
  };
  return Object.keys(project).length > 0 ? (
    <Box>
      <Typography variant="h4" className={css.projectTitle}>
        {project.name}
      </Typography>
      <Divider className={css.divider} />
      <Grid container justify="space-between">
        <Grid item sm={12} md={6}>
          <ListItemText
            primary="Description"
            style={{ maxWidth: '48ch', overflowWrap: 'break-word' }}
            secondary={project.description}
            primaryTypographyProps={{
              variant: 'h6',
            }}
          />
          <ListItemText
            primary="Date of Creation"
            secondary={getDateTimeString(project.createdAt)}
            primaryTypographyProps={{ variant: 'h6' }}
          />
          <br />
          {isSmall ? null : (
            <Box className={css.chipsBoxDesktop}>
              {project.tags.map((tag, idx) => (
                <Chip
                  color="secondary"
                  label={tag}
                  key={idx}
                  size="small"
                  clickable
                  className={css.chip}
                  onClick={handleChipClick(tag)}
                />
              ))}
            </Box>
          )}
        </Grid>
        {isSmall ? (
          <Grid item xs={12} sm={12}>
            <Box className={css.chipsBoxMobile}>
              {project.tags.map((tag, idx) => (
                <Chip
                  color="secondary"
                  label={tag}
                  key={idx}
                  size="small"
                  clickable
                  className={css.chip}
                  onClick={handleChipClick(tag)}
                />
              ))}
            </Box>
            <Divider className={css.divider} />
          </Grid>
        ) : null}
        <Grid item sm={12} md={5}>
          <Typography variant="h6">Project Manager</Typography>
          <List>
            <PersonItem person={project.projectManager} />
          </List>
          <Typography variant="h6">Developers</Typography>
          <List>
            {project.developers.map((developer) => (
              <>
                <PersonItem person={developer} />
                <Divider variant="inset" component="li" />
              </>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <LoadingComponent />
  );
};

function getDateTimeString(ISOString) {
  let date = new Date(ISOString);
  return `${date.toDateString()}`;
}

const PersonItem = ({ person }) => {
  const theme = useTheme();

  let names = person.name.split(' ');
  let initials = names[0].charAt(0).toUpperCase();
  if (names.length > 1)
    initials += names[names.length - 1].charAt(0).toUpperCase();

  const avatarStyles = {
    color: theme.palette.getContrastText(getRandomColor()),
    backgroundColor: getRandomColor(),
  };
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar style={avatarStyles}>{initials}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={person.name} secondary={person.email} />
    </ListItem>
  );
};

export default SpecificProject;
