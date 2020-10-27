import React, { Component } from 'react';
import Post from "../../components/Post";
import Suggestions from '../../components/Suggestions';
export default class Home extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <>
                <Post/>
            </>
            
        );
    }
}