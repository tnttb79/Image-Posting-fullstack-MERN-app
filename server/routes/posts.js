import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";
import { upload } from "../controllers/upload.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// get all post
router.get("/", getPosts);

// create new post
router.post("/", upload.single("selectedFile"), auth, createPost);

// update a post

router.patch("/:id", upload.single("selectedFile"), auth, updatePost);

// like a post
router.patch("/:id/likepost", auth, likePost)

// delete a post
router.delete("/:id", auth, deletePost);

export default router;
