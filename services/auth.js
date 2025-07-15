const User = require("../models/user");
const joi = require("../config/joi");

class AuthService {
  static async createUser({ name, lastName, email, password }) {
    try {
      const { error, data } = joi.validate({ name, lastName, email, password });

      if (!error) {
        const user = new User({
          name, 
          lastName,
          email,
          password,
          notes:[]
        });
        const resp = await user.save();

        return { error, data: resp };
      }
      return { error: true, data: error };
    } catch (error) {
      return { error: true, data: error.message };
    }
  }
}

module.exports = AuthService;
