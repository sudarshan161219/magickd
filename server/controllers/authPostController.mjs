import Post from "../models/Post.mjs";
import User from "../models/User.mjs";
import Comment from "../models/Comments.mjs";
import CommentReply from "../models/CommentsReplies.mjs";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from "../errors/export.mjs";
import checkPermissions from "../utils/checkPermissions.mjs";

const createPost = async (req, res) => {
  const { title, coverImg, content, postTags, category } = req.body;
  if (!title || !coverImg || !content || !postTags || !category) {
    throw new BadRequestError("please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  req.body.author = req.user.userId;
  const post = await Post.create(req.body);
  return res.status(StatusCodes.CREATED).json({
    post,
  });
};

const authorPosts = async (req, res) => {
  const { search, sort, category, tag } = req.query;

  const queryObject = {
    author: req.user.userId,
  };

  const user = await User.findById({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  //$ add stuff based on condition
  if (category !== "all") {
    queryObject.category = category;
  }

  if (search) {
    queryObject.title = { $regex: search, $options: "i" };
  }

  //$ no Await
  let result = Post.find(queryObject);

  //$chain sort condition
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

  const authorpost = await result;

  const totalPosts = await Post.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalPosts / limit);

  return res.status(StatusCodes.OK).json({
    authorpost,
    totalPosts,
    numOfPages,
  });
};

const getSinglePost = async (req, res) => {
  const { id: postId } = req.params;
  const singlepost = await Post.findById({ _id: postId });

  if (!singlepost) {
    throw new NotFoundError(`No post with id : ${postId}`);
  }

  checkPermissions(req.user, singlepost.author);
  res.status(StatusCodes.OK).json({ singlepost });
};

const editPost = async (req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findById({ _id: postId });
  if (!post) {
    throw new NotFoundError(`No post with id : ${id}`);
  }
  checkPermissions(req.user, post.author);
  const updatedPost = await Post.findOneAndUpdate({ _id: postId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedPost });
};

const deletePost = async (req, res) => {
  const { id: postId } = req.params;

  const queryComment = {
    postComment: postId,
  };

  const queryCommentReply = {
    postCommentId: postId,
  };

  const post = await Post.findById({ _id: postId });
  if (!post) {
    throw new NotFoundError(`No post with id : ${id}`);
  }
  checkPermissions(req.user, post.author);
  await Post.findByIdAndDelete({ _id: postId });
  await Comment.deleteMany(queryComment);
  await CommentReply.deleteMany(queryCommentReply);
  res.status(StatusCodes.OK).json({ msg: "Success Post removed" });
};

const likePost = async (req, res) => {
  const { id: postId } = req.params;
  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError(
      "Login or Sign Up for like, comment the post"
    );
  }

  const blogPost = await Post.findById(postId);
  if (!blogPost) {
    return res.status(404).json({ error: "Blog post not found" });
  }

  if (!blogPost.likes.includes(req.user.userId)) {
    blogPost.likes.push(req.user.userId);
    await blogPost.save();
  }

  const postLikes = blogPost.likes.length;
  res.status(StatusCodes.OK).json({ postLikes });
};

const unLikePost = async (req, res) => {
  const { id: postId } = req.params;
  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError(
      "Login or Sign Up for like, comment the post"
    );
  }

  const blogPost = await Post.findById(postId);
  if (!blogPost) {
    return res.status(404).json({ error: "Blog post not found" });
  }

  if (blogPost.likes.includes(req.user.userId)) {
    blogPost.likes.pull(req.user.userId);
    await blogPost.save();
  }
  const postLikes = blogPost.likes.length;

  res.status(StatusCodes.OK).json({ postLikes });
};

const disLikePost = async (req, res) => {
  const { id: postId } = req.params;
  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError(
      "Login or Sign Up for like, comment the post"
    );
  }

  const blogPost = await Post.findById(postId);
  if (!blogPost) {
    return res.status(404).json({ error: "Blog post not found" });
  }

  if (!blogPost.dislikes.includes(req.user.userId)) {
    blogPost.dislikes.push(req.user.userId);
    await blogPost.save();
  }
  const postDisLikes = blogPost.dislikes.length;

  res.status(StatusCodes.OK).json({ postDisLikes });
};

const disUnLikePost = async (req, res) => {
  const { id: postId } = req.params;
  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError(
      "Login or Sign Up for like, comment the post"
    );
  }

  const blogPost = await Post.findById(postId);
  if (!blogPost) {
    return res.status(404).json({ error: "Blog post not found" });
  }

  if (blogPost.dislikes.includes(req.user.userId)) {
    blogPost.dislikes.pull(req.user.userId);
    await blogPost.save();
  }
  const postDisLikes = blogPost.dislikes.length;
  res.status(StatusCodes.OK).json({ postDisLikes });
};

