import React, { Component } from "react";
import { Link } from "react-router-dom";
// we use <Link> instead of <>, so also instead of using href="", we should use to="" .

// // it's a functional component - these components basicly get use for DOM components, not lifeCycle methods and...
// // they don't have state
// export default () => {
//   return (
//     <div>

//     </div>
//   );
// };

// it's a class base component
class Navbar extends Component {
  render() {
    // render is a lifecycle method that should return some JSX - before return we can use other logics and asign variables and like that
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
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
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
