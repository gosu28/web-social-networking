import React, { Component } from 'react';
import PostPreview from '../../components/PostPreview';
import ProfileHeader from '../../components/ProfileHeader';
import UserApi from '../../api/UserApi';
import PostApi from '../../api/PostApi';
import { PostIcon, SavedIcon } from '../../components/Icons';
import Placeholder from '../../components/Placeholder';
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: null,
      tab: 'POSTS',
    };
    this.UserApi = new UserApi();
  }
  componentDidMount() {
    this.getUserData();
  }
  getUserData = async () => {
    const userId = this.props.match.params.id;
    let res = await this.UserApi.getUserById(userId);

    if (res && res.success) {
      this.setState({
        userData: res.data,
      });
    }
  };
  render() {
    const { userData, tab } = this.state;
    return (
      <div>
        {/* <ProfileHeader />
                <PostPreview /> */}
        <div className="mt-4">
          <div className="container d-flex justify-content-center">
            <div className="col-9">
              {userData && <ProfileHeader user={userData} />}
              <hr />

              <div className="profile-tab">
                <div
                  style={{ fontWeight: tab === 'POSTS' ? 500 : '' }}
                  onClick={() => this.setState({ tab: 'POSTS' })}
                >
                  <PostIcon />
                  <span>Posts</span>
                </div>
                <div
                  style={{ fontWeight: tab === 'SAVED' ? 500 : '' }}
                  onClick={() => this.setState({ tab: 'SAVED' })}
                >
                  <SavedIcon />
                  <span>Saved</span>
                </div>
              </div>

              {/* {tab === 'POSTS' && (
               
              )} */}

              {/* {tab === 'SAVED' && (
                <>
                  {profile?.savedPosts?.length === 0 ? (
                    <Placeholder
                      title="Saved"
                      text="Save photos and videos that you want to see again"
                      icon="bookmark"
                    />
                  ) : (
                    <PostPreview posts={profile?.savedPosts} />
                  )}
                </>
              )} */}
              <div className="post-preview-wrapper">
                {userData?.posts?.length === 0 ? (
                  <div></div>
                ) : (
                  <>
                    {userData &&
                      userData.posts.map((post) => <PostPreview post={post} />)}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
