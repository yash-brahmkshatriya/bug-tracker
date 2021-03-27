import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth != null ? (
          children
        ) : (
          <Redirect to={{ pathname: '/home', state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
