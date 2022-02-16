import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import config from '../../../config/default';

const definition = {
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true }
};

const options = { timestamps: true };

const userSchema = new mongoose.Schema(definition, options);

userSchema.pre('save', async function (next) {
  let user = this;

  if (!user || !user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.saltWorkFactor);
  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  return bcrypt.compare(candidatePassword, user.password).catch(() => false);
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
