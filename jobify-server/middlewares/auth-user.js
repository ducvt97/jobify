import jwt from "jsonwebtoken";

import {
  UnAuthorizedError
} from "../errors/errors.js";

const authUserMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new UnAuthorizedError("Authentication Invalid");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: payload.userId
    };
    next();
  } catch (error) {
    throw new UnAuthorizedError("Authentication Invalid");
  }
};

export default authUserMiddleware;