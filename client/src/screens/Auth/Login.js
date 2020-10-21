import React, { Component } from 'react';
import { login, authenticate } from "../../api/AuthenApi";

export default class Login extends Component{
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            loading:false
        }
    }

    handleChange = name => e => this.setState({ [name]: e.target.value });

    onLogin = async () => {
        this.setState({ loading: true })
        const { email, password } = this.state;
        const user = { email, password };
        const response = await login(user);
        const responseData = JSON.parse(response);
        if (response.status === 200 && responseData.token) {
            localStorage.setItem('token', response);
            this.context.onLogin();
        } else {
            this.setState({ loginError: true });
            this.setState({loading:false})
        }
        return true;
    }
    render() {
        
    }
}