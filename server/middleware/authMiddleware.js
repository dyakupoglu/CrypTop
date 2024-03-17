import jwt from "jsonwebtoken";

const verifyToken = function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decoded;
  } catch (error) {
    res.status(401).json({ error_message: "Invalid token", error });
  }

  return next();
};

export default verifyToken;
