import Services from "./class.services.js";
import factory from "../persistence/daos/factory.js";
import { sendMail } from "./mailing.service.js";
const { userDao } = factory;

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }

  register = async (user) => {
    try {
      const response = await this.dao.register(user);
      await sendMail(user, "register");
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  login = async (user) => {
    try {
      const userExist = await this.dao.login(user);
      return userExist;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  async resetPass(user) {
    try {
      const token = await userDao.resetPass(user);

      return token ? await sendMail(user, "resetPass", token) : false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updatePass(user, password) {
    try {
      const result = await userDao.updatePass(user, password);

      if (result) await sendMail(user, "updatePass");

      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
