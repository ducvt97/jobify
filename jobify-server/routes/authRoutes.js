import express from "express";

import { register, login, updateUser } from "../controllers/authController.js";
import authUserMiddleware from "../middlewares/auth-user.js";

const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/updateUser").patch(authUserMiddleware, updateUser);

export default authRouter;
