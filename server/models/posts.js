import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
  name: String,
  creator: String,
  title: String,
  descriptions: String,
  tags: [String],
  selectedFile: String,
  likes: {
      type: [String],
      default: [],
  },
  createdAt: {
      type: Date,
      default: new Date(),
  },
})

const PostsModel = mongoose.model('PostsModel', postSchema);

export default PostsModel