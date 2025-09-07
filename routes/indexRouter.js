const express = require('express');
const router = express.Router();
const isLoggedin=require('../middlewares/isLoggedin')

router.get('/', (req, res) => {
  let error = req.flash("error");
  let success = req.flash("success");
  res.render("index", { error, success });
});


router.get('/shop', isLoggedin, (req, res) => {
  const products = []; // replace with real products from DB later
  const success = req.flash("success");
  const error = req.flash("error");
  res.render("shop", { products, success, error });
});



module.exports = router;