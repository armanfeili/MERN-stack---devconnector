import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';

import Spinner from '../common/Spinner';
// import isEmpty from '../../validation/is_empty'
import { Link } from 'react-router-dom';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {

  componentDidMount () {
    this.props.getCurrentProfile(); // we want to get current profile any time we render this route
  }

  onDeleteClick (e) {
    this.props.deleteAccount(); // calling an action
  }

  render () {
    // we need to make sure that profile is our profile state is not equal to NULL
    // before we actually try to render anything.
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile; // profile gets call because of calling getCurrentProfile() above

    let dashboardContent;

    if (profile === null || loading) {
      // check if we didn't have a profile or we had loading (loading was true)
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has a profile data or not
      if (Object.keys(profile).length > 0) {
        // Object.keys just gets the keys of an object of the profile object. and if the length of that was grater than 0, it means it's not empty
        dashboardContent = (
          <div>
            <p className='lead text-muted'>
              Welcome
              {' '}
              <Link to={`/profile/${profile.handle}`}>
              {user.name}
              </Link>
            </p>
            <ProfileActions />
            {/* TODO: exp and edu */}
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            {/* we have access to profile since we called getCurrentProfile() above, so we just need to */}
            {/* pass profile.experience to Experience component, and we have all data we want to show */}
            <div style={{ marginBottom: '60px' }} />
            <button onClick={this.onDeleteClick.bind(this)} className='btn btn-danger'>
              Delete My Account
            </button>
          </div>
        );
      // dashboardContent = (
      //   <div>
      //     <p className='lead text-muted'>
      //       Welcome
      //       <Link to={`/profile/${profile.handle}`}>
      //       {user.name}
      //       </Link>
      //     </p>
      //     <ProfileActions />
      //     {/* <Experience experience={profile.experience} /> */}
      //     {/* <Education education={profile.education} /> */}
      //     <div style={{ marginBottom: '60px' }} />
      //     <button onClick={this.onDeleteClick.bind(this)} className='btn btn-danger'>
      //       Delete My Account
      //     </button>
      //   </div>
      // )
      } else {
        // user is logged in but has no profile
        dashboardContent = (
          <div>
            <p className='lead text-muted'>
              Welcome
              {' '}
              {user.name}
            </p>
            <p>
              You have not yet setup a profile, please add some info
            </p>
            <Link to='/create-profile' className='btn btn-lg btn-info'>
            {" "} Create profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div>
        <div className='dashboard'>
          <div className='container'>
            <div className='row'>
              <div className='col-m-12'>
                <h1 className='display-4'>Dashboard</h1>
                {dashboardContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired, // action
  deleteAccount: PropTypes.func.isRequired, // action
  profile: PropTypes.object.isRequired, // state
  auth: PropTypes.object.isRequired // state
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile,deleteAccount}
)(Dashboard);
