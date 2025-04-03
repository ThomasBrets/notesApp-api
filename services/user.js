const User = require("../models/user");

class UsersServices {
  static async getUserInfo(id) {
    try {
      const user = await User.findById(id).select('-password -salt'); // Excluir campos sensibles

      
      if (!user) {
        return { error: true, data: "Usuario no encontrado" };
      }
      return { error: false, data: user };
    } catch (error) {
      return { error: true, data: error.message };
    }
  }
}

module.exports = UsersServices;
