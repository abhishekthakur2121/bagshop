const express = require('express');
const router = express.Router();
const isLoggedin=require('../middlewares/isLoggedin');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get('/', (req, res) => {
  let error = req.flash("error");
  let success = req.flash("success");

  // ✅ check if JWT token exists in cookies
  let loggedin = req.cookies.token ? true : false;

  res.render("index", { error, loggedin, success });
});


router.get('/cart',isLoggedin , async (req, res) => {

   let user= await userModel
  .findOne({email: req.user.email})
  .populate("cart")
   res.render("cart",{user})
});

router.get('/addtocart/:productid', isLoggedin, async (req, res) => {
  try {
    // fetch single user, not array
    let currentUser = await userModel.findOne({ email: req.user.email });

    if (!currentUser) {
      req.flash("error", "User not found");
      return res.redirect("/shop");
    }

    // now safe to push into cart
    currentUser.cart.push(req.params.productid);
    await currentUser.save();

    req.flash("success", "Added To Cart");
    res.redirect("/shop");
    
  } catch (err) {
    console.error("Add to cart error:", err);
    req.flash("error", "Something went wrong");
    res.redirect("/shop");
  }
});



// Shop Page
router.get('/shop', async (req, res) => {
  try {
    let success=req.flash("success");

    let products = await productModel.find();

    products = products.map(product => {
      let imageBase64 = "";
      let mimeType = "image/jpeg";

      if (product.image && product.image.data) {
        imageBase64 = product.image.data.toString("base64");
        mimeType = product.image.contentType || "image/jpeg";
      }

      return { ...product._doc, imageBase64, mimeType };
    });

    let loggedin = req.cookies.token ? true : false;

    res.render("shop", { products, success, loggedin });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
