import Post from "../models/Post.mjs";
import User from "../models/User.mjs";
import jwt from "jsonwebtoken";
import Comment from "../models/Comments.mjs";
import CommentReply from "../models/CommentsReplies.mjs";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from "../errors/export.mjs";
import checkPermissions from "../utils/checkPermissions.mjs";

const getAllPost = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const allPostsPromise = Post.find()
      .skip(skip)
      .limit(limit)
      .populate("author", ["name"])
      .sort({ createdAt: -1 });

    const totalPostsPromise = Post.countDocuments();

    const [allPosts, totalPosts] = await Promise.all([
      allPostsPromise,
      totalPostsPromise,
    ]);

    const numOfPages = Math.ceil(totalPosts / limit);

    return res.status(StatusCodes.OK).json({
      allPosts,
      totalPosts,
      numOfPages,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Server error",
    });
  }
};

const getPost = async (req, res) => {
  const { id: postId } = req.params;
  const singlepost = await Post.findById({ _id: postId }).populate("author", [
    "name",
  ]);

  if (!singlepost) {
    throw new NotFoundError(`No post with id : ${postId}`);
  }

  singlepost.views += 1;
  singlepost.save();
  const postLikes = singlepost.likes.length;
  const postDisLikes = singlepost.dislikes.length;
  res.status(StatusCodes.OK).json({ singlepost, postLikes, postDisLikes });
};

const getAuthorPage = async (req, res) => {
  const { id: authorId } = req.params;
  const queryObject = {
    author: authorId,
  };
  const authorInfo = await User.findById({ _id: authorId });
  authorInfo.views += 1;
  authorInfo.save();
  const authorPosts = await Post.find(queryObject).sort({ createdAt: -1 }).populate("author")
  res.status(StatusCodes.OK).json({ authorPosts, authorInfo });
};

const tagsSearch = async (req, res) => {
  const { search, sort, category, tag } = req.query;

  if (category !== "all") {
    req.body.category = { $regex: category, $options: "i" };
  }

  if (search) {
    req.body.title = { $regex: search, $options: "i" };
  }

  if (tag) {
    req.body.postTags = tag;
  }

  let result = Post.find(req.body);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }

  if (sort === "oldest") {
    result = result.sort("createdAt");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const postg = await result.populate("author", ["name"]);

  const totalPostsg = await Post.countDocuments();
  const numOfPagesg = Math.ceil(totalPostsg / limit);

  return res.status(StatusCodes.OK).json({
    postg,
    totalPostsg,
    numOfPagesg,
  });
};

const navSearch = async (req, res) => {
  const { search } = req.query;

  const queryPostObject = {
    title: (req.body.title = { $regex: search, $options: "i" }),
  };

  const queryAuthorObject = {
    name: (req.body.name = { $regex: search, $options: "i" }),
  };

  let postN = await Post.find(queryPostObject);
  let authorN = await User.find(queryAuthorObject).select("-email")

  return res.status(StatusCodes.OK).json({
    postN,
    authorN,
  });
};

//? get comments
const getComments = async (req, res) => {
  const { id } = req.params;

  const queryObject = {
    postComment: id,
  };
  let comments = await Comment.find(queryObject)
    .populate("author", ["name", "userImg"])
    .populate("replies");

  let commentsReply = await CommentReply.find(queryObject).populate(
    "replieAuthor",
    ["name", "userImg"]
  );

  let commentLikes = await Comment.aggregate([
    { $project: { count: { $size: "$likes" } } },
  ]);

  let commentDisLikes = await Comment.aggregate([
    { $project: { count: { $size: "$dislikes" } } },
  ]);

  let commentReplyLikes = await CommentReply.aggregate([
    { $project: { count: { $size: "$likes" } } },
  ]);

  let commentReplyDisLikes = await CommentReply.aggregate([
    { $project: { count: { $size: "$dislikes" } } },
  ]);

  res.status(StatusCodes.OK).json({
    comments,
    commentLikes,
    commentDisLikes,
    commentsReply,
    commentReplyLikes,
    commentReplyDisLikes,
  });
};

export {
  getAllPost,
  tagsSearch,
  getPost,
  getAuthorPage,
  getComments,
  navSearch,
};
