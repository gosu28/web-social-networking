import React, { Component } from 'react';
import UserApi from '../api/UserApi';
import Follow from './Follow';
export default class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
    };
    this.UserApi = new UserApi();
  }
  componentDidMount() {
    this.getAllUser();
  }
  getAllUser = async () => {
    let res = await this.UserApi.getAllUser();

    if (res && res.success) {
      this.setState({
        users: res.data,
      });
    }
  };
  getImg = (img) => {
    return `${process.env.REACT_APP_URL}image/users/${img}`;
  };
  render() {
    const { user } = this.props;
    const { users } = this.state;
    const photo = `${process.env.REACT_APP_URL}image/users/${user.photo}`;
    return (
      <div
        className="col-3 mt-4 mb-4 pr-4"
        style={{ position: 'fixed', left: '61%', top: '13%' }}
      >
        <div className="d-flex flex-row align-items-center">
          <div className="rounded-circle overflow-hidden d-flex justify-content-center align-items-center border sidenav-profile-photo">
            <img
              src={photo}
              alt="..."
              style={{
                transform: 'scale(1.5)',
                width: '100%',
                position: 'absolute',
                left: 0,
              }}
            />
          </div>
          <div className="profile-info ml-3">
            <span className="profile-info-username">{user.name}</span>
            <span className="profile-info-name" style={{ color: '#99b5d4' }}>
              {user.fullname}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <div className="d-flex flex-row justify-content-between">
            <small className="text-muted font-weight-normal">
              Suggestions For You
            </small>
            <small>See All</small>
          </div>
          <div>
            {users &&
              users.map((user) => (
                <div
                  className="d-flex flex-row justify-content-between align-items-center mt-3 mb-3"
                  key={user._id}
                >
                  <div className="d-flex flex-row align-items-center">
                    <div className="rounded-circle overflow-hidden d-flex justify-content-center align-items-center border sugest-profile-photo">
                      <img
                        src={this.getImg(user.photo)}
                        alt="..."
                        style={{
                          transform: 'scale(1.5)',
                          width: '100%',
                          position: 'absolute',
                          left: 0,
                        }}
                      />
                    </div>
                    <strong className="ml-3 sugest-username">
                      {user.name}
                    </strong>
                  </div>
                  {/* <button className="btn  btn-sm p-0 btn-ig ">
                    <span style={{ color: '#0095f6' }}>Follow</span>
                  </button> */}
                  <Follow isFollowing={user.isFollowing} userId={user._id} />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}
