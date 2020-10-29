import React, { Component } from 'react';
import { HeartIcon, FilledHeartIcon } from './Icons';
export default class LikePost extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <FilledHeartIcon />;
  }
}
