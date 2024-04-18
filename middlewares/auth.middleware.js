const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json("Ошибка авторизации");

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    return res.status(401).json({ error: "Неверный тип токена" });
  }

  try {
    req.user = await jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ error: error.toString() });
  }
};