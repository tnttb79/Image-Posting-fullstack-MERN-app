import PostsModel from "../models/posts.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get all posts
export async function getPosts(req, res) {
  try {
    const {page = 1} = req.query
    const limit = 8
    const posts = await PostsModel.find().limit(limit).skip((page-1)*limit).sort({createdAt: -1});
    const count = await PostsModel.countDocuments()
    res.status(200).json({ posts, totalPage: Math.ceil(count/limit) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// Create a post
export async function createPost(req, res) {
  try {
    // if there is no file
    // send the req.body that will contain selectedFile as null
    if (req.file) {
      const { filename } = req.file;
      req.body.selectedFile = filename;
    }
    
    if (!req.body.selectedFile) {
      delete req.body.selectedFile;
    }
    
    // add the userId as creator for the new post:
    const newPost = new PostsModel({...req.body, creator: req.userId});
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

// Update post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    // if there is a new file in the update request
    // execute the if logic below
    // if there is no file, the req.body already contain
    // the string of old file name
    if (req.file) {
      const { filename } = req.file;
      req.body.selectedFile = filename;
    }

    if (!req.body.selectedFile) {
      delete req.body.selectedFile;
    }
    const updatedPost = await PostsModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

// Delete post
// __dirname is not defined error
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const deletePost = async (req, res) => {
  try {
    // delete the document in mongoDB
    const { id } = req.params;
    const deletedItem = await PostsModel.findByIdAndRemove(id);

    // if there's an img in the post, delete it in the file system
    if (deletedItem.selectedFile) {
      // get the img path in the file system
      const filePath = path.join(
        __dirname,
        "..",
        "images",
        deletedItem.selectedFile
      );
      // delete img with above path
      fs.unlink(filePath, (error) => {
        if (error) throw error;
      });
    }
    res.json({ message: "Post deleted succesfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

// Like post
export const likePost = async (req, res) => {
  // get id of the post from params
  const { id } = req.params

  // check if the userID has been assigned correctly
  if (!req.userId) return res.status(403).json({message: "Unauthenticated"})

  // find the post
  const post = await PostsModel.findById(id)
  // check if the userId has already in the likes array
  const index = post.likes.findIndex( id => id === req.userId)
  // if no add user to the like array
  if (index === -1) {
    post.likes.push(req.userId)
  } else {
  // else, remove the userId from the likes array
    post.likes = post.likes.filter(id => id !== req.userId )
  }
  // update the database with the modified post.
  const updatedPost = await PostsModel.findByIdAndUpdate(id, {likes: post.likes}, {new: true})

  // send back the data to client
  res.status(201).json(updatedPost)
};
