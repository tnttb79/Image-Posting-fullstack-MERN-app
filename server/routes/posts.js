import express from "express";
import {
  getPosts,
  getPost,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} from "../controllers/posts.js";
import { upload } from "../controllers/upload.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// get all posts
router.get("/", getPosts);

// get posts by search
router.get("/search", getPostsBySearch);

// get detailed post
router.get("/:id", getPost);

// create new post
router.post("/", upload.single("selectedFile"), auth, createPost);

// update a post
router.patch("/:id", upload.single("selectedFile"), auth, updatePost);

// like a post
router.patch("/:id/likepost", auth, likePost);

// delete a post
router.delete("/:id/delete", auth, deletePost);

// comment on a post
router.post("/:id/comment", auth, commentPost)

export default router;
