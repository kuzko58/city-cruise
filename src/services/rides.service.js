import RidesModel from '../models/rides.model.js';
import UsersModel from '../models/users.model.js';
import { isWithinRadius } from '../utils/util.js';

class RidesService {
  constructor() {
    this.RidesModel = RidesModel;
    this.UsersModel = UsersModel;
  }

  getAllRides = async () => {
    const rides = await this.RidesModel.find().populate({
      path: 'owner',
      select: '_id firstName lastName email mobile',
    });

    return rides;
  };

  getRidesByLocation = async (data) => {
    const { location } = data;
    const rides = await this.RidesModel.find({ isOnline: true, status: 'approved' }).populate({
      path: 'owner',
      select: '_id firstName lastName email mobile',
    });

    const ridesNearMe = rides.filter((ride) => {
      if (!ride.location) {
        return false;
      }
      return isWithinRadius(location.lat, location.long, ride.location.lat, ride.location.long, 1);
    });

    return ridesNearMe;
  };

  createRide = async (data) => {
    const ride = this.RidesModel(data);

    const newRide = await ride.save();

    await this.UsersModel.findByIdAndUpdate(ride.owner, { $push: { rides: newRide._id } });

    return newRide;
  };

  updateRide = async (data) => {
    const { id, ...update } = data;

    const ride = await this.RidesModel.findByIdAndUpdate(id, update, { new: true });

    return ride;
  };
}

const ridesService = new RidesService();

export default ridesService;
