const productModel = require("../../models/Product.js");
const categoryModel = require("../../models/Category.js");
const GenricMethods = require("../../models/generic.js");
const QueryBuilder = require("../../models/QueryBuilder.js");

const productMethods = new GenricMethods(productModel);
const categoryMethods = new GenricMethods(categoryModel);
const getAllProducts = async (req, res) => {
  try {
    const { cat_id, min_price, max_price } = req.query;
    let filters = {};
    if (cat_id) {
      const category = await categoryMethods.getById(cat_id);
      if (category) {
        filters.cat_id = cat_id;
      } else {
        return res
          .status(404)
          .json({ status: 404, message: " This category is not found" });
      }
    }
    if (min_price && !max_price) {
      filters.price = { $gt: min_price };
    } else if (max_price && !min_price) {
      filters.price = { $lt: max_price };
    } else if (min_price && max_price) {
      filters.price = { $gt: min_price, $lt: max_price };
    }

    const query = new QueryBuilder(productModel, req.query);
    const products = await query
      .filter(filters)
      .serach()
      .populate("cat_id", ["title", "description"])
      .sort()
      .pagination()
      .customizeFields()
      .getAll();
    const totalPages = await query.countAllPages();

    res.status(200).json({
      status: "success",
      count: products.length,
      pages: totalPages,
      date: products,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productMethods.getById(id);
    if (!product) {
      return res
        .status(404)
        .json({ status: 404, message: "this product is not found" });
    }

    res.status(200).json({
      status: "success",
      product,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

const createProduct = async (req, res) => {
  const mainImage = req.files["main_image"]
    ? `/images/products/${req.files["main_image"][0].filename}`
    : null;
  const images = req.files["images"]
    ? req.files["images"].map((file) => `/images/products/${file.filename}`)
    : [];

  const data = {
    ...req.body,
    main_image: mainImage,
    images,
  };

  const product = await productMethods.create(data, {
    ref: "cat_id",
    fields: ["title", "desc"],
  });
  res.status(200).json({
    status: "success",
    product,
  });
};

const updateProduct = async (req, res) => {
  try {
    const { body, files } = req;
    const { id } = req.params;
    const product = await productMethods.getById(id);
    if (!product) {
      return res
        .status(404)
        .json({ status: 404, message: "this product is not found" });
    }
    const updatedData = { ...body };

    if (files) {
      if (files["main_image"]) {
        updatedData.main_image = `/images/products/${req.files["main_image"][0].filename}`;
      }
      if (files["images"]) {
        updateDate.images = req.files["images"].map(
          (file) => `/images/products/${file.filename}`
        );
      }
    }
    const updatedProduct = await productMethods.update(id, updatedData);
    res.status(200).json({ status: 200, product: updatedProduct });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productMethods.getById(id);
    if (!product) {
      return res
        .status(404)
        .json({ status: 404, message: "this product is not found" });
    }

    await productMethods.delete(id);
    res.status(200).json({
      status: 200,
      message: "the product has been deleted successfuly",
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
