import BaseApi from './BaseApi';

export default class UserApi extends BaseApi {
  getUser = async () => {
    try {
      let urlBase = this.makeUrl('users', 'singleUser');
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
  getAllUser = async () => {
    try {
      let urlBase = this.makeUrl('users', 'allUsers');
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
  getUserById = async (id) => {
    try {
      let urlBase = this.makeUrl('users', `${id}`, 'getUser');
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
  getFollow = async (id) => {
    try {
      let urlBase = this.makeUrl('users', `${id}`, 'follow');
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
  getUnFollow = async (id) => {
    try {
      let urlBase = this.makeUrl('users', `${id}`, 'unfollow');
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
}
