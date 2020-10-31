import React, { Component } from 'react';
import PostPreview from '../../components/PostPreview';
import ProfileHeader from '../../components/ProfileHeader';
import UserApi from '../../api/UserApi';
import PostApi from '../../api/PostApi';
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      postData: null,
    };
    this.UserApi = new UserApi();
    this.PostApi = new PostApi();
  }
  componentDidMount() {
    this.getUserData();
    this.getPostByMe();
  }
  getUserData = async () => {
    let res = await this.UserApi.getUser();

    if (res && res.status === 'success') {
      this.setState({
        userData: res.user,
      });
    }
  };
  getPostByMe = async () => {
    let res = await this.PostApi.getPostByUser();
    if (res && res.status === 'success') {
      this.setState({
        postData: res.post,
      });
    }
  };
  render() {
    const { userData, postData } = this.state;
    return (
      <div>
        {/* <ProfileHeader />
                <PostPreview /> */}
        <div className="mt-4">
          <div className="container d-flex justify-content-center">
            <div className="col-9">
              {userData && <ProfileHeader user={userData} />}
              <div className="post-preview-wrapper">
                {postData &&
                  postData.map((post) => <PostPreview post={post} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
