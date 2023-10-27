import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.mjs";
import { BadRequestError, UnauthenticatedError } from "../errors/export.mjs";

const getItem = async (req, res) => {
  const { search, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  // $ Add stuff based on condition
  // if (category !== 'all') {
  //   queryObject.category = category;
  // }

  // if (price !== 0) {
  //   queryObject.price = price;
  // }

  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
  }
  //$ NO AWAIT
  let result = Product.find(queryObject);

  //$ Chain sort conditions
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }

  //$ setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;

  const totalProducts = await Product.countDocuments(queryObject);
  const numofPages = Math.ceil(totalProducts / limit);
  return res
    .status(StatusCodes.OK)
    .json({ products, totalProducts, numofPages });
};

export { getItem };
