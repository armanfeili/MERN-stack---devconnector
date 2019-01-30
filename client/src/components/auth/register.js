import React, { Component } from 'react';
// import classnames from 'classnames'
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
// withRouter() helps us to redirect users from a route to another route within an action file.

// whenever we want to use redux in a component, we need to import connect. that's going to turn a component into a container
import { connect } from 'react-redux';
// also we need to import action to connect() it with component.
import { registerUser } from '../../actions/authActions';

import TextFieldGroup from '../common/TextFieldGroup';
class Register extends Component {
  constructor () {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this); // we need to bind this because the onChange method doesn't recognize this .
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount () {
    // if the user already logedin, we want to redirect the page to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   // this runs when component receives new properties
  //   // here we can test for certain properties -> so actually we map into application state
  //   if (nextProps.errors) {
  //     // if there is errors props ,then we set errors of component state to that
  //     this.setState({ errors: nextProps.errors })
  //     // so if there was errors in redux, we get them and put them into component state by mapStateToProps and componentWillReceiveProps()
  //   }
  // }

  // or

  componentDidUpdate (prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    } // always make sure that errors in component state in similar to errors in application state
  } // this always rerun component,till the 'then()' part of the action happens

  // or

  // static getDerivedStateFromProps = nextProps => {
  //   return { errors: nextProps.errors }
  // }

  // if we use arrow function for onChange and onSubmit, we don't need to bind this anymore.
  onChange (event) {
    // always in methods like onChange,onClick,onScroll,... event object will pass into them as argument
    // we should asign any value of target event, to it's target field by the name of that input field.
    // the name here can be: name,email,password,password2
    this.setState({ [event.target.name]: event.target.value });
  // if we go to inspect of browser,in React tab, in Register component, we can see the state application of this component
  }

  onSubmit (e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history); // calling the action -> if we don't write this line of code, nothing will work!!!
    // we use this.props.history to redirect a route to another route within the action (registerUser action)

    //   axios.post('/api/users/register', newUser) // newUser will pass into server as req.body
    //     .then(res => console.log(res.data)) // it returns a promise so we can log response (actual user)
    //     .catch(err => console.log(err.response.data)); // logging just (err), show us an error with status
    // // but logging err.response.data show us all errors that we set as an object
    // // since we don't add correct info, newUser will never create

  // axios
  //   .post("/api/users/register", newUser)
  //   .then(res => console.log(res.data))
  //   .catch(err => this.setState({ errors: err.response.data }))
  }

  render () {
    // we should gather errors coming from server, so if there were any errors, we should add some classnames and elements.
    const { errors } = this.state;
    // as same as: const errors = this.state.errors
    // we could say const {errors} = this.props.errors , but we used componentWillReceiveProps()

    // return (
    //   <div className="register">
    //     <div className="container">
    //       <div className="row">
    //         <div className="col-md-8 m-auto">
    //           <h1 className="display-4 text-center">Sign Up</h1>
    //           <p className="lead text-center">
    //             Create your DevConnector account
    //           </p>
    //           <form noValidate onSubmit={this.onSubmit}>
    //             {/* noValidate helps to prevent default HTML errors */}
    //             <div className="form-group">
    //               <input
    //                 type="text"
    //                 className={classnames("form-control form-control-lg", {
    //                   "is-invalid": errors.name
    //                   // it gets default classes as first parameters and conditional classes as second parameter
    //                 })}
    //                 placeholder="Name"
    //                 name="name"
    //                 value={
    //                   this.state.name // in here 'is-invalid' only add to classNames if errors.name exists. // classnames() accept 2 parameters. 1) the classNames we want as default, 2) the condetional classNames
    //                 }
    //                 onChange={this.onChange}
    //               />
    //               {errors.name && (
    //                 <div className="invalid-feedback">{errors.name}</div>
    //               )
    //               // here we add a <div> element if errors.name was exist
    //               }
    //             </div>
    //             <div className="form-group">
    //               <input
    //                 type="email"
    //                 className={classnames("form-control form-control-lg", {
    //                   "is-invalid": errors.email
    //                 })}
    //                 placeholder="Email Address"
    //                 name="email"
    //                 value={this.state.email}
    //                 onChange={this.onChange}
    //               />
    //               {errors.email && (
    //                 <div className="invalid-feedback">{errors.email}</div>
    //               )}
    //               <small className="form-text text-muted">
    //                 This site uses Gravatar so if you want a profile image, use
    //                 a Gravatar email
    //               </small>
    //             </div>
    //             <div className="form-group">
    //               <input
    //                 type="password"
    //                 className={classnames("form-control form-control-lg", {
    //                   "is-invalid": errors.password
    //                 })}
    //                 placeholder="Password"
    //                 name="password"
    //                 value={this.state.password}
    //                 onChange={this.onChange}
    //               />
    //               {errors.password && (
    //                 <div className="invalid-feedback">{errors.password}</div>
    //               )}
    //             </div>
    //             <div className="form-group">
    //               <input
    //                 type="password"
    //                 className={classnames("form-control form-control-lg", {
    //                   "is-invalid": errors.password2
    //                 })}
    //                 placeholder="Confirm Password"
    //                 name="password2"
    //                 value={this.state.password2}
    //                 onChange={this.onChange}
    //               />
    //               {errors.password2 && (
    //                 <div className="invalid-feedback">{errors.password2}</div>
    //               )}
    //             </div>
    //             <input type="submit" className="btn btn-info btn-block mt-4" />
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // )
    return (
      <div className='register'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center componentBody'>Sign Up</h1>
              <p className='lead text-center'>
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                {/* noValidate helps to prevent default HTML errors */}
                <TextFieldGroup
                  type='text'
                  placeholder='Name'
                  name='name'
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name} />
                <TextFieldGroup
                  type='email'
                  placeholder='Email Address'
                  name='email'
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info='This site uses Gravatar so if you want a profile image, use a Gravatar email' />
                <TextFieldGroup
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password} />
                <TextFieldGroup
                  type='password'
                  placeholder='Confirm Password'
                  name='password2'
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2} />
                <input type='submit' className='btn btn-info btn-block mt-4' />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  // PropTypes help us to make properties of our component, required or not
  registerUser: PropTypes.func.isRequired, // registerUser is an action but also is a property (function) of this component so it's required
  auth: PropTypes.object.isRequired, // auth is also a property of this component so it's required . auth is an object
  errors: PropTypes.object.isRequired
};

// if we want to get any state into our component, we should use mapStateToProps()
const mapStateToProps = state => ({
  auth: state.auth, // with this, we can use anything comming from state.auth with writing this.props.auth.sth
  errors: state.errors
});
// the key auth is sth we called and it can be anything(like auth2), but the value of auth in state.auth is comming from reducer.
// so it should be auth or anything it is in reducer

// connect() is like connect(mapStateToProps,mapDispatchToProps or actual actions , )(component)
export default connect(
  mapStateToProps, // if we didn't want to use state in our component, we could use null instead of mapStateToProps
  { registerUser}
)(withRouter(Register));
