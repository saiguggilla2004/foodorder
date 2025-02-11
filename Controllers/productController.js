const Product = require("../models/Product");
const Firm = require("../models/Firm");
const Vendor = require("../models/Vendor");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.exname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
  try {
    const { productName, price, category, description, bestSeller } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(404).json({ error: "Firm not found" });
    }

    const newProduct = new Product({
      productName,
      price,
      category,
      description,
      bestSeller,
      image,
      firm: firm._id,
    });

    await newProduct.save();

    firm.product.push(newProduct._id);

    await firm.save();

    res.status(201).json({ message: "Product added successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId).populate("product");

    if (!firm) {
      return res.status(404).json({ error: "Firm not found" });
    }
    const products = await Product.find({ firm: firmId });
    const resturantName = firm.firmName;
    res.status(200).json({ resturantName, products });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    IF(!deletedProduct);
    {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  addProduct: [upload.single("image"), addProduct],
  getProductById,
  deleteProductById,
};
