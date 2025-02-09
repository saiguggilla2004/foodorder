const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: "Access Denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const vendor = await Vendor.findById(decoded.vendorId);
    if (!vendor) {
      return res.status(401).json({ error: "Vendor not found" });
    }
    req.vendorId = vendor._id;

    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ error: "Invalid Token" });
  }
};

module.exports = verifyToken;
