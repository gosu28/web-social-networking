import React, { Component } from 'react';
import Post from '../../components/Post';
import Suggestions from '../../components/Suggestions';
export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="mt-4">
        <div className="container d-flex justify-content-center">
          <div className="col-9">
            <div className="row">
              <Post />
              <Suggestions />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
