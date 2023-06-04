import bcrypt from 'bcrypt';
import UsersModel from '../models/users.model.js';
import { generateRandomString } from '../utils/util.js';

class AuthService {
  constructor() {
    this.UsersModel = UsersModel;
  }

  userRegistration = async (data) => {
    data.secret = generateRandomString(32);

    if (data.isRider) {
      data.roles = ['user', 'rider'];
    }

    const user = new this.UsersModel(data);

    const newUser = await user.save();

    return newUser;
  };

  userLogin = async (data) => {
    const user = await this.UsersModel.findOne({ email: data.email });

    if (!user) {
      throw new Error('user not found!');
    }

    if (!bcrypt.compareSync(data.password, user.password)) {
      throw new Error('Passwords do not match');
    }

    return user;
  };
}

const authService = new AuthService();

export default authService;
