import { Router } from 'express';
import { Response } from '../utils/response/response.js';
import apiV1Routes from './api-v1/api-v1.routes.js';

class Routes {
  #router;

  constructor() {
    this.#router = Router();
    this.apiV1Routes = apiV1Routes;
  }

  get router() {
    return this.#router;
  }

  registerRoutes = () => {
    this.#router.use('/api/v1', apiV1Routes.router);

    this.#router.use((req, res, next) => {
      res.status(404).json(new Response('Sorry, route not found.'));
    });

    this.#router.use((err, req, res, next) => {
      // log the error message
      console.error(err.message);

      // set the response status code
      res.status(400).json(new Response(err.message || 'something went wrong'));
    });
  };
}

const routes = new Routes();

routes.registerRoutes();

export default routes;
