import usersService from '../services/users.service.js';
import { Response } from '../utils/response/response.js';

class UsersController {
  constructor() {
    this.usersService = usersService;
  }

  getUserInfo = async (req, res, next) => {
    try {
      const user = await this.usersService.getUser(req.user);

      return res.status(200).json(new Response('success', { user }));
    } catch (err) {
      next(err);
    }
  };

  getAllUsers = async (req, res, next) => {
    try {
      const users = await this.usersService.getAllUsers();

      return res.status(200).json(new Response('success', { users }));
    } catch (err) {
      next(err);
    }
  };
}

const usersController = new UsersController();

export default usersController;
