import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from 'context'
export default class DefaultHeader extends Component{
    static contextType = AuthContext;
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <nav className="navigation">
                <div className="navigation-logo">
                    <a href="#">
                        <img 
                            src="assets/images/logo.png"
                            alt="logo"
                            title="logo"
                            className="navigation__logo"
                        />
                    </a>
                </div>
                
                <div className="navigation__search-container">
                    <i className="fa fa-search"></i>
                    <input type="text" placeholder="Search"/>
                </div>
                <div className="navigation__icons">
                    <a href="#" class="navigation__link">
                        <i className="fa fa-compass"></i>
                    </a>
                    <a href="#" className="navigation__link">
                        <i className="fa fa-heart-o"></i>
                    </a>
                    <a href="#" className="navigation__link">
                        <i className="fa fa-user-o"></i>
                    </a>
                </div>
            </nav>
        );
    }
}