import fs from "fs";
import jwt from "jsonwebtoken";
import { hashPassword, compairPassword } from "../authUtil/authUtil.js";
import authSchema from "../modal/authSchema.js";
import { count } from "console";
// for user registration

export const userRegistrationController = async (req, res) => {
  try {
    const { name, email, password, username } = req.fields;
    const { image } = req.files;

    // validations

    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!username) {
      return res.send({ message: "Username is required" });
    }
    if (image && image.size > 1000000) {
      return res.send({ message: "Profile image suould be less than 1mb" });
    }

    // check existing user

    const existingUser = await authSchema.findOne({ email: email });

    if (existingUser) {
      return res.send({ message: "User already exists, Please Login" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new authSchema({
      name,
      email,
      password: hashedPassword,
      username,
    });

    if (image) {
      user.image.data = fs.readFileSync(image.path);
      user.image.contentType = image.type;
    }

    await user.save();
    res.status(200).send({
      success: true,
      message: "Registration successful",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

// for user login

export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validations

    if (!email || !password) {
      return res.send({ message: "Invalid email or password" });
    }
    // check user

    const user = await authSchema.findOne({ email: email });
    if (!user) {
      return res.send({
        message: "This user does not register, Plaser Register",
      });
    }

    const match = await compairPassword(password, user.password);
    if (!match) {
      return res.send({ message: "Invalid email or Password" });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

const getFollowers = async (req, res) => {};

// update user

export const updateUser = async (req, res) => {
  try {
    const { name, email, username } = req.fields;
    const { image } = req.files;

    // validations

    if (image && image.size > 1000000000) {
      return res.send({ message: "Profile image suould be less than 1mb" });
    }

    // check existing user

    const user = await authSchema.findByIdAndUpdate(
      req.params.id,
      {
        ...req.fields,
      },
      { new: true }
    );

    if (image) {
      user.image.data = fs.readFileSync(image.path);
      user.image.contentType = image.type;
    }

    await user.save();
    res.status(200).send({
      success: true,
      message: "Profile updated",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

// profilePic

export const getProfilePic = async (req, res) => {
  try {
    const user = await authSchema.findById(req.params.id).select("image");
    if (user.image.data) {
      res.set("Content-Type", user.image.contentType);
      return res.status(200).send(user.image.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await authSchema.findById(req.params.id).select("-image");
    res.status(200).send({
      success: true,
      message: "Get user",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const FollowUserController = async (req, res) => {
  try {
    const userIdToFollow = req.params.id;
    const currentUser = req.user;

    const existingUser = await authSchema.findById(userIdToFollow);

    if (!existingUser) {
      return res.status(400).send({
        message: "User not found",
      });
    }

    if (!existingUser.followers.includes(currentUser._id)) {
      // Update the user being followed
      await authSchema.findByIdAndUpdate(userIdToFollow, {
        $push: { followers: currentUser._id },
      });

      // Update the current user
      await authSchema.findByIdAndUpdate(currentUser._id, {
        $push: { following: userIdToFollow },
      });
      const updatedUser = await authSchema.findById(userIdToFollow);
      const followersCount = parseInt(updatedUser.followers.length);
      const followingCount = parseInt(updatedUser.following.length);

      return res.status(200).send({
        message: "Successfully followed user",
        followersCount,
        followingCount,
      });
    } else {
      return res.status(500).send({ message: "You cannot follow this user" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

// for user unfollow

export const UnFollowUserController = async (req, res) => {
  try {
    const userIdToUnFollow = req.params.id;
    const currentUser = req.user;

    const existingUser = await authSchema.findById(userIdToUnFollow);

    if (!existingUser) {
      res.status(400).send({
        message: "User does not found",
      });
    }

    if (existingUser.followers.includes(currentUser._id)) {
      await authSchema.findByIdAndUpdate(userIdToUnFollow, {
        $pull: { followers: currentUser._id },
      });

      await authSchema.findOneAndUpdate(
        { _id: currentUser._id },
        {
          $pull: { following: userIdToUnFollow },
        }
      );
    } else {
      return res.status(500).send({
        message: "You con not unFollow this user",
      });
    }

    res.status(200).send({ message: "Successfully unfollowed user" });
  } catch (error) {
    console.log(error);
  }
};

// get following

export const getUserFollowing = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await authSchema.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const following = await authSchema.find({ _id: { $in: user.following } });

    return res.status(200).send({ following });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export const getUserFollowers = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await authSchema.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const followers = await authSchema.find({ _id: { $in: user.followers } });

    return res.status(200).send({
      followers,
      message: "get Followers",
      FollowCount: followers.lenght,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
