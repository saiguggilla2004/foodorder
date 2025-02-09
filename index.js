const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const vendorRoutes = require("./Routes/venodrRoutes");
const firmRoutes = require("./Routes/firmRoutes");
const productRoutes = require("./Routes/productRoutes");
mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected!"));
const path=require("path");
app.use(bodyParser.json());
app.use(cors());

app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const port = process.env.PORT || 5000;
app.listen(port, (req, res) => {
  console.log("listening to the port " + port);
});
