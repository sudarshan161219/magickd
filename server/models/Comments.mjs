import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CommentsSchema = new Schema(
  {
    content: { type: String },

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

    replies: [{ type: Schema.Types.ObjectId, ref: "CommentReply" }],
    postComment: { type: Schema.Types.ObjectId, ref: "Post" },
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },

  { timestamps: true }
);

const CommentModel = model("Comment", CommentsSchema);

export default CommentModel;

