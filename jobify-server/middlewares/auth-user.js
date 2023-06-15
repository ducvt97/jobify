import jwt from "jsonwebtoken";

import { UnAuthorizedError } from "../errors/errors.js";

const authUserMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthorizedError("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnAuthorizedError("Authentication Invalid");
  }
};

export default authUserMiddleware;
