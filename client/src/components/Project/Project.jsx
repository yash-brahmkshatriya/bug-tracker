import React from 'react';
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import ExploreProjects from './ExploreProjects';
import { exploreProjects } from '../../redux/actions';

const mapStateToProps = (state) => {
  return {
    project: state.project,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    explore: (searchString, options) =>
      dispatch(exploreProjects(searchString, options)),
  };
};

function Project(props) {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <ExploreProjects explore={props.explore} />
      </Route>
      <Route path={`${path}/:projectId`}>
        <SpecificProject />
      </Route>
    </Switch>
  );
}

const SpecificProject = () => {
  let { projectId } = useParams();
  return <h1>{projectId}</h1>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
