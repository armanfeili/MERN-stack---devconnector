import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';
import { Link } from 'react-router-dom';

class Experience extends Component {

  // onDeleteClick (id) { // we passed exp._id to onDeleteClick() so it will delete the individual item
  //   this.props.deleteExperience(id)
  // // it also need to redirect to dashboard again, one way is using this.props.history and
  // // combine withRouter with component, other way is just delete experience in backend and fetch current 
  // // profile with GET_PROFILE action type
  // }

  onDeleteClick (id) {
    this.props.deleteExperience(id);
  }

  render () {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        {/* any exp item has an _id , we need to add key for lists */}
        <td>
          {exp.company}
        </td>
        <td>
          {exp.title}
        </td>
        <td>
          <Moment format='YYYY/MM/DD'>
            {exp.from}
          </Moment> -
          {exp.to === null ? ' Now' :
             (<Moment format='YYYY/MM/DD'>
                {exp.to}
              </Moment>)}
        </td>
        <td>
          <button onClick={this.onDeleteClick.bind(this, exp._id)} className='btn btn-danger'>
            Delete
            {/* we don't want to create constructor, so we bind this here, and also we passed exp._id to */}
            {/* onDeleteClick() so it will delete the individual item */}
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <Link to='/dashboard' className='btn btn-light'>
        {" "} Go Back
        </Link>
        <h4 className='mb-4'>Experience Credential</h4>
        <table className='table'>
          <thead>
            <tr>
              <th>
                Company
              </th>
              <th>
                Title
              </th>
              <th>
                Years
              </th>
              <th>
              </th>
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

// we already have access to our experiences because we got passed it in as a property
// so we don't need mapStateToProps to access state or anything
export default connect(null, {deleteExperience})(Experience);
