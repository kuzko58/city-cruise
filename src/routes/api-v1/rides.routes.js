import { Router } from 'express';
import ridesController from '../../controllers/rides.controller.js';
import usersAuth from '../../middlewares/auth/users.auth.js';
import ridesValidator from '../../middlewares/validators/rides.validator.js';

class RidesRoutes {
  #router;

  constructor() {
    this.#router = Router();
    this.ridesController = ridesController;
    this.usersAuth = usersAuth;
    this.ridesValidator = ridesValidator;
  }

  get router() {
    return this.#router;
  }

  registerRoutes = () => {
    this.#router.get(
      '/all',
      this.usersAuth.authenticate,
      this.usersAuth.isAdmin,
      this.ridesController.getAllRides,
    );

    this.#router.get(
      '/find',
      this.usersAuth.authenticate,
      this.ridesValidator.getRidesNearMeValidator,
      this.ridesController.getRidesNearMe,
    );

    this.#router.post(
      '/add',
      this.usersAuth.authenticate,
      this.usersAuth.isRider,
      this.ridesValidator.addRideValidator,
      this.ridesController.addRide,
    );

    this.#router.put(
      '/status',
      this.usersAuth.authenticate,
      this.usersAuth.isAdmin,
      this.ridesValidator.updateRideStatusValidator,
      this.ridesController.updateRideStatus,
    );

    this.#router.put(
      '/update',
      this.usersAuth.authenticate,
      this.usersAuth.isRider,
      this.ridesValidator.updateRideValidator,
      this.ridesController.updateRideStatus,
    );
  };
}

const ridesRoutes = new RidesRoutes();

ridesRoutes.registerRoutes();

export default ridesRoutes;
