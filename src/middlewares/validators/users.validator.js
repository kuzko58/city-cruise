import Joi from 'joi';

class UsersValidator {
  signupValidator = (req, res, next) => {
    const schema = Joi.object({
      firstName: Joi.string().min(2).required(),
      lastName: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      mobile: Joi.string(),
      address: Joi.string(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
      isRider: Joi.boolean().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }

    next();
  };

  signinValidator = (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }

    next();
  };
}

const usersValidator = new UsersValidator();

export default usersValidator;
