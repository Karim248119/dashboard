const categoryModel = require("../../models/Category.js");
const GenricMethods = require("../../models/generic.js");
const QueryBuilder = require("../../models/QueryBuilder.js");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// Multer setup for file upload (images)
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/category");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `category-${uuidv4()}.${ext}`);
  },
});

const uploader = multer({
  storage: multerStorage,
});

const uploadMiddleware = uploader.single("image");

const categoryMethods = new GenricMethods(categoryModel);

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const query = new QueryBuilder(categoryModel, req.query);
    const categories = await query.getAll();
    const totalPages = await query.countAllPages();

    res.status(200).json({
      status: "success",
      count: categories.length,
      pages: totalPages,
      data: categories,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryMethods.getById(id);
    if (!category) {
      return res
        .status(404)
        .json({ status: 404, message: "This category is not found" });
    }

    res.status(200).json({
      status: "success",
      category,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  try {
    const data = {
      ...req.body,
      image: req.file ? `/images/category/${req.file.filename}` : null,
    };

    const category = await categoryMethods.create(data);
    res.status(201).json({
      status: "success",
      category,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

// Update a category by ID
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryMethods.getById(id);
    if (!category) {
      return res
        .status(404)
        .json({ status: 404, message: "This category is not found" });
    }

    const updatedData = { ...req.body };

    if (req.file) {
      updatedData.image = `/images/category/${req.file.filename}`;
    }

    const updatedCategory = await categoryMethods.update(id, updatedData);
    res.status(200).json({
      status: "success",
      category: updatedCategory,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryMethods.getById(id);
    if (!category) {
      return res
        .status(404)
        .json({ status: 404, message: "This category is not found" });
    }

    await categoryMethods.delete(id);
    res.status(200).json({
      status: 200,
      message: "Category deleted successfully",
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadMiddleware,
};
