
import React, { Component } from 'react';
import { login, authenticate } from "../../api/AuthenApi";
import { AuthContext } from '../../context'
export default class Login extends Component{
  static contextType = AuthContext;
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            loading:false
        }
    }

    handleChange = name => e => this.setState({ [name]: e.target.value });

    onLogin =async  () => {
        
        this.setState({ loading: true })
        const { email, password } = this.state;
        const user = { email, password };
        const response = await login(user);
        
      if (response.status === "success" && response.token) {
        localStorage.setItem('token', response.token);
          this.context.onLogin();
            // window.location.reload()
        } else {
            this.setState({ isValid: false, loginError: true });
            this.setState({ loading: false })
        }
      return true;
    }
    render() {
        const {password,email}=this.state
        return (
            <body className="no-padding">
            <main className="login">
        <div className="login__column">
          <img src="/assets/images/phone.png" alt="Phone Image" title="Phone Image" className="login__phone-image" />
        </div>
        <section className="login__column">
          <form className="login__section login__sign-in">
            <img src="/assets/images/logo.png" alt="Logo" title="Logo" className="login__logo" />
            <div className="login__form">
              <div className="login__input-container">
                <input type="text" placeholder="Username" required value={email}  className="login__input" onChange={this.handleChange('email')} />
              </div>
              <div className="login__input-container">
                <input type="password" placeholder="Password" required value={password}  className="login__input" onChange={this.handleChange('password')} />
                <a href="#" className="login__form-link">Forgot?</a>
              </div>
              <div className="login__input-container">
                <button onClick={this.onLogin} className="login__input login__input--btn">
                    Sign in
                </button>
              </div>
            </div>
            <span className="login__divider">or</span>
            <a className="login__fb-link" href="#">
              <i className="fa fa-facebook-square fa-lg" aria-hidden="true" /> Log in with Facebook
            </a>
          </form>
          <div className="login__section login__sign-up">
            <span className="login__text">
              Don't have an account?
              <a href="#" className="login__link">
                Sign up
              </a>
            </span>
          </div>
        </section>
      </main>
        </body>
        );
    }
}