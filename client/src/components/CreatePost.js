import React, { Component } from 'react';
import PostApi from '../api/PostApi';
import PostImageUpload from './PostImageUpload';
import { Redirect } from 'react-router-dom';
export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      photo: '',
      content: '',
    };
    this.PostApi = new PostApi();
  }
  handleOnFocus = () => {
    this.setState({ isFocused: true });
  };
  handleReset = () => {
    this.setState({
      isFocused: false,
      photo: '',
      content: '',
    });
  };
  handleTitleChange = (e) => this.setState({ content: e.target.value });
  handlePostImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    this.setState({
      isFocused: true,
      photo: file,
    });

    e.target.value = null;
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { photo, content } = this.state;

    const newPost = { content };

    const res = await this.PostApi.addNewPost(photo, newPost);
    if (res.status === 'success') {
      this.handleReset();
    }
  };
  render() {
    const isShareDisabled = true;
    const { isFocused, photo, content } = this.state;
    return (
      <>
        {isFocused && (
          <div className="create_post_overlay" onClick={this.handleReset}></div>
        )}
        <div class="col-8 create_post" style={{ width: 523 }}>
          <form>
            <div className="create_post_wrapper">
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <img
                  src="assets/images/avatar.jpg"
                  alt="..."
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <textarea
                style={{ height: isFocused ? 80 : 40 }}
                type="textarea"
                name="title"
                focus={this.state.isFocused}
                onFocus={this.handleOnFocus}
                placeholder="Add a post"
                onChange={this.handleTitleChange}
                value={content}
              />
              {!isFocused && (
                <PostImageUpload handleChange={this.handlePostImageUpload} />
              )}
            </div>
            {photo && (
              <div style={{ marginBottom: 20 }}>
                <div className="image_preview_container">
                  <img
                    className="image_preview"
                    src={URL.createObjectURL(photo)}
                  />
                </div>
              </div>
            )}
            {isFocused && (
              <div className="options_layout">
                <PostImageUpload handleChange={this.handlePostImageUpload} />
                <div className="button_option">
                  <button
                    type="button"
                    onClick={this.handleReset}
                    className="button_option_cancel"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={this.handleSubmit}
                    className="button_option_share"
                  >
                    Share
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </>
    );
  }
}