import React, { Component } from 'react';
import PostPreview from '../../components/PostPreview';
import ProfileHeader from '../../components/ProfileHeader';
export default class Profile extends Component {
  render() {
    return (
      <div>
        {/* <ProfileHeader />
                <PostPreview /> */}
        <div className="mt-4">
          <div className="container d-flex justify-content-center">
            <div className="col-9">
              <ProfileHeader />
              <PostPreview />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
