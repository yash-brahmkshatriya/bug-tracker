import React from 'react';
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import ExploreProjects from './ExploreProjects';
import { exploreProjects } from '../../redux/actions';
import SpecificProject from './SpecificProject';
import Threads from '../Threads/Threads';

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
      <Route path={`${path}/:projectId/threads`}>
        <Threads />
      </Route>
      <Route path={`${path}/:projectId`}>
        <SpecificProject />
      </Route>
    </Switch>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
