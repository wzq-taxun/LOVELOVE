import React from "react";
import { Redirect, Route } from "react-router-dom";
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Boolean(sessionStorage.getItem("token")) ?
        (
          <Component {...props} />
        )
        : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location.pathname }
            }}
          />
        )
    }
  />
);
export {
  PrivateRoute
}
