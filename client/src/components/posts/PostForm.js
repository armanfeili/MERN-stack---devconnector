import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //   componentWillReceiveProps (newProps) {
  //     if (newProps.errors) {
  //       this.setState({ errors: newProps.errors })
  //     }
  //   }

  componentDidUpdate (prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  onSubmit (e) {
    e.preventDefault();

    // we want to get the user, so we know who submited the form
    // user is part of the auth state, that's the currently loged in user
    const {user} = this.props.auth;

    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    // we pass newPost to action
    this.props.addPost(newPost);
    // clear the text feild
    this.setState({text: ''});
  }
  onChange (e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render () {
    const {errors} = this.state;

    return (
      <div className='post-form mb-3'>
        <div className='card card-info'>
          <div className='card-header bg-info text-white'>
            Say Somthing...
          </div>
          <div className='card-body'>
            <form onSubmit={this.onSubmit}>
              <div className='form-group'>
                <TextAreaFieldGroup
                  placeholder='Create a post'
                  name='text'
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text} />
              </div>
              <button type='submit' className='btn btn-dark'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// if we want to get errors, we need to connect to redux
export default connect(mapStateToProps, {addPost})(PostForm);
