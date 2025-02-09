const productController = require("../Controllers/productController");
const express = require("express");
const router = express.Router();

router.post("/add-product/:firmId", productController.addProduct);

router.get("/:firmId/products", productController.getProductById);

router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.headersSent("Content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, "uploads", imageName));
});


router.delete("/:productId", productController.deleteProductById);
module.exports = router;
