import React, { Component } from 'react';
import Avatar from './Avatar';
export default class Suggestions extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-4 mt-4 mb-4">
        <div className="d-flex flex-row align-items-center">
          <div className="rounded-circle overflow-hidden d-flex justify-content-center align-items-center border sidenav-profile-photo">
            <img
              src="assets/images/avatar.jpg"
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
            <span className="profile-info-username">taaarann</span>
            <span className="profile-info-name" style={{ color: '#99b5d4' }}>
              dasha taran
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
            <div className="d-flex flex-row justify-content-between align-items-center mt-3 mb-3">
              <div className="d-flex flex-row align-items-center">
                <div className="rounded-circle overflow-hidden d-flex justify-content-center align-items-center border sugest-profile-photo">
                  <img
                    src="assets/images/profile-3.jpg"
                    alt="..."
                    style={{
                      transform: 'scale(1.5)',
                      width: '100%',
                      position: 'absolute',
                      left: 0,
                    }}
                  />
                </div>
                <strong className="ml-3 sugest-username">instagram</strong>
              </div>
              <button className="btn  btn-sm p-0 btn-ig ">
                <span style={{ color: '#0095f6' }}>Follow</span>
              </button>
            </div>
            <div className="d-flex flex-row justify-content-between align-items-center mt-3 mb-3">
              <div className="d-flex flex-row align-items-center">
                <div className="rounded-circle overflow-hidden d-flex justify-content-center align-items-center border sugest-profile-photo">
                  <img
                    src="assets/images/profile-4.png"
                    alt="..."
                    style={{
                      transform: 'scale(1.5)',
                      width: '100%',
                      position: 'absolute',
                      left: 0,
                    }}
                  />
                </div>
                <strong className="ml-3 sugest-username">dccomics</strong>
              </div>
              <button className="btn  btn-sm p-0 btn-ig ">
                <span style={{ color: '#0095f6' }}>Follow</span>
              </button>
            </div>
            <div className="d-flex flex-row justify-content-between align-items-center mt-3 mb-3">
              <div className="d-flex flex-row align-items-center">
                <div className="rounded-circle overflow-hidden d-flex justify-content-center align-items-center border sugest-profile-photo">
                  <img
                    src="assets/images/profile-5.jpg"
                    alt="..."
                    style={{
                      transform: 'scale(1.5)',
                      width: '100%',
                      position: 'absolute',
                      left: 0,
                    }}
                  />
                </div>
                <strong className="ml-3 sugest-username">thecw</strong>
              </div>
              <button className="btn  btn-sm p-0 btn-ig">
                <span style={{ color: '#0095f6' }}>Follow</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
