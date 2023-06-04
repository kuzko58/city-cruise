import { Router } from 'express';
import tripsController from '../../controllers/trips.controller.js';
import usersAuth from '../../middlewares/auth/users.auth.js';
import tripsValidator from '../../middlewares/validators/trips.validator.js';

class TripsRoutes {
  #router;

  constructor() {
    this.#router = Router();
    this.tripsController = tripsController;
    this.usersAuth = usersAuth;
    this.tripsValidator = tripsValidator;
  }

  get router() {
    return this.#router;
  }

  registerRoutes = () => {
    this.#router.get('/user', this.usersAuth.authenticate, this.tripsController.getAllUserTrips);

    this.#router.get(
      '/one',
      this.usersAuth.authenticate,
      this.tripsValidator.getTripValidator,
      this.tripsController.getTrip,
    );

    this.#router.post(
      '/create',
      this.usersAuth.authenticate,
      this.tripsValidator.requestNewTripValidator,
      this.tripsController.requestNewTrip,
    );

    this.#router.put(
      '/update',
      this.usersAuth.authenticate,
      this.tripsValidator.updateTripValidator,
      this.tripsController.updateTrip,
    );
  };
}

const tripsRoutes = new TripsRoutes();

tripsRoutes.registerRoutes();

export default tripsRoutes;
