import { Router } from 'express';
import tripsRoutes from './trips.routes.js';
import authRoutes from './auth.routes.js';
import ridesRoutes from './rides.routes.js';
import usersRoutes from './users.routes.js';

class ApiV1Routes {
  #router;

  constructor() {
    this.#router = Router();
    this.authRoutes = authRoutes;
    this.usersRoutes = usersRoutes;
    this.ridesRoutes = ridesRoutes;
    this.tripsRoutes = tripsRoutes;
  }

  get router() {
    return this.#router;
  }

  registerRoutes = () => {
    this.#router.use('/auth', this.authRoutes.router);
    this.#router.use('/users', usersRoutes.router);
    this.#router.use('/rides', ridesRoutes.router);
    this.#router.use('/trips', tripsRoutes.router);
  };
}

const apiV1Routes = new ApiV1Routes();

apiV1Routes.registerRoutes();

export default apiV1Routes;
