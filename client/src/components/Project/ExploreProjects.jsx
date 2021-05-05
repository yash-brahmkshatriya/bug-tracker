import React, { useEffect, useState } from 'react';
import { Box, Input, Button, List, Divider } from '@material-ui/core';
import { useStyles } from './projectStyles';
import { useFormik } from 'formik';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector } from 'react-redux';
import Information from '../Utils/Information';
import Loading from '../Utils/Loading';
import { useHistory, useLocation } from 'react-router-dom';
import SearchResultItem from './SearchResultItem';

const useQuery = () => new URLSearchParams(useLocation().search);

const ExploreProjects = (props) => {
  const queryParams = useQuery();
  const history = useHistory();
  useEffect(() => {
    if (queryParams.has('query')) {
      props.explore(queryParams.get('query'), queryParams.get('by'));
    } else history.replace('/projects');
  }, []);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      // className={css.results}
    >
      <SearchBox explore={props.explore} />
      <SearchResults explore={props.explore} />
    </Box>
  );
};

const SearchBox = ({ explore }) => {
  const css = useStyles();
  const project = useSelector((state) => state.project);
  const history = useHistory();
  const queryParams = useQuery();
  const exploreForm = useFormik({
    initialValues: {
      searchString: '',
    },
    onSubmit: (values) => {
      explore(values.searchString);
      history.push(`/projects?query=${values.searchString}`);
    },
  });

  useEffect(() => {
    if (!project.loading) {
      if (queryParams.has('by')) {
        exploreForm.setFieldValue(
          'searchString',
          `${queryParams.get('by')} : ${queryParams.get('query')}`
        );
      } else if (queryParams.has('query')) {
        exploreForm.setFieldValue(
          'searchString',
          `${queryParams.get('query')}`
        );
      } else {
        exploreForm.setFieldValue('searchString', ``);
      }
      exploreForm.setSubmitting(false);
    }
  }, [project, history.location]);

  return (
    <form onSubmit={exploreForm.handleSubmit} className={css.formDiv}>
      <Box m={1} className={css.inpGrp}>
        <SearchIcon className={css.search} />
        <Input
          id="searchString"
          type="text"
          placeholder="Search Projects by Name or Tag..."
          disableUnderline
          fullWidth
          className={css.inp}
          value={exploreForm.values.searchString}
          onChange={exploreForm.handleChange}
          onBlur={exploreForm.handleBlur}
        />
        <Button
          color="secondary"
          variant="contained"
          type="submit"
          className={css.inpBtn}
          onClick={exploreForm.handleSubmit}
          disabled={!exploreForm.dirty || exploreForm.isSubmitting}
        >
          Search
        </Button>
      </Box>
    </form>
  );
};

const SearchResults = ({ explore }) => {
  const project = useSelector((state) => state.project);
  const queryParams = useQuery();
  var emptySearch = false;
  if (!queryParams.has('query')) emptySearch = true;

  if (!emptySearch && project.projects.length > 0) {
    return (
      <List style={{ width: '100%' }}>
        {project.projects.map((project) => (
          <>
            <SearchResultItem explore={explore} project={project} />
            <Divider />
          </>
        ))}
      </List>
    );
  } else if (!emptySearch && project.loading) return <Loading />;
  else if (emptySearch)
    return <Information message="Search to see Results..." />;
  else if (!emptySearch && project.err)
    return <Information message="Error connecting..." />;
  else if (!emptySearch && project.projects.length === 0)
    return <Information message="No such projects found..." />;
  else return <Information message="Unknown Error Occurred 😕" />;
};

export default ExploreProjects;
