import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
  name: String,
  creator: String,
  title: String,
  descriptions: String,
  tags: { type: [String], default: [] },
  selectedFile: String,
  likes: { type: [String], default: [] },
  comments: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostsModel = mongoose.model("PostsModel", postSchema);

export default PostsModel;
