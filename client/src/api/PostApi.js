import BaseApi from './BaseApi';

export default class PostApi extends BaseApi {
  getPosts = async () => {
    try {
      let urlBase = this.makeUrl('feed');
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
  getPostByUser = async () => {
    try {
      let urlBase = this.makeUrl('postByUser');
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
  getPostById = async (id) => {
    try {
      let urlBase = this.makeUrl(`${id}`);
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
  toggleLike = async (id) => {
    try {
      let urlBase = this.makeUrl(`${id}`, 'togglelike');
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
  getComment = async (id) => {
    try {
      let urlBase = this.makeUrl(`${id}`, 'getComment');
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
  addComment = async (id, comment) => {
    try {
      let urlBase = this.makeUrl(`${id}`, 'comments');
      let result = await this.execute_post(urlBase, comment);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
  addNewPost = async (file, content) => {
    try {
      let urlBase = this.makeUrl('post');
      let result = await this.uploadFile(urlBase, file, content);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
}
