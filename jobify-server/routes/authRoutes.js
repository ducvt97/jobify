import express from "express";
import rateLimiter from "express-rate-limit";

import { register, login, updateUser, getCurrentUser, logout } from "../controllers/authController.js";
import authUserMiddleware from "../middlewares/auth-user.js";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const authRouter = express.Router();

authRouter.route("/register").post(apiLimiter, register);
authRouter.route("/login").post(apiLimiter, login);
authRouter.route("/logout").post(logout);
authRouter.route("/updateUser").patch(authUserMiddleware, updateUser);
authRouter.route("/getCurrentUser").get(authUserMiddleware, getCurrentUser);

export default authRouter;
