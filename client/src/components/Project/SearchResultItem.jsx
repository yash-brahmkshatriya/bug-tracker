import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  ListItem,
  ListItemText,
  Grid,
  Chip,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@material-ui/core';
import { useStyles } from './projectStyles';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteProject } from '../../redux/actions';
import ConfirmDialog from '../Utils/ConfirmDialog';

const ProjectLink = React.forwardRef((props, ref) => (
  <a ref={ref} {...props}>
    {props.children}
  </a>
));

const SearchResultItem = ({ project, explore, isDeletable = false }) => {
  const css = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  const handleDeleteProject = () => {
    dispatch(deleteProject(project._id));
    closeDialog();
  };

  const handleChipClick = (tag) => () => {
    if (tag) {
      history.push(`/projects?query=${tag}&by=tag`);
    }
    explore(tag, 'tag');
  };
  return (
    <ListItem key={project._id}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <RouterLink to={`/projects/${project._id}`} className={css.link}>
            <ListItemText
              primary={project.name}
              primaryTypographyProps={{ variant: 'h5' }}
            />
          </RouterLink>
          {/* {isDeletable ? (
            <IconButton edge="end" aria-label="delete" onClick={openDialog}>
              <DeleteIcon />
            </IconButton>
          ) : null} */}
          <ListItemText secondary={project.description} />
          <Box display="flex" alignItems="center" className={css.timeNameInfo}>
            <Typography variant="p">{project.projectManager.name}</Typography>
            <FiberManualRecordIcon style={{ fontSize: 8 }} />
            <Typography variant="inherit">
              {getDateTimeString(project.createdAt)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} style={{ alignItems: 'flex-end' }}>
          <Box className={isSmall ? css.chipsBoxMobile : css.chipsBoxDesktop}>
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
        </Grid>
      </Grid>
      <ConfirmDialog
        onTrueEvent={handleDeleteProject}
        onFalseEvent={closeDialog}
        showDialog={showDialog !== false}
        message="Delete"
      />
    </ListItem>
  );
};

function getDateTimeString(ISOString) {
  let date = new Date(ISOString);
  return `${date.toDateString()}`;
}

export default SearchResultItem;