//$ get save post
const likedPosts = async (req, res) => {
  const queryObject = {
    likes: req.user.userId,
  };

  const user = await User.findById({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  //$ no Await
  let result = await Post.find(queryObject);
  res.status(StatusCodes.OK).json({ result });
};

//$ put save post
const savepost = async (req, res) => {
  const { id: postId } = req.params;
  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError(
      "Login or Sign Up for like, comment the post"
    );
  }

  const save_Post = await Post.findByIdAndUpdate(
    { _id: postId },
    {
      $push: { savepost: req.user.userId },
    },
    { new: true }
  );

  res.status(StatusCodes.OK).json({ save_Post });
};

//$ put unsave post
const unsavepost = async (req, res) => {
  const { id: postId } = req.params;
  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError(
      "Login or Sign Up for like, comment the post"
    );
  }

  const save_Post = await Post.findByIdAndUpdate(
    { _id: postId },
    {
      $pull: { savepost: req.user.userId },
    },
    { new: true }
  );

  res.status(StatusCodes.OK).json({ save_Post });
};

//$ get saved post
const getSavedPosts = async (req, res) => {
  const queryObject = {
    savepost: req.user.userId,
  };

  const user = await User.findById({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  let result = await Post.find(queryObject).populate("author", ["name"])
  res.status(StatusCodes.OK).json({ result });
};

//?  Create Comment
const createComment = async (req, res) => {
  const { userId, postId, content } = req.body;
  if (!postId || !content) {
    throw new BadRequestError("please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  req.body.author = req.user.userId;
  req.body.postComment = postId;

  const comment = await Comment.create(req.body);

  const save_post_comment = await Post.findByIdAndUpdate(
    { _id: postId },
    {
      $push: { comments: comment },
    },
    { new: true }
  );

  return res.status(StatusCodes.CREATED).json({
    comment,
    save_post_comment,
  });
};

//?  Create Reply Comment
const createReplyComment = async (req, res) => {
  const { postId, commentId, Rcontent, parentCommentId } = req.body;
  if (!commentId || !Rcontent) {
    throw new BadRequestError("please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  req.body.replieAuthor = req.user.userId;
  req.body.postCommentId = postId;
  req.body.repliedComment = Rcontent;
  req.body.parentCommentId = parentCommentId;
  const comment_relpy = await CommentReply.create(req.body);

  const push_replycomment_comment = await Comment.findByIdAndUpdate(
    { _id: commentId },
    {
      $push: { replies: comment_relpy },
    },
    { new: true }
  );

  return res.status(StatusCodes.CREATED).json({
    comment_relpy,
    push_replycomment_comment,
  });
};

//? like Comment
const likeComment = async (req, res) => {
  const { id: commentId } = req.params;

  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError(
      "Login or Sign Up for like, comment the post"
    );
  }

  const like_dislike_comment = await Comment.findByIdAndUpdate(
    { _id: commentId },
    {
      $push: { likes: req.user.userId },
    },
    { new: true }
  );

  let commentLikes = await Comment.aggregate([
    { $project: { count: { $size: "$likes" } } },
  ]);

  res.status(StatusCodes.OK).json({ like_dislike_comment, commentLikes });
};

//? unlike Comment
const unLikeComment = async (req, res) => {
  const { id: commentId } = req.params;
  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError(
      "Login or Sign Up for like, comment the post"
    );
  }

  const like_dislike_comment = await Comment.findByIdAndUpdate(
    { _id: commentId },
    {
      $pull: { likes: req.user.userId },
    },
    { new: true }
  );

  let commentLikes = await Comment.aggregate([
    { $project: { count: { $size: "$likes" } } },
  ]);

  res.status(StatusCodes.OK).json({ like_dislike_comment, commentLikes });
};

//? dislike Comment
const dislikeComment = async (req, res) => {
  const { id: commentId } = req.params;
  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError(
      "Login or Sign Up for like, comment the post"
    );
  }

  const like_dislike_comment = await Comment.findByIdAndUpdate(
    { _id: commentId },
    {
      $push: { dislikes: req.user.userId },
    },
    { new: true }
  );

  let commentDisLikes = await Comment.aggregate([
    { $project: { count: { $size: "$dislikes" } } },
  ]);

  res.status(StatusCodes.OK).json({ like_dislike_comment, commentDisLikes });
};

//? undislike Comment
const unDislikeComment = async (req, res) => {
  const { id: commentId } = req.params;
  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError(
      "Login or Sign Up for like, comment the post"
    );
  }

  const like_dislike_comment = await Comment.findByIdAndUpdate(
    { _id: commentId },
    {
      $pull: { dislikes: req.user.userId },
    },
    { new: true }
  );

  let commentDisLikes = await Comment.aggregate([
    { $project: { count: { $size: "$dislikes" } } },
  ]);

  res.status(StatusCodes.OK).json({ like_dislike_comment, commentDisLikes });
};

//<--/// -->
//? like Comment Reply
const likeCommentReply = async (req, res) => {
  const { id: commentId } = req.params;

  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError(
      "Login or Sign Up for like, comment the post"
    );
  }

  const like_dislike_comment = await CommentReply.findByIdAndUpdate(
    { _id: commentId },
    {
      $push: { likes: req.user.userId },
    },
    { new: true }
  );

  let commentReplyLikes = await CommentReply.aggregate([
    { $project: { count: { $size: "$likes" } } },
  ]);

  res.status(StatusCodes.OK).json({ like_dislike_comment, commentReplyLikes });
};

//? unlike Comment Reply
const unLikeCommentReply = async (req, res) => {
  const { id: commentId } = req.params;
  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError(
      "Login or Sign Up for like, comment the post"
    );
  }

  const like_dislike_comment = await CommentReply.findByIdAndUpdate(
    { _id: commentId },
    {
      $pull: { likes: req.user.userId },
    },
    { new: true }
  );

  let commentReplyLikes = await CommentReply.aggregate([
    { $project: { count: { $size: "$likes" } } },
  ]);

  res.status(StatusCodes.OK).json({ like_dislike_comment, commentReplyLikes });
};

