import React, { Component } from 'react';
import Post from '../../components/Post';
import Suggestions from '../../components/Suggestions';
import PostApi from '../../api/PostApi';
import UserApi from '../../api/UserApi';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      userData: null,
    };
    this.PostApi = new PostApi();
    this.UserApi = new UserApi();
  }
  componentDidMount() {
    this.getFeedData();
    this.getUserData();
  }
  getFeedData = async () => {
    let res = await this.PostApi.getPosts();
    console.log(res);
    if (res && res.success) {
      this.setState({
        data: res.data,
      });
    }
  };
  getUserData = async () => {
    let res = await this.UserApi.getUser();
    if (res && res.status === 'success') {
      this.setState({
        userData: res.user,
      });
    }
  };
  render() {
    const { data, userData } = this.state;

    return (
      <div className="mt-4">
        <div className="container d-flex justify-content-center">
          <div className="col-9">
            {data.length > 0 ? (
              <div className="row">
                {data.map((post) => (
                  <Post key={post._id} post={post} />
                ))}
                {userData && <Suggestions user={userData} />}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
