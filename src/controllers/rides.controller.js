import ridesService from '../services/rides.service.js';
import { Response } from '../utils/response/response.js';

class RidesController {
  constructor() {
    this.ridesService = ridesService;
  }

  getAllRides = async (req, res, next) => {
    try {
      const rides = await this.ridesService.getAllRides();

      return res.status(200).json(new Response('success', { rides }));
    } catch (err) {
      next(err);
    }
  };

  getRidesNearMe = async (req, res, next) => {
    try {
      const rides = await this.ridesService.getRidesByLocation(req.body);

      return res.status(200).json(new Response('success', { rides }));
    } catch (err) {
      next(err);
    }
  };

  addRide = async (req, res, next) => {
    try {
      const { body, user } = req;

      const ride = await this.ridesService.createRide({ ...body, owner: user.id });

      return res.status(200).json(new Response('success', { ride }));
    } catch (err) {
      next(err);
    }
  };

  updateRideStatus = async (req, res, next) => {
    try {
      const { body, user } = req;

      const ride = await this.ridesService.updateRide({ ...body, updatedBy: user.id });

      return res.status(200).json(new Response('success', { ride }));
    } catch (err) {
      next(err);
    }
  };

  updateRide = async (req, res, next) => {
    try {
      const ride = await this.ridesService.updateRide(req.body);

      return res.status(200).json(new Response('success', { ride }));
    } catch (err) {
      next(err);
    }
  };
}

const ridesController = new RidesController();

export default ridesController;
