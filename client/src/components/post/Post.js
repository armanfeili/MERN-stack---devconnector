import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem';
// we want to use PostItem in this component too
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';
import { getPost } from '../../actions/postActions';

class Post extends Component {

  componentDidMount () {
    this.props.getPost(this.props.match.params.id);
  }

  render () {
    const {post, loading} = this.props.post;
    let postConetent;
    if (post === null || loading || Object.keys(post).length === 0) {
      // here we make sure the post is not null and is not empty
      postConetent = <Spinner />;
    }else {
      postConetent = (
        // we used <PostItem /> but we don't want to show actions like :like,dislike,comment
        // so we create a property name showActions, and we pass false to it.
        // it's responsible to avoid showing mentioned buttons
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
          {/* now that we wrote postId={} , it's part of the properties (part of the props) */}
        </div>
      );
    }
    return (
      <div className='post'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <Link to='/feed' className='btn btn-light mb-3 componentBody'> Back To Feed
              </Link>
              {postConetent}
              <div className='lastComponent'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, {getPost})(Post);
