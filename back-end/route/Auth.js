import express from "express";
import formidable from "express-formidable";
import {
  FollowUserController,
  UnFollowUserController,
  getProfilePic,
  getUser,
  getUserFollowers,
  getUserFollowing,
  updateUser,
  userLoginController,
  userRegistrationController,
} from "../controller/AuthController.js";
import { isAuth } from "../middleware/ReqireSignIn.js";

const router = express.Router();

router.post("/register", formidable(), userRegistrationController);
router.post("/login", userLoginController);
router.get("/get-image/:id", getProfilePic);
router.put("/update-profile/:id", formidable(), isAuth, updateUser);
router.get("/get-user/:id", getUser);
router.post("/follow/:id", isAuth, FollowUserController);
router.post("/unfollow/:id", isAuth, UnFollowUserController);
router.get("/get-followers/:id", isAuth, getUserFollowers);
router.get("/get-following/:id", isAuth, getUserFollowing);

router.get("/user-auth", isAuth, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
