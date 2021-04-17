import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { exploreProjects } from '../../redux/actions';
import { useStyles as projDetStyles } from './projDetStyles';
import LoadingComponent from '../Utils/Loading';
import ProjectDescription from './ProjectDescription';
import ProjectTitle from './ProjectTitle';
import { updateProject } from '../../redux/actions';
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
    validate: (values) => {
      let errors = {};
      let { name, description } = values;
      name = name.trim();
      description = description.trim();
      if (!name) errors.name = 'Empty Value Found';
      if (!description) errors.description = 'Empty Value Found';
      return errors;
    },
    onSubmit: (values) => {
      dispatch(updateProject(project._id, values));
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
  const history = useHistory();
  const dispatch = useDispatch();
  const handleChipClick = (tag) => () => {
    if (tag) {
      history.push(`/projects?query=${tag}&by=tag`);
    }
    dispatch(exploreProjects(tag, 'tag'));
  };
  return Object.keys(project).length > 0 ? (
    <>
      <ProjectTitle
        mode={mode}
        setMode={setMode}
        editForm={editForm}
        project={project}
        isProjectManager={isProjectManager}
        handleChipClick={handleChipClick}
        setTags={setTags}
        tags={tags}
      />
      <ProjectDescription
        mode={mode}
        description={project.description}
        editForm={editForm}
      />
    </>
  ) : (
    <LoadingComponent />
  );
};

export default ProjectDetails;
