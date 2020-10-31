import React, { Component } from 'react';
import { HeartIcon, CommentIcon } from './Icons';
export default class PostPreview extends Component {
  render() {
    const { post } = this.props;
    const photo = `${process.env.REACT_APP_URL}image/posts/${post.photo}`;
    return (
      <div className="container-overlay">
        <img src={photo} alt="post" />
        <div className="overlay">
          <div className="overlay-content">
            <span>
              <HeartIcon /> {post.likes.length}
            </span>
            <span>
              <CommentIcon /> {post.comments.length}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
