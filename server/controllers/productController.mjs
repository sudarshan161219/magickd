import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.mjs";
import Purchase from "../models/Purchase.mjs";
import { BadRequestError, UnauthenticatedError } from "../errors/export.mjs";

const getItem = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const allProductPromise = Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalProductPromise = Product.countDocuments();

    const [products, totalProducts] = await Promise.all([
      allProductPromise,
      totalProductPromise,
    ]);

    const numofPages = Math.ceil(totalProducts / limit);

    return res.status(StatusCodes.OK).json({
      products,
      totalProducts,
      numofPages,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Server error",
    });
  }
};

const saveItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = req.params.Id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!product.savedByUsers.includes(userId)) {
      // Add the user's ID to the 'savedByUsers' array
      product.savedByUsers.push(userId);
      await product.save();

      res.json({ message: "Product saved successfully" });
    } else {
      res.status(400).json({ message: "Product is already saved" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const unsaveItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = req.params.Id;

    const product = await Product.findById({ _id: productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.savedByUsers.includes(userId)) {
      product.savedByUsers = product.savedByUsers.filter(
        (savedUserId) => savedUserId !== userId
      );
      await product.save();

      res.json({ message: "Product unsaved successfully" });
    } else {
      res.status(400).json({ message: "Product is not saved by the user" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSavedItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const savedItems = await Product.find({ savedByUsers: userId });
    res.status(StatusCodes.OK).json({ savedItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getallItem = async (req, res) => {
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

    // Price filter: Filter products by price range (minimum and maximum)
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {}; // Create a sub-object for price filtering

      if (req.query.minPrice) {
        filter.price.$gte = Number(req.query.minPrice);
      }

      if (req.query.maxPrice) {
        filter.price.$lte = Number(req.query.maxPrice);
      }
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.tag) {
      filter.tags = req.query.tag;
    }

    const allProductPromise = Product.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sortOptions);

    const totalProductPromise = Product.countDocuments(filter);

    const [products, totalProducts] = await Promise.all([
      allProductPromise,
      totalProductPromise,
    ]);

    const numofPages = Math.ceil(totalProducts / limit);

    return res.status(StatusCodes.OK).json({
      products,
      totalProducts,
      numofPages,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Server error",
    });
  }
};

const getsearchedItem = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 15;
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.search) {
      const searchQuery = new RegExp(req.query.search, "i");
      filter.$or = [{ category: searchQuery }, { tags: searchQuery }];
    }

    const allProductPromise = Product.find(filter)
      .select("category _id")
      .skip(skip)
      .limit(limit);

    const totalProductPromise = Product.countDocuments(filter);

    const [products, totalProducts] = await Promise.all([
      allProductPromise,
      totalProductPromise,
    ]);

    const numofPages = Math.ceil(totalProducts / limit);

    return res.status(StatusCodes.OK).json({
      products,
      totalProducts,
      numofPages,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Server error",
    });
  }
};

// const getProduct = async (req, res) => {
//   const { Id } = req.params;
//   const singleproduct = await Product.findById({ _id: Id }).populate(
//     "savedByUsers"
//   );

//   if (!singleproduct) {
//     throw new NotFoundError(`No post with id : ${Id}`);
//   }

//   res.status(StatusCodes.OK).json({ singleproduct });
// };

const getProduct = async (req, res) => {
  const { Id } = req.params;

  if (Id) {
    const singleproduct = await Product.findById({ _id: Id }).populate(
      "savedByUsers"
    );

    const productsInCategory = await Product.find({
      category: singleproduct.category,
    })
      .populate("savedByUsers")
      .limit(10);

    if (!singleproduct) {
      throw new NotFoundError(`No product with id: ${Id}`);
    }

    res.status(StatusCodes.OK).json({ singleproduct, productsInCategory });
  }
};

const getProductCategory = async (req, res) => {
  const { category } = req.params;

  if (category) {
    const productsInCategory = await Product.find({
      category: category,
    })
      .populate("savedByUsers")
      .limit(10);

    if (!productsInCategory) {
      throw new NotFoundError(`No product with id: ${Id}`);
    }

    res.status(StatusCodes.OK).json({ productsInCategory });
  }
};

const getpurchasedProduct = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Retrieve products where 'purchase' is true
    const purchasedProduct = await Product.find({ purchaseByUser: userId });

    res.status(StatusCodes.OK).json({ purchasedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getItem,
  saveItem,
  unsaveItem,
  getSavedItem,
  getallItem,
  getProduct,
  getpurchasedProduct,
  getsearchedItem,
  getProductCategory,
};
