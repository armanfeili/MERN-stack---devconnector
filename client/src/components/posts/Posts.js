import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';
import PostFeed from './PostFeed';

class Posts extends Component {
  componentDidMount () {
    this.props.getPosts();
  // we need to call getPosts() anytime we mount
  // so anytime we go to /feed route, we can see all the posts in redux extension as post>posts>0,1,2,3,4,...
  // because everytime, getPosts() is getting call and fetch all posts and fill state application
  }

  render () {
    const {posts, loading} = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    }else {
      postContent = <PostFeed posts={posts} />; // we should map throw these posts that we passed in PostFeed
    }

    return (
      <div className='feed'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post // this is the post state, and posts array is within post state
});

export default connect(mapStateToProps, {getPosts})(Posts);
