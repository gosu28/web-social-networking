import React, { Component } from 'react';
import UserApi from '../api/UserApi';
import PostApi from '../api/PostApi';
export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: null,
      user: null,
    };
    this.PostApi = new PostApi();
    this.UserApi = new UserApi();
  }
  componentDidMount() {
    this.getComment();
  }
  getComment = async () => {
    const comment = await this.PostApi.getComment(this.props.comment);
    this.setState(
      {
        comment,
      },
      this.getUser,
    );
  };
  getUser = async () => {
    const { comment } = this.state;
    const user = await this.UserApi.getUserById(comment.data.user);

    this.setState({
      user,
    });
  };
  render() {
    const { comment, user } = this.state;
    return (
      user && (
        <div className="d-flex">
          <strong className="d-block">{user.user.name}</strong>
          <span className="ml-2">{comment.data.text}</span>
        </div>
      )
    );
  }
}
