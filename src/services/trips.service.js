import TripsModel from '../models/trips.model.js';
import { getDistance } from '../utils/util.js';

class TripsService {
  constructor() {
    this.TripsModel = TripsModel;
  }

  getTrip = async (data) => {
    const trip = await this.TripsModel.findById(data.id)
      .populate('owner')
      .populate({
        path: 'ride',
        populate: {
          path: 'owner',
          model: 'User',
        },
      });

    return trip;
  };

  getAllUserTrips = async (data) => {
    const trips = await this.TripsModel.find({ owner: data.id })
      .populate({
        path: 'owner',
        select: '_id firstName lastName email mobile',
      })
      .populate({
        path: 'ride',
        populate: {
          path: 'owner',
          model: 'User',
        },
      })
      .populate({
        path: 'updatedBy',
        select: '_id firstName lastName email mobile',
      });

    return trips;
  };

  createTrip = async (data) => {
    const rate = 300; // Naira Per KM

    const distance = getDistance(
      data.location.lat,
      data.location.long,
      data.destination.lat,
      data.destination.long,
    );

    const cost = rate * distance;

    data.cost = cost;

    const trip = this.TripsModel(data);

    const newTrip = trip.save();

    return newTrip;
  };

  updateTrip = async (data) => {
    const { id, ...update } = data;

    const trip = await this.TripsModel.findByIdAndUpdate(id, update, { new: true });

    return trip;
  };
}

const tripsService = new TripsService();

export default tripsService;
