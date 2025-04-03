const UsersServices = require("../services/user");

class UsersController {
  static async getUserInfo(req, res) {
    const { id } = req.user; // `req.user` proviene de validateUser

    const { error, data } = await UsersServices.getUserInfo(id);


    if (error) {
      return res.status(500).json({ message: data._doc });
    }

    // Excluir campos sensibles como la contraseña y salt
    const { password, salt, ...userInfo } = data;
    

    return res.status(200).json(userInfo);
  }
}

module.exports = UsersController;
