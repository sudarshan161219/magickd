import { Router } from "express";
const router = Router();

//*--> Import all controllers  <--*//
import {
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
} from "../controllers/authPostController.mjs";

//* POST
router.route("/createpost").post(createPost);
router.route("/createcomment").post(createComment);

//* GET
router.route("/author-post").get(authorPosts);
router.route("/single-post/:id").get(getSinglePost);
// router.route("/getcomments/:id").get(getComments);
router.route("/likedposts").get(likedPosts);
router.route("/savedposts").get(getSavedPosts);
router.route("/savedposts").get(getSavedPosts);
router.route("/dashStats").get(dashStats);

//$ DELETE  && PATCH
router.route("/ud/:id").delete(deletePost).patch(editPost);
router.route("/comment/:id").delete(deleteComment).patch(editComment);
router
  .route("/commentreply/:id")
  .delete(deleteCommentReply)
  .patch(editCommentReply);

//? PUT
router.route("/replycomment").put(createReplyComment);
router.route("/like/:id").put(likePost);
router.route("/unlike/:id").put(unLikePost);
router.route("/dislike/:id").put(disLikePost);
router.route("/disunlike/:id").put(disUnLikePost);
router.route("/savepost/:id").put(savepost);
router.route("/unsavepost/:id").put(unsavepost);

//$ like and dislike comment(parent)
router.route("/likecomment/:id").put(likeComment);
router.route("/unlikecomment/:id").put(unLikeComment);
router.route("/dislikecomment/:id").put(dislikeComment);
router.route("/undislikecomment/:id").put(unDislikeComment);

//$ like and dislike comment reply (child)
router.route("/likecommentreply/:id").put(likeCommentReply);
router.route("/unlikecommentreply/:id").put(unLikeCommentReply);
router.route("/dislikecommentreply/:id").put(dislikeCommentReply);
router.route("/undislikecommentreply/:id").put(unDislikeCommentReply);
export default router;
