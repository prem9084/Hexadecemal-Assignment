import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    video: {
      data: Buffer,
      contentType: String,
    },
    likes: [{ type: ObjectId, ref: "User" }],

    comment: [
      {
        text: String,
        postedBy: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
