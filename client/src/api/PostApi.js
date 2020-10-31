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
}
