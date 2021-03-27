import React, { useEffect } from 'react';
import { Box, Input, Button } from '@material-ui/core';
import { useStyles } from './projectStyles';
import { useFormik } from 'formik';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector } from 'react-redux';

const ExploreProjects = (props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <SearchBox explore={props.explore} />
      <SearchResults />
    </Box>
  );
};

const SearchBox = ({ explore }) => {
  const css = useStyles();
  const project = useSelector((state) => state.project);
  const exploreForm = useFormik({
    initialValues: {
      searchString: '',
    },
    onSubmit: (values) => {
      explore(values.searchString);
    },
  });

  useEffect(() => {
    if (!project.loading) {
      exploreForm.setSubmitting(false);
    }
  }, [project]);

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

const SearchResults = () => {
  return <h1>hi</h1>;
};

export default ExploreProjects;
