import React, { Component } from 'react';
import Follow from './Follow';
import { OptionsIcon } from './Icons';
export default class ProfileHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { user } = this.props;
    console.log(user);

    const photoUrl = user
      ? `${process.env.REACT_APP_URL}image/users/${user.photo}`
      : 'assets/images/default.jpg';
    return (
      <div className="profile-header-wrapper">
        <img className="avatar" src={photoUrl} alt="avatar" />
        <div className="profile-info">
          <div className="profile-meta">
            <h2>{user.name}</h2>
            {user?.isMe ? (
              <div className="options">
                <button
                  className="button-edit-profile"
                  //   onClick={() => history.push("/accounts/edit")}
                >
                  Edit Profile
                </button>
                <OptionsIcon />
              </div>
            ) : (
              <Follow isFollowing={user.isFollowing} userId={user._id} />
            )}

            {/* {user?.isMe ? (
              <div className="options">
                <Button
                  secondary
                  // onClick={() => history.push("/accounts/edit")}
                >
                  Edit Profile
                </Button>
                <OptionsIcon />
              </div>
            ) : (
              <Follow
                isFollowing={user?.isFollowing}
                incFollowers={incFollowers}
                decFollowers={decFollowers}
                userId={user?._id}
              />
            )} */}
          </div>

          <div className="profile-stats">
            <div className="profile-stats-info">
              <span style={{ fontWeight: 'bold' }}>{user.postCount}</span>
              <span> posts</span>
            </div>

            <div className="profile-stats-info">
              <span style={{ fontWeight: 'bold' }}>{user.followersCount}</span>
              <span> followers</span>
            </div>

            <div className="profile-stats-info">
              <span style={{ fontWeight: 'bold' }}>{user.followingCount}</span>
              <span> following</span>
            </div>
          </div>

          <div className="bio" style={{ marginTop: 16 }}>
            <span style={{ fontWeight: 'bold' }}>{user.fullname}</span>
            <p>{user.bio}</p>
            {/* <a
              href={profile?.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              "https://www.instagram.com/gintama_nv/"
            </a> */}
          </div>
        </div>
      </div>
    );
  }
}
