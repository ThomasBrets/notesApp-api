const { validateToken } = require("../config/token");

const validateUser = (req, res, next) => {
  const token = req.cookies.token; // Asegúrate de que la cookie contiene el token
  if (!token) return res.sendStatus(401); // No autenticado

  try {
    const { user } = validateToken(token); // Decodifica el token
    if (!user) return res.sendStatus(401); // Si no hay usuario en el token
    req.user = user; // Añade el usuario a req.user
    console.log("USUARIO VALIDADO", req.user);
    
    next();
  } catch (error) {
    return res.sendStatus(401); // Token inválido
  }
};

module.exports = { validateUser };

