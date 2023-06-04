import { Schema, model } from 'mongoose';

const tripsSchema = new Schema(
  {
    location: {
      lat: Number,
      long: Number,
    },
    destination: {
      lat: Number,
      long: Number,
    },
    cost: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'cancelled', 'onGoing', 'completed'],
      default: 'pending',
    },
    currency: {
      type: String,
      default: 'Naira',
    },
    paymentMode: {
      type: String,
      enum: ['cash', 'card'],
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    ride: {
      type: Schema.Types.ObjectId,
      ref: 'Ride',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

tripsSchema.set('toJSON', {
  transform: function (doc, ret, opt) {
    delete ret['__v'];
    return ret;
  },
});

const TripsModel = model('Trip', tripsSchema);

export default TripsModel;
