import React, { Component } from "react";
import { Link } from "react-router-dom";
// we use <Link> instead of <>, so also instead of using href="", we should use to="" .

/********************************************************************************/
// Navbar is going to connect to Redux, because we need to access the auth state fro shownig the logout link or not
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
/********************************************************************************/

// // it's a functional component - these components basicly get use for DOM components, not lifeCycle methods and...
// // they don't have state
// export default () => {
//   return (
//     <div>

//     </div>
//   );
// };

// it's a class based component
class Navbar extends Component {
  onLogoutClick(event) {
    event.preventDefault();
    this.props.clearCurrentProfile(); // we delete current profile, right before logging out
    this.props.logoutUser();
  }

  render() {
    // render is a lifecycle method that should return some JSX - before return we can use other logics and asign variables and like that
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = ( // logOut is not a <Link> and becasue of it's just a click event, we can use <a>, it's not actually going anywhere // in authLinks we wnat to have logOut button and a link to dashboard,
      <ul className="navbar-nav ml-auto  ">
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Post feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={`${user.avator}`}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have a Gravatar connected to your email to display an image"
            />
            {console.log(user.avator)}
            Logout
          </Link>
        </li>
      </ul>
    );

    const guestLinks = ( // in guestLinks we want user to sign-up or log-in
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4 header">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}{" "}
            {/* Here if isAuthenticated was there, we show authLinks, if not we show guestLinks */}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
