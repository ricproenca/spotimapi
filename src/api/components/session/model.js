import mongoose from 'mongoose';

const definition = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  valid: {
    type: Boolean,
    default: true
  },
  userAgent: { type: String }
};

const options = { timestamps: true };

const sessionSchema = new mongoose.Schema(definition, options);

const SessionModel = mongoose.model('Session', sessionSchema);

export default SessionModel;
