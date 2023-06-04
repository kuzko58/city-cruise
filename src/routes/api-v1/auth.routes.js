import { Router } from 'express';
import authController from '../../controllers/auth.controller.js';
import usersValidator from '../../middlewares/validators/users.validator.js';

class AuthRoutes {
  #router;

  constructor() {
    this.#router = Router();
    this.authController = authController;
    this.usersValidatior = usersValidator;
  }

  get router() {
    return this.#router;
  }

  registerRoutes = () => {
    this.#router.post('/signup', this.usersValidatior.signupValidator, this.authController.signup);

    this.#router.post('/signin', this.usersValidatior.signinValidator, this.authController.signin);
  };
}

const authRoutes = new AuthRoutes();

authRoutes.registerRoutes();

export default authRoutes;
