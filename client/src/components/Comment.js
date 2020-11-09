import React, { Component } from 'react';

export default class Comment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { comment } = this.props;
    return (
      comment && (
        <div className="d-flex">
          <strong className="d-block">{comment.user.name}</strong>
          <span className="ml-2">{comment.text}</span>
        </div>
      )
    );
  }
}
