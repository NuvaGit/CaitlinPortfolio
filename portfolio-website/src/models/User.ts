import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);