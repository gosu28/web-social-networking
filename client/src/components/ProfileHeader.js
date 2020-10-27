import React, { Component } from 'react';
import { OptionsIcon } from "./Icons";
export default class ProfileHeader extends Component{
    render() {
        return (
            <div className="profile-header-wrapper">
                <img className="avatar" src="assets/images/avatar.jpg" alt="avatar" />
                <div className="profile-info">
                    <div className="profile-meta">
                        <h2>gintama_nv</h2>
                        <div className="options">
                            <button
                                className="button-edit-profile"
                //   onClick={() => history.push("/accounts/edit")}
                            >
                                Edit Profile
                            </button>
                            <OptionsIcon/>
                        </div>
            {/* {profile?.isMe ? (
              <div className="options">
                <Button
                  secondary
                  onClick={() => history.push("/accounts/edit")}
                >
                  Edit Profile
                </Button>
                <OptionsIcon onClick={handleLogout} />
              </div>
            ) : (
              <Follow
                isFollowing={profile?.isFollowing}
                incFollowers={incFollowers}
                decFollowers={decFollowers}
                userId={profile?._id}
              />
            )} */}
                    </div>

                    <div className="profile-stats">
                        <div className= "profile-stats-info">
                        <span style={{fontWeight:'bold'}}>22</span>
                        <span > posts</span>
                        </div> 

                        <div className= "profile-stats-info">
                        <span style={{fontWeight:'bold'}}>86</span>
                        <span > followers</span>
                        </div> 

                        <div className= "profile-stats-info">
                        <span style={{fontWeight:'bold'}}>569</span>
                        <span > following</span>
                        </div> 

            
          </div>

          <div className="bio" style={{marginTop:16}}>
            <span style={{fontWeight:'bold'}}>Nguyễn Thành</span>
            <p>__tranggg__</p>
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