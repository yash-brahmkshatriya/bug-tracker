import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Box,
  useMediaQuery,
  Divider,
  Grid,
  List,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { exploreProjects } from '../../redux/actions';
import { useStyles as projDetStyles, getRandomColor } from './projDetStyles';
import LoadingComponent from '../Utils/Loading';
import PersonIcon from '@material-ui/icons/Person';
import CodeIcon from '@material-ui/icons/Code';
import ProjectTitle from './ProjectTitle';
import ProjectDescription from './ProjectDescription';
import EditableChip, { AddTagChip } from './EditableChip';
import PersonItem from './PersonItem';
import Developers from './Developers';

const ProjectDetails = ({ project }) => {
  const [mode, setMode] = useState('view');
  const [tags, setTags] = useState([]);
  const projectState = useSelector((state) => state.project);
  const isProjectManager =
    useSelector((state) => state.user.user?._id || undefined) ===
    (projectState.project?.projectManager?._id || undefined);
  const css = projDetStyles();
  const editForm = useFormik({
    initialValues: {
      name: project.name,
      description: project.description,
      tags: project.tags,
    },
  });
  useEffect(() => {
    editForm.setFieldValue('name', project.name);
    editForm.setFieldValue('description', project.description);
    editForm.setFieldValue('tags', project.tags);
    if (project.tags) {
      setTags([...project.tags]);
    }
  }, [mode]);
  useEffect(() => {
    editForm.setFieldValue('tags', tags);
  }, [tags]);
  useEffect(() => {
    if (project.tags) {
      setTags([...project.tags]);
    }
  }, [project]);
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
      <ProjectTitle
        mode={mode}
        setMode={setMode}
        projectName={project.name}
        editForm={editForm}
        projectId={project._id}
        isProjectManager={isProjectManager}
      />
      <Divider className={css.divider} />
      <Grid container justify="space-between">
        <Grid item sm={12} md={6}>
          <ProjectDescription
            mode={mode}
            description={project.description}
            editForm={editForm}
          />
          <br />
          {isSmall ? null : (
            <Box className={css.chipsBoxDesktop}>
              {tags.map((tag, idx) => (
                <EditableChip
                  idx={idx}
                  tag={tag}
                  mode={mode}
                  onClick={handleChipClick(tag)}
                  setTags={setTags}
                />
              ))}
              <AddTagChip mode={mode} setTags={setTags} />
            </Box>
          )}
        </Grid>
        {isSmall ? (
          <Grid item xs={12} sm={12}>
            <Box className={css.chipsBoxMobile}>
              <AddTagChip mode={mode} setTags={setTags} />
              {tags.map((tag, idx) => (
                <EditableChip
                  idx={idx}
                  tag={tag}
                  mode={mode}
                  onClick={handleChipClick(tag)}
                  setTags={setTags}
                />
              ))}
            </Box>
            <Divider className={css.divider} />
          </Grid>
        ) : null}
        <Grid item sm={12} md={5}>
          <Box display="flex" alignItems="center">
            <PersonIcon />
            <Typography variant="h5" style={{ marginLeft: '8px' }}>
              Project Manager
            </Typography>
          </Box>
          <List>
            <PersonItem person={project.projectManager} key="ProjectManager" />
          </List>
          <Divider className={css.divider} />
          <Developers
            developers={project.developers}
            isProjectManager={isProjectManager}
            projectId={project._id}
          />
        </Grid>
      </Grid>
    </Box>
  ) : (
    <LoadingComponent />
  );
};

export default ProjectDetails;
