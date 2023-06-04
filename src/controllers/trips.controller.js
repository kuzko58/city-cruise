import tripsService from '../services/trips.service.js';
import { Response } from '../utils/response/response.js';

class TripsController {
  constructor() {
    this.tripsService = tripsService;
  }

  getTrip = async (req, res, next) => {
    try {
      const trip = await this.tripsService.getTrip(req.body);

      return res.status(200).json(new Response('success', { trip }));
    } catch (err) {
      next(err);
    }
  };

  getAllUserTrips = async (req, res, next) => {
    try {
      const trips = await this.tripsService.getAllUserTrips({ id: req.user.id });

      return res.status(200).json(new Response('success', { trips }));
    } catch (err) {
      next(err);
    }
  };

  requestNewTrip = async (req, res, next) => {
    try {
      const { body, user } = req;
      const trip = await this.tripsService.createTrip({ ...body, owner: user.id });

      return res.status(200).json(new Response('success', { trip }));
    } catch (err) {
      next(err);
    }
  };

  updateTrip = async (req, res, next) => {
    try {
      const { body, user } = req;

      const trip = await this.tripsService.updateTrip({ ...body, updatedBy: user.id });

      return res.status(200).json(new Response('success', { trip }));
    } catch (err) {
      next(err);
    }
  };
}

const tripsController = new TripsController();

export default tripsController;
