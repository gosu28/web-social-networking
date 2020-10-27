import React, { Component } from 'react';
export default class Avatar extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <img
                    src={this.props.src}
                    alt={this.props.alt}
                    title={this.props.title}
                    className="avatar_img"
                   
                    
                />
            </>
        )
    }
}