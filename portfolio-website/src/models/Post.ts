import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: String,
  featuredImage: String, // URL for featured image
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: [String],
  likes: {
    type: Number,
    default: 0,
  },
  comments: [CommentSchema],
  isPublished: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);