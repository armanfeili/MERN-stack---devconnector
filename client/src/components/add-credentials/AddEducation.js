import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
// if we want to redirect by an action, we need withRouter
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
  constructor (props) {
    super(props);
    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false // this is for a checkBox
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  //   componentWillReceiveProps(nextProps) {
  //     if (nextProps.errors) {
  //       this.setState({ errors: nextProps.errors })
  //     }
  //   }

  // we realy should write this part for getting errors work
  componentDidUpdate (prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  onSubmit (e) {
    e.preventDefault();

    // Getting the data for passing into action
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addEducation(eduData, this.props.history);
  }
  onChange (e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onCheck (e) {
    this.setState({
      // whenever we check the box, we call onCheck(), so it will read disabled & current from component state,
      // and reverse them
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render () {
    const { errors } = this.state;

    return <div className='add-education'>
             <div className='container'>
               <div className='row'>
                 <div className='col-md-8 m-auto'>
                   <Link to='/dashboard' className='btn btn-light componentBody'>
                   {" "} Go Back
                   </Link>
                   <h1 className='display-4 text-center'>Add Education</h1>
                   <p className='lead text-center'>
                     Add any school, bootcamp ,etc that you have attended
                     {" "}
                   </p>
                   <small className='d-block pb-3'>* = required fields</small>
                   <form onSubmit={this.onSubmit}>
                     <TextFieldGroup
                       placeholder='* School'
                       name='school'
                       value={this.state.school}
                       onChange={this.onChange}
                       error={errors.school} />
                     <TextFieldGroup
                       placeholder='* Degree'
                       name='degree'
                       value={this.state.degree}
                       onChange={this.onChange}
                       error={errors.degree} />
                     <TextFieldGroup
                       placeholder='* Fieldofstudy'
                       name='fieldofstudy'
                       value={this.state.fieldofstudy}
                       onChange={this.onChange}
                       error={errors.fieldofstudy} />
                     <h6>From Date</h6>
                     <TextFieldGroup
                       name='from'
                       type='date'
                       value={this.state.from}
                       onChange={this.onChange}
                       error={errors.from} />
                     <h6>To Date</h6>
                     <TextFieldGroup
                       name='to'
                       type='date'
                       value={this.state.to}
                       onChange={this.onChange}
                       error={errors.to}
                       disabled={this.state.disabled ? 'disabled' : ''} />
                     {/* whenever we check the box, disabled will change,so at first, disabled is set to false... // by clicking the check box, disabled in state component,*/}
                     {/*  will change, so this field will be disable, so we can't change it */}
                     <div className='form-check mb-4'>
                       <input
                         type='checkbox'
                         className='form-check-input'
                         name='current'
                         value={this.state.current}
                         checked={this.state.current}
                         onChange={this.onCheck}
                         id='current' />
                       {/* // if we check the box, we will call onCheck() */}
                       <label htmlFor='current' className='form-check-label'>
                         Current Job
                       </label>
                     </div>
                     <TextAreaFieldGroup
                       placeholder='Program Description'
                       name='description'
                       value={this.state.description}
                       onChange={this.onChange}
                       error={errors.description}
                       info='Tell us about the program that you were in' />
                     <input type='submit' value='Submit' className='btn btn-info btn-block mt-4 lastComponent' />
                   </form>
                 </div>
               </div>
             </div>
           </div>;
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation}
)(withRouter(AddEducation));
// if we want to redirect by an action, we need withRouter
