const express = require('express');
const router = express.Router();
const isLoggedin=require('../middlewares/isLoggedin');
const productModel = require('../models/product-model');

router.get('/', (req, res) => {
  let error = req.flash("error");
  let success = req.flash("success");
  res.render("index", { error, success });
});


router.get("/shop", async (req, res) => {
  try {
    let products = await productModel.find();

    products = products.map(product => {
      let imageBase64 = "";
      let mimeType = "image/jpeg"; // default fallback

      if (product.image && product.image.data) {
        imageBase64 = product.image.data.toString("base64");
        mimeType = product.image.contentType || "image/jpeg";
      }

      return {
        ...product._doc,
        imageBase64,
        mimeType
      };
    });

    res.render("shop", { products, success: [] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});





module.exports = router;