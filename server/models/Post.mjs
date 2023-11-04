import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please title name"],
      minlength: 10,
    },

    coverImg: {
      type: String,
    },

    content: {
      type: String,
      required: [true, "Please provide content"],
    },

    postTags: {
      type: Array,
    },

    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    savepost: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    category: {
      type: String,
    },

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    views: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },

  { timestamps: true }
);

const PostModel = model("Post", PostSchema);

export default PostModel;
