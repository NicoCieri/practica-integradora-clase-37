import MongoDao from "./mongo.dao.js";
import { UserModel } from "./models/user.model.js";
import { createHash, isValidPassword } from "../../../utils.js";
import jwt from "jsonwebtoken";
import config from "../../../config/config.js";

const SECRET_KEY = config.SECRET_KEY_JWT;

export default class UserDaoMongo extends MongoDao {
  constructor() {
    super(UserModel);
  }

  /**
   * Genera el token del usuario
   * @param {*} user
   * @param {*} timeExp
   * @returns token
   */
  generateToken(user, timeExp) {
    const payload = {
      userId: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: timeExp,
    });
    return token;
  }

  async register(user) {
    try {
      const { email, password } = user;
      const existUser = await this.model.findOne({ email });
      if (!existUser)
        return await this.model.create({
          ...user,
          password: createHash(password),
        });
      else return false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.getByEmail(email);
      if (userExist) {
        const passValid = isValidPassword({ user: userExist, password });
        if (!passValid) return false;
        else return this.generateToken(userExist, "15m");
      }
      return false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getByEmail(email) {
    try {
      const userExist = await this.model.findOne({ email });

      return userExist ? userExist : false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async resetPass(user) {
    try {
      const { email } = user;
      const userExist = await this.getByEmail(email);

      return userExist ? this.generateToken(userExist, "1h") : false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updatePass(user, password) {
    try {
      const isEqual = isValidPassword({ user, password });
      if (isEqual) return false;

      const newPassword = createHash(password);
      return await this.update(user._id, { password: newPassword });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
