import { Router } from 'express';
import usersController from '../../controllers/users.controller.js';
import usersAuth from '../../middlewares/auth/users.auth.js';

class UsersRoutes {
  #router;

  constructor() {
    this.#router = Router();
    this.usersController = usersController;
    this.usersAuth = usersAuth;
  }

  get router() {
    return this.#router;
  }

  registerRoutes = () => {
    this.#router.get('/info', this.usersAuth.authenticate, this.usersController.getUserInfo);

    this.#router.get(
      '/all',
      this.usersAuth.authenticate,
      this.usersAuth.isAdmin,
      this.usersController.getAllUsers,
    );
  };
}

const usersRoutes = new UsersRoutes();

usersRoutes.registerRoutes();

export default usersRoutes;
