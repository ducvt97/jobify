import { StatusCodes } from "http-status-codes";

import User from "../models/user.js";
import { BadRequestError, UnAuthorizedError } from "../errors/errors.js";

const tokenExpire = 1000 * 60 * 60 * 24;

const attachCookieToken = ({ res, token }) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + tokenExpire),
  });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all fields.");
  }

  const isUserExisted = await User.findOne({ email });
  if (isUserExisted) {
    throw new BadRequestError("Email already in used.");
  }

  const user = await User.create({ name, email, password });
  const token = user.createJWT();

  attachCookieToken({ res, token });

  res.status(StatusCodes.CREATED).json(returnUserData(user));
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all fields.");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnAuthorizedError("Email incorrect.");
  }

  if (!user.comparePassword(password)) {
    throw new UnAuthorizedError("Password incorrect.");
  }

  const token = user.createJWT();

  attachCookieToken({ res, token });

  res.status(StatusCodes.OK).json(returnUserData(user));
};

const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(Date.now()) });
  res.status(StatusCodes.OK).json({ msg: "User logged out." });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all fields.");
  }
  const userId = req.user.userId;
  const user = await User.findById(userId);

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;
  await user.save();

  const token = user.createJWT();

  attachCookieToken({ res, token });
  res.status(StatusCodes.OK).json(returnUserData(user));
};

const returnUserData = (user) => {
  return {
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
      role: user.role,
    },
    userLocation: user.location,
  };
};

const getCurrentUser = async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findById(userId);
  res.status(StatusCodes.OK).json(returnUserData(user));
};

export { register, login, updateUser, getCurrentUser, logout };
