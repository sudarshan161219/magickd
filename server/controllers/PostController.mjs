import { StatusCodes } from "http-status-codes";
import Post from "../models/Post.mjs";
import { BadRequestError, UnauthenticatedError } from "../errors/export.mjs";

const getallpost = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 15;
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.search) {
      const searchQuery = new RegExp(req.query.search, "i");
      filter.$or = [{ name: searchQuery }, { description: searchQuery }];
    }

    const sortOptions = {};

    if (req.query.sortBy === "latest") {
      sortOptions.createdAt = -1;
    } else if (req.query.sortBy === "oldest") {
      sortOptions.createdAt = 1;
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.tags) {
      filter.tags = req.query.tags; // Change to "tags" (plural)
    }

    const [post, totalPost] = await Promise.all([
      Post.find(filter).skip(skip).limit(limit).sort(sortOptions),
      Post.countDocuments(filter),
    ]);

    const numofPages = Math.ceil(totalPost / limit);

    return res.status(StatusCodes.OK).json({
      post,
      totalPost,
      numofPages,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Server error",
    });
  }
};

const getPost = async (req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findById({ _id: postId });

  if (!post) {
    throw new NotFoundError(`No post with id : ${postId}`);
  }
  res.status(StatusCodes.OK).json({ post });
};



export { getallpost, getPost };
