import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context';
import {
  InboxIcon,
  HomeIcon,
  HeartIcon,
  ExploreIcon,
} from '../../components/Icons';
import UserApi from '../../api/UserApi';

export default class DefaultHeader extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
    };
    this.UserApi = new UserApi();
  }
  componentDidMount() {
    this.getUserData();
  }
  getUserData = async () => {
    let res = await this.UserApi.getUser();
    console.log(res);
    if (res && res.status) {
      this.setState({
        userData: res.data,
      });
    }
  };
  render() {
    const { userData } = this.state;

    const photoUrl = userData
      ? `${process.env.REACT_APP_URL}image/users/${userData.photo}`
      : 'assets/images/default.jpg';
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container justify-content-center">
            <div className="d-flex flex-row justify-content-between align-items-center col-9">
              <Link className="navbar-brand" to="/">
                <img src="assets/images/ig-logo.png" alt="" loading="lazy" />
              </Link>
              <div>
                <form className="form-inline my-2 my-lg-0">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </form>
              </div>
              <div className="d-flex flex-row">
                <ul className="list-inline m-0">
                  <li className="list-inline-item">
                    <a href="#" className="link-menu">
                      <HomeIcon />
                    </a>
                  </li>
                  <li className="list-inline-item ml-2">
                    <a href="#" className="link-menu">
                      <InboxIcon />
                    </a>
                  </li>
                  <li className="list-inline-item ml-2">
                    <a href="#" className="link-menu">
                      <ExploreIcon />
                    </a>
                  </li>
                  <li className="list-inline-item ml-2">
                    <a href="#" className="link-menu">
                      <HeartIcon />
                    </a>
                  </li>
                  <li className="list-inline-item ml-2 align-middle">
                    <Link to="/profile" className="link-menu">
                      <div className="rounded-circle overflow-hidden d-flex justify-content-center align-items-center border topbar-profile-photo">
                        <img
                          src={photoUrl}
                          alt="..."
                          style={{
                            transform: 'scale(1.5)',
                            width: '100%',
                            position: 'absolute',
                            left: 0,
                          }}
                        />
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
