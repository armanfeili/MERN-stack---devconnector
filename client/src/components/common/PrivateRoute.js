import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = (
  // we use <PrivateRoute /> instead of <Route /> to have a control on protected routes,
  // so <PrivateRoute /> is just like <Route /> if the user is authenticated, if not, it will redirect the route
  { component: Component, auth, ...rest } // this function gets component, auth property, and the rest of properties
) => (
  <Route
    {...rest} // it gets all properties
    render={(
      // render one of these component
      props // it gets properties
    ) =>
      auth.isAuthenticated === true ? ( // check if user logged in and is authenticated or not
        <Component {...props} /> // this is the component we want to render if isAuthenticated is true
      ) : (
        <Redirect to="/login" /> // if not, we will redirect to login page - <Redirect> is a component we need to import
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute); // then we should import this function to App.js
