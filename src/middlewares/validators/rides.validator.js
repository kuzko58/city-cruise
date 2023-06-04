import Joi from 'joi';

class RidesValidator {
  addRideValidator = (req, res, next) => {
    const schema = Joi.object({
      brand: Joi.string().required(),
      model: Joi.string().required(),
      color: Joi.string().required(),
      year: Joi.number(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }

    next();
  };

  updateRideStatusValidator = (req, res, next) => {
    const schema = Joi.object({
      id: Joi.string().required(),
      status: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }

    next();
  };

  updateRideValidator = (req, res, next) => {
    const schema = Joi.object({
      id: Joi.string().required(),
      brand: Joi.string(),
      model: Joi.string(),
      color: Joi.string(),
      isOnline: Joi.boolean(),
      location: {
        lat: Joi.number().required(),
        long: Joi.number().required(),
      },
    });

    const { error } = schema.validate(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }

    next();
  };

  getRidesNearMeValidator = (req, res, next) => {
    const schema = Joi.object({
      location: {
        lat: Joi.number().required(),
        long: Joi.number().required(),
      },
    });

    const { error } = schema.validate(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }

    next();
  };
}

const ridesValidator = new RidesValidator();

export default ridesValidator;
