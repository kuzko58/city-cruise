import * as jose from 'jose';
import UsersModel from '../../models/users.model.js';

class UsersAuth {
  constructor() {
    this.UsersModel = UsersModel;
  }

  authenticate = async (req, res, next) => {
    try {
      const token = req.cookies['_city_cruise'];

      if (!token) {
        throw new Error('unauthorized!');
      }

      const tokenClaimsHash = token.split('.')[1];

      const buffer = Buffer.from(tokenClaimsHash, 'base64');
      const claimsStr = buffer.toString('utf-8');
      const claims = JSON.parse(claimsStr);

      const user = await this.UsersModel.findOne({ email: claims.email });

      if (!user) {
        throw new Error('unauthorized!');
      }

      const secret = new Uint8Array(user.secret.split(','));

      const authenticatedClaims = await jose.jwtVerify(token, secret);

      req.user = authenticatedClaims.payload;

      next();
    } catch (err) {
      next(err);
    }
  };

  isAdmin = (req, res, next) => {
    if (!req.user) {
      throw new Error('unauthorized');
    }

    if (!req.user.roles.includes('admin')) {
      throw new Error('unauthorized');
    }

    next();
  };

  isRider = (req, res, next) => {
    if (!req.user) {
      throw new Error('unauthorized');
    }

    if (!req.user.roles.includes('rider')) {
      throw new Error('unauthorized');
    }

    next();
  };
}

const usersAuth = new UsersAuth();

export default usersAuth;
