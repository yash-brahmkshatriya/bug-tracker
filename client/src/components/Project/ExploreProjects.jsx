import React, { useEffect, useState } from 'react';
import {
  Box,
  Input,
  Button,
  List,
  ListItem,
  ListItemText,
  Grid,
  Chip,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from '@material-ui/core';
import { useStyles } from './projectStyles';
import { useFormik } from 'formik';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector } from 'react-redux';
import Information from '../Utils/Information';
import Loading from '../Utils/Loading';
import { Link as RouterLink } from 'react-router-dom';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const ProjectLink = React.forwardRef((props, ref) => (
  <a ref={ref} {...props}>
    {props.children}
  </a>
));

const ExploreProjects = (props) => {
  const [hasSearched, setSearched] = useState(false);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      // className={css.results}
    >
      <SearchBox
        explore={props.explore}
        hasSearched={hasSearched}
        setSearched={setSearched}
      />
      <SearchResults
        explore={props.explore}
        setSearched={setSearched}
        hasSearched={hasSearched}
      />
    </Box>
  );
};

const SearchBox = ({ explore, setSearched, hasSearched }) => {
  const css = useStyles();
  const project = useSelector((state) => state.project);
  const exploreForm = useFormik({
    initialValues: {
      searchString: '',
    },
    onSubmit: (values) => {
      setSearched(values.searchString);
      explore(values.searchString);
    },
  });

  useEffect(() => {
    if (!project.loading) {
      exploreForm.setFieldValue('searchString', hasSearched);
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

const SearchResults = ({ hasSearched, explore, setSearched }) => {
  const project = useSelector((state) => state.project);
  if (hasSearched && project.projects.length > 0) {
    return (
      <List style={{ width: '100%' }}>
        {project.projects.map((project) => (
          <>
            <SearchResultItem
              setSearched={setSearched}
              explore={explore}
              project={project}
            />
            <Divider />
          </>
        ))}
      </List>
    );
  } else if (hasSearched && project.loading) return <Loading />;
  else if (!hasSearched)
    return <Information message="Search to see Results..." />;
  else if (hasSearched && project.err)
    return <Information message="Error connecting..." />;
};

const SearchResultItem = ({ project, explore, setSearched }) => {
  const css = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const handleChipClick = (tag) => () => {
    if (tag) {
      setSearched(`tag : ${tag}`);
    }
    explore(tag, 'tag');
  };
  return (
    <ListItem key={project._id}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <RouterLink
            to={`/projects/${project._id}`}
            className={css.link}
            component={ProjectLink}
          >
            <ListItemText
              primary={project.name}
              primaryTypographyProps={{ variant: 'h5' }}
            />
          </RouterLink>
          <ListItemText secondary={project.description} />
          <Box display="flex" alignItems="center" className={css.timeNameInfo}>
            <Typography variant="p">{project.projectManager.name}</Typography>
            <FiberManualRecordIcon style={{ fontSize: 8 }} />
            <Typography variant="p">
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
    </ListItem>
  );
};

function getDateTimeString(ISOString) {
  let date = new Date(ISOString);
  return `${date.toDateString()}`;
}

export default ExploreProjects;
