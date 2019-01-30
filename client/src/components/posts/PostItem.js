import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
// we bring classnames, because we want to change the class of buttons
// in calssnames, first argument is initial className, second argument can be an object that
// contains new className with a condition, and it implement that className if the condition was true
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }
  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  // we want to find out if the user, liked the post or not
  // this function is for implementing classnames package
  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      // if the user was in likes array
      return true;
    } else {
      return false;
    }
  }

  // *** classnames npm *** //

  // classNames('foo', 'bar'); // => 'foo bar'
  // classNames('foo', { bar: true }); // => 'foo bar'
  // classNames({ 'foo-bar': true }); // => 'foo-bar'
  // classNames({ 'foo-bar': false }); // => ''
  // classNames({ foo: true }, { bar: true }); // => 'foo bar'
  // classNames({ foo: true, bar: true }); // => 'foo bar'

  render() {
    const { post, auth, showActions } = this.props;
    // showActions is comming from defaultProps, so it's part of the props (properties)
    // we get this.props.post because we passed in by PostFeed.js
    // we get this.props.auth because we have auth in state application

    // each post has it's own name,text,id,avatar. so in src in <img>, we can use src={post.avatar}
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              // we used <PostItem /> in Post.js , but we don't want to show actions like :like,dislike,comment in that
              // so we create a property name showActions, and we pass true to it by default.
              // it's responsible for showing mentioned buttons
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  {" "}
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes) // if true, className, changes
                    })}
                  />{" "}
                  <span className="badge badge-light">
                    {post.likes.length} {/* here we get number of likes */}
                  </span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  {" "}
                  {/* // here we want to bind both this and post._id{" "} */}
                  <i className="text-secondary fas fa-thumbs-down" />{" "}
                </button>
                <Link
                  to={`/post/${post._id}`} // {/* go to a post by ti's id*/}
                  className="btn btn-info mr-1"
                >
                  {" "}
                  Comments{" "}
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={
                      this.onDeleteClick.bind(this, post._id) // we want to know if it's the current user
                    } //   {/* we pass post._id so we know which post we're deleting*/}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span> // null is for else
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true // we set showActions to true by default
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
  // we don't need to get post from state, because it passed in from PostFeed.js
  // but we need to get auth from state application to know who's posted Who's! so
  // if this is the current user, we want them to be able to delete it
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
