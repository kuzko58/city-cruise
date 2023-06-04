import * as jose from 'jose';
import authService from '../services/auth.service.js';
import { Response } from '../utils/response/response.js';

class AuthController {
  constructor() {
    this.authService = authService;
  }

  signup = async (req, res, next) => {
    try {
      const user = await this.authService.userRegistration(req.body);

      return res.status(200).json(new Response('success'));
    } catch (err) {
      next(err);
    }
  };

  signin = async (req, res, next) => {
    try {
      const user = await this.authService.userLogin(req.body);

      const secretKey = new Uint8Array(user.secret.split(','));

      const token = await new jose.SignJWT({
        id: user._id,
        roles: user.roles,
        email: user.email,
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('2h')
        .sign(secretKey);

      res.cookie('_city_cruise', token, { httpOnly: true });
      res.status(200).json(new Response('success', { user }));
    } catch (err) {
      next(err);
    }
  };
}

const authController = new AuthController();

export default authController;
