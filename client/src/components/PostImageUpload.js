import React, { Component } from 'react';
import { UploadImageIcon } from './Icons';
export default class PostImageUpload extends Component {
  render() {
    return (
      <>
        <input
          className="post_image_upload_input"
          name="photo"
          onChange={this.props.handleChange}
          type="file"
          id="post-image"
          accept="image/*"
        />
        <label htmlFor="post-image" className="post_image_upload_label">
          <UploadImageIcon />
        </label>
      </>
    );
  }
}
