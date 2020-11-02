import React, { Component } from 'react';
import UserApi from '../api/UserApi';
export default class Follow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followingState: this.props.isFollowing,
    };
    this.UserApi = new UserApi();
  }
  handleFollow = async () => {
    const { followingState } = this.state;
    const { userId } = this.props;
    if (followingState) {
      this.setState({
        followingState: false,
      });
      await this.UserApi.getUnFollow(userId);
    } else {
      this.setState({
        followingState: true,
      });
      await this.UserApi.getFollow(userId);
    }
  };
  render() {
    const { followingState } = this.state;
    return followingState ? (
      <button className="btn  btn-sm p-0 btn-ig " onClick={this.handleFollow}>
        <span style={{ color: '#262626' }}>Following</span>
      </button>
    ) : (
      <button className="btn  btn-sm p-0 btn-ig " onClick={this.handleFollow}>
        <span style={{ color: '#0095f6' }}>Follow</span>
      </button>
    );
  }
}
