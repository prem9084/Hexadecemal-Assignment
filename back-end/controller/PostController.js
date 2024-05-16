import PostSchema from "../modal/PostSchema.js";
import fs from "fs";

export const createPostController = async (req, res) => {
  try {
    const { title } = req.fields;
    const { photo, video } = req.files;

    if (!title) {
      return res.send({ message: "Title is required" });
    }

    if (photo && photo.size > 10000000) {
      return res.send({
        message: "photo's size sould be 1md ",
      });
    }

    if (video && video.size > 100000000000) {
      return res.send({
        message: "video's size sould be 5mb",
      });
    }

    const post = await new PostSchema({
      title,
    });

    if (photo) {
      post.photo.data = fs.readFileSync(photo.path);
      post.photo.contentType = photo.type;
    }
    if (video) {
      post.video.data = fs.readFileSync(video.path);
      post.video.contentType = video.type;
    }

    await post.save();

    res.status(200).send({
      success: true,
      message: "post successfully",
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

// for get phot video controller

export const getPhotoController = async (req, res) => {
  try {
    const post = await PostSchema.findById(req.params.id).select("+photo");

    if (post.photo.data) {
      res.set("Content-Type", post.photo.contentType);
      return res.status(200).send(post.photo.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getVideoController = async (req, res) => {
  try {
    const post = await PostSchema.findById(req.params.id).select("+video");

    if (post.video.data) {
      res.set("Content-Type", post.video.contentType);
      return res.status(200).send(post.video.data);
    }
  } catch (error) {
    console.log(error);
  }
};
// for delete post

export const deletePostController = async (req, res) => {
  try {
    const post = await PostSchema.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      messsage: "Deleted",
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPostController = async (req, res) => {
  try {
    const post = await PostSchema.find({});
    res.status(200).send({
      success: true,
      messsage: "All Post",
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

// Like a post
export const likePost = async (req, res) => {
  try {
    const post = await PostSchema.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (!post.likes.includes(req.user._id)) {
      post.likes.push(req.user._id);
      await post.save();
      return res.status(200).json({ message: "Post liked" });
    } else {
      return res.status(400).json({ message: "You already liked this post" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Dislike a post
export const dislikePost = async (req, res) => {
  try {
    const post = await PostSchema.findById(req.params.id);
    if (post.likes.includes(req.user._id)) {
      // If the user previously liked the post, decrease like count
      post.likes.pull(req.user._id);
    }
    await post.save();
    return res.status(200).json({ message: "Post disliked" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const post = await PostSchema.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

// Comment on a post
export const commentPost = async (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };

  try {
    const updatedPost = await PostSchema.findByIdAndUpdate(
      req.params.id,
      { $push: { comment: comment } },
      { new: true }
    ).populate("comment.postedBy", "_id name");

    if (!updatedPost) {
      return res.status(404).send({ message: "Post not found" });
    }

    res.send({
      message: "Comment was successfully added",
      comment: updatedPost.comment[updatedPost.comment.length - 1],
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error while adding comment", error: error.message });
  }
};
