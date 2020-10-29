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
}