//? dislike Comment Reply
const dislikeCommentReply = async (req, res) => {
  const { id: commentId } = req.params;
  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError(
      "Login or Sign Up for like, comment the post"
    );
  }

  const like_dislike_comment = await CommentReply.findByIdAndUpdate(
    { _id: commentId },
    {
      $push: { dislikes: req.user.userId },
    },
    { new: true }
  );

  let commentReplyDisLikes = await CommentReply.aggregate([
    { $project: { count: { $size: "$dislikes" } } },
  ]);

  res
    .status(StatusCodes.OK)
    .json({ like_dislike_comment, commentReplyDisLikes });
};

//? undislike Comment Reply
const unDislikeCommentReply = async (req, res) => {
  const { id: commentId } = req.params;
  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError(
      "Login or Sign Up for like, comment the post"
    );
  }

  const like_dislike_comment = await CommentReply.findByIdAndUpdate(
    { _id: commentId },
    {
      $pull: { dislikes: req.user.userId },
    },
    { new: true }
  );

  let commentReplyDisLikes = await CommentReply.aggregate([
    { $project: { count: { $size: "$dislikes" } } },
  ]);

  res
    .status(StatusCodes.OK)
    .json({ like_dislike_comment, commentReplyDisLikes });
};

//$ edit comment
const editComment = async (req, res) => {
  const { id: commentId } = req.params;
  const comment = await Comment.findById({ _id: commentId });
  if (!comment) {
    throw new NotFoundError(`No comment with id : ${id}`);
  }
  checkPermissions(req.user, comment.author);
  const updatedComment = await Comment.findOneAndUpdate(
    { _id: commentId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedComment });
};

//$ delete comment
const deleteComment = async (req, res) => {
  const { id: CommentId } = req.params;
  const comment = await Comment.findById({ _id: CommentId });
  if (!comment) {
    throw new NotFoundError(`No post with id : ${id}`);
  }
  checkPermissions(req.user, comment.author);
  await Comment.findByIdAndDelete({ _id: CommentId });
  res.status(StatusCodes.OK).json({ msg: "Success comment removed" });
};

//$ edit comment reply
const editCommentReply = async (req, res) => {
  const { id: commentReplyId } = req.params;
  const commentreply = await CommentReply.findById({ _id: commentReplyId });
  if (!commentreply) {
    throw new NotFoundError(`No comment reply with id : ${id}`);
  }
  checkPermissions(req.user, commentreply.replieAuthor);

  const updatedCommentReply = await CommentReply.findOneAndUpdate(
    { _id: commentReplyId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedCommentReply });
};

//$ delete comment reply
const deleteCommentReply = async (req, res) => {
  const { id: CommentReplyId } = req.params;
  const commentreply = await CommentReply.findById({ _id: CommentReplyId });
  if (!commentreply) {
    throw new NotFoundError(`No post with id : ${id}`);
  }
  checkPermissions(req.user, commentreply.replieAuthor);
  await CommentReply.findByIdAndDelete({ _id: CommentReplyId });
  res.status(StatusCodes.OK).json({ msg: "Success comment reply removed" });
};

const dashStats = async (req, res) => {
  const queryObject = {
    author: req.user.userId,
  };
  const user = await User.findById({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const blogPosts = await Post.find(queryObject).sort({ views: -1 }).limit(5);
  const mostViewedPosts = blogPosts.map((post) => ({ title: post.title, id: post._id }));
  const totalPosts = await Post.countDocuments(queryObject);
  const totalViews = blogPosts.reduce((total, post) => total + post.views, 0);
  const totalAuthorViews = user.views;

  res
    .status(StatusCodes.OK)
    .json({ mostViewedPosts, totalPosts, totalViews, totalAuthorViews });
};

export {
  createPost,
  authorPosts,
  getSinglePost,
  editPost,
  deletePost,
  likePost,
  unLikePost,
  disLikePost,
  disUnLikePost,
  likedPosts,
  savepost,
  unsavepost,
  getSavedPosts,
  createComment,
  createReplyComment,
  // getComments,
  likeComment,
  unLikeComment,
  dislikeComment,
  unDislikeComment,
  likeCommentReply,
  unLikeCommentReply,
  dislikeCommentReply,
  unDislikeCommentReply,
  deleteComment,
  editComment,
  editCommentReply,
  deleteCommentReply,
  dashStats,
};
