import React, { Component } from 'react';
import { BookmarkIcon, PostIcon } from './Icons';
export default class Placeholder extends Component {
  render() {
    const { title, icon, text } = this.props;
    return (
      <div className="placeholder_wrapper">
        {icon === 'bookmark' && <BookmarkIcon />}
        {icon === 'post' && <PostIcon />}
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    );
  }
}
