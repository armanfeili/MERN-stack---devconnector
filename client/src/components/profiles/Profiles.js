import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileItem from './Profileitem';

class Profiles extends Component {

  componentDidMount () {
    this.props.getProfiles(); // as soon as we render this page, we want to fetch profiles
  }

  render () {
    const {profiles, loading} = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    }else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      }else {
        profileItems = <h4>No profiles found...!</h4>;
      }
    }

    return (
      <div className='profiles'>
        <div className='container'>
          <div className='col-md-12'>
            <h1 className='display-4 text-center'>Developer Profiles</h1>
            <p className='lead text-center'>
              Browse and connect with developers
            </p>
            {profileItems}
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, {getProfiles})(Profiles);
