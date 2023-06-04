import Joi from 'joi';

class TripsValidator {
  requestNewTripValidator = (req, res, next) => {
    const schema = Joi.object({
      location: Joi.object({
        lat: Joi.number().required(),
        long: Joi.number().required(),
      }).required(),
      destination: Joi.object({
        lat: Joi.number().required(),
        long: Joi.number().required(),
      }).required(),
      ride: Joi.string().required(),
      paymentMode: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }

    next();
  };

  updateTripValidator = (req, res, next) => {
    const schema = Joi.object({
      id: Joi.string().required(),
      status: Joi.string().required(),
      destination: Joi.object({
        lat: Joi.number().required(),
        long: Joi.number().required(),
      }),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }

    next();
  };

  getTripValidator = (req, res, next) => {
    const schema = Joi.object({
      id: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }

    next();
  };
}

const tripsValidator = new TripsValidator();

export default tripsValidator;
