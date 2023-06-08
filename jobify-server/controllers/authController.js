import { StatusCodes } from 'http-status-codes'

import User from '../models/user.js'
import { BadRequestError } from '../errors/errors.js'

const register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all fields.')
  }

  const isUserExisted = await User.findOne({ email })
  if (isUserExisted) {
    throw new BadRequestError('Email already in used.')
  }

  const user = await User.create({ name, email, password })
  const token = user.createJWT()
  res
    .status(StatusCodes.CREATED)
    .json({
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        location: user.location,
      },
      token,
    })
}

const login = (req, res) => {
  res.send('Login User')
}

const updateUser = (req, res) => {
  res.send('Update User')
}

export { register, login, updateUser }
