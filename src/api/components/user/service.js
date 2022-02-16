import { omit } from 'lodash';

import UserModel from './model';

export const createUser = async input => {
  try {
    return await UserModel.create(input);
  } catch (err) {
    throw new Error(err);
  }
};

export const validatePassword = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), ['password', '__v']);
};

export const findUser = async query => {
  return UserModel.findOne(query).lean();
};
