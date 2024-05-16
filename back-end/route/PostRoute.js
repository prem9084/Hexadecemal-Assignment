import express from "express";
import { isAuth } from "../middleware/ReqireSignIn.js";
import formidable from "express-formidable";
import {
  commentPost,
  createPostController,
  dislikePost,
  getAllPostController,
  getPhotoController,
  getSinglePost,
  getVideoController,
  likePost,
} from "../controller/PostController.js";

const router = express.Router();

router.post("/create-post", isAuth, formidable(), createPostController);
router.get("/get-photo/:id", getPhotoController);
router.get("/get-video/:id", getVideoController);
router.post("/like-post/:id", isAuth, likePost);
router.post("/dislike-post/:id", isAuth, dislikePost);
router.put("/comment/:id", isAuth, commentPost);
router.get("/get-all-post", isAuth, getAllPostController);
router.get("/get-post/:id", isAuth, getSinglePost);

export default router;
