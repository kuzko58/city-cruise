import UsersModel from '../models/users.model.js';

class UsersService {
  constructor() {
    this.UsersModel = UsersModel;
  }

  getUser = async (data) => {
    const user = await this.UsersModel.findById(data.id).populate('rides');

    return user;
  };

  getAllUsers = async () => {
    const users = await this.UsersModel.find().populate('rides');

    return users;
  };
}

const usersService = new UsersService();

export default usersService;
