import React, { Component } from 'react';

import LikePost from './LikePost';

import SavePost from './SavePost';
import {
  MoreIcon,
  CommentIcon,
  InboxIcon,
  ExploreIcon,
  HeartIcon,
} from './Icons';
import Comment from './Comment';

export default class Post extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { post } = this.props;
    const photoUrl = `${process.env.REACT_APP_URL}image/posts/${post.photo}`;
    const AvatarUrl = `${process.env.REACT_APP_URL}image/users/${post.postedBy.photo}`;

    return (
      <div className="col-8">
        {/* START OF POSTS */}
        <div className="d-flex flex-column mt-4 mb-4">
          <div className="card">
            <div className="card-header p-3 bg-white">
              <div className="d-flex flex-row align-items-center">
                <div className="rounded-circle overflow-hidden d-flex justify-content-center align-items-center border border-danger post-profile-photo mr-3">
                  <img
                    src={AvatarUrl}
                    alt="..."
                    style={{
                      transform: 'scale(1.5)',
                      width: '100%',
                      position: 'absolute',
                      left: 0,
                    }}
                  />
                </div>
                <span style={{ fontSize: 16, fontWeight: 600 }}>
                  {post.postedBy.name}
                </span>
              </div>
            </div>
            <div className="card-body p-0">
              <div>
                <img
                  className="embed-responsive-item"
                  src={photoUrl}
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </div>
              <div className="d-flex flex-row justify-content-between pl-3 pr-3 pt-3 pb-1">
                <ul className="list-inline d-flex flex-row align-items-center m-0">
                  <li className="list-inline-item">
                    <button className="btn p-0">
                      <HeartIcon />
                    </button>
                  </li>
                  <li className="list-inline-item ml-2">
                    <button className="btn p-0">
                      <CommentIcon />
                    </button>
                  </li>
                  <li className="list-inline-item ml-2">
                    <button className="btn p-0">
                      <InboxIcon />
                    </button>
                  </li>
                </ul>
                <div>
                  <button className="btn p-0">
                    <SavePost />
                  </button>
                </div>
              </div>
              <div className="pl-3 pr-3 pb-2">
                {post.likes.length !== 0 && (
                  <strong className="d-block">
                    {post.likes.length}
                    {post.likes.length > 1 ? 'likes' : 'like'}
                  </strong>
                )}
                <strong className="d-block">{post.postedBy.name}</strong>
                <p className="d-block mb-1">{post.content}</p>
                {post.comments.length > 2 && (
                  <button className="btn p-0">
                    <span className="text-muted">
                      View all {post.comments.length} comments
                    </span>
                  </button>
                )}
                {post.comments?.slice(0, 2).map((comment) => (
                  <Comment />
                ))}
                <small className="text-muted">{post.created}</small>
              </div>
              <div className="position-relative comment-box">
                <form>
                  <input
                    className="w-100 border-0 p-3 input-post"
                    placeholder="Add a comment..."
                  />
                  <button className="btn  position-absolute btn-ig">
                    <span style={{ color: '#0095f6' }}>Post</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* END OF POSTS */}
      </div>
    );
  }
}
