import React, { Component } from 'react';
import { HeartIcon, FilledHeartIcon } from './Icons';
import PostApi from '../api/PostApi';
export default class LikePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: this.props.isLiked,
    };
    this.PostApi = new PostApi();
  }
  handleToggleLike = async () => {
    const { liked } = this.state;
    const { decLikes, incLikes, postId } = this.props;
    if (liked) {
      this.setState({ liked: false });
      decLikes();
      await this.PostApi.toggleLike(postId);
    } else {
      this.setState({ liked: true });
      incLikes();
      await this.PostApi.toggleLike(postId);
    }
  };
  render() {
    const { liked } = this.state;
    return liked ? (
      <FilledHeartIcon onClick={this.handleToggleLike} />
    ) : (
      <HeartIcon onClick={this.handleToggleLike} />
    );
  }
}
