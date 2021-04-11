import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, auth, redirectRoute, ...rest }) => {
  const pathname = redirectRoute || "/home";
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth === true ? (
          children
        ) : (
          <Redirect to={{ pathname: pathname, state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
