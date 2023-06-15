import { StatusCodes } from "http-status-codes";

import User from "../models/user.js";
import { BadRequestError, UnAuthorizedError } from "../errors/errors.js";

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
  res.status(StatusCodes.CREATED).json(returnUserData(user, token));
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
  res.status(StatusCodes.OK).json(returnUserData(user, token));
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
  res.status(StatusCodes.OK).json(returnUserData(user, token));
};

const returnUserData = (user, token) => {
  return {
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
    userLocation: user.location,
  };
};

export { register, login, updateUser };
