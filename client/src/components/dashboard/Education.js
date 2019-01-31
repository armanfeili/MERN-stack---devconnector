import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';
// import { Link } from 'react-router-dom'

class Education extends Component {

  // onDeleteClick (id) { // we passed exp._id to onDeleteClick() so it will delete the individual item
  //   this.props.deleteExperience(id)
  onDeleteClick (id) {
    this.props.deleteEducation(id);
  }

  // // it also need to redirect to dashboard again, one way is using this.props.history and
  // // combine withRouter with component, other way is just delete experience in backend and fetch current 
  // // profile with GET_PROFILE action type
  // }

  render () {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        {/* any exp item has an _id , we need to add key for lists */}
        <td>
          {edu.school}
        </td>
        <td>
          {edu.degree}
        </td>
        <td>
          <Moment format='YYYY/MM/DD'>
            {edu.from}
          </Moment> -
          {edu.to === null ? ' Now' :
             (<Moment format='YYYY/MM/DD'>
                {edu.to}
              </Moment>)}
        </td>
        <td>
          <button onClick={this.onDeleteClick.bind(this, edu._id)} className='btn btn-danger'>
            Delete
            {/* we don't want to create constructor, so we bind this here, and also we passed edu._id to */}
            {/* onDeleteClick() so it will delete the individual item */}
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className='mb-4'>Education Credential</h4>
        <table className='table'>
          <thead>
            <tr>
              <th>
                School
              </th>
              <th>
                Degree
              </th>
              <th>
                Years
              </th>
              <th>
              </th>
            </tr>
            {education}
          </thead>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

// we already have access to our education because we got passed it in as a property
// so we don't need mapStateToProps to access state or anything
export default connect(null, { deleteEducation})(Education);
