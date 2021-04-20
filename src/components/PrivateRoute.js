import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import authSelectors from "../redux/Auth/auth-selectors";

export default function PrivateRoute({ redirectTo, children, ...routeProps }) {
  const isAuthenticated = useSelector(authSelectors.getIsLogedIn);
  return (
    <Route {...routeProps}>
      {isAuthenticated ? children : <Redirect to={redirectTo} />}
    </Route>
  );
}

// const mapStateToProps = (state) => ({
//   isAuthenticated: authSelectors.getIsLogedIn(state),
// });

// export default connect(mapStateToProps)(PrivateRoute);
