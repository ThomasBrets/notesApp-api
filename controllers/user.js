const UsersServices = require("../services/user");

class UsersController {
  static async getUserInfo(req, res) {
    // Obtenemos el ID del usuario autenticado desde req.user (gracias al middleware validateUser)
    const { id } = req.user;

    // Llamamos al servicio que busca al usuario en la base de datos
    const { error, data } = await UsersServices.getUserInfo(id);

    // Si hubo un error, respondemos con un status 500 y el mensaje de error
    if (error) {
      return res.status(500).json({ message: data });
    }

    /**
     * Convertimos el documento de Mongoose a un objeto plano de JavaScript con `.toObject()`
     * Esto elimina métodos y propiedades internas de Mongoose (como `._doc`, `save()`, etc.)
     * y nos deja un objeto limpio que podemos manipular o devolver como JSON.
     */
    const { password, salt, ...userInfo } = data.toObject(); // Excluimos campos sensibles

    // Respondemos con la información del usuario (sin contraseña ni salt)
    return res.status(200).json(userInfo);
  }
}

module.exports = UsersController;