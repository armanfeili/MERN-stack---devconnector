import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile, setProfileLoading } from '../../actions/profileActions';

class Dashboard extends Component {

  componentDidMount () {
    this.props.getCurrentProfile(); // we want to get current profile any time we render this route
  }

  render () {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   profile: state.profile
// })

export default connect(null, {getCurrentProfile})(Dashboard);
