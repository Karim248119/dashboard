const express = require("express");
const router = express.Router();
const categoryEndPoints = require("../../api/categories");
const { uploadMiddleware } = require("../../controllers/categories.js");

router.get("/categories", categoryEndPoints.getAllCategories);
router.get("/categories/:id", categoryEndPoints.getCategoryById);
router.post("/categories", uploadMiddleware, categoryEndPoints.createCategory);
router.put(
  "/categories/:id",
  uploadMiddleware,
  categoryEndPoints.updateCategory
);
router.delete("/categories/:id", categoryEndPoints.deleteCategory);

module.exports = router;
