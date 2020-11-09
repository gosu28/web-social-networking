import React, { Component } from 'react';
import { HeartIcon, CommentIcon } from './Icons';
export default class PostPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { post } = this.props;

    const photo =
      post && `${process.env.REACT_APP_URL}image/posts/${post.photo}`;
    return (
      <>
        {post && (
          <div className="container-overlay">
            <img src={photo} alt="post" />
            <div className="overlay">
              <div className="overlay-content">
                <span>
                  <HeartIcon /> {post.likesCount}
                </span>
                <span>
                  <CommentIcon /> {post.commentsCount}
                </span>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
