const express = require("express");
const { getAllProducts, createProduct, updateProduct, loginSalon, getByEmail, deleteProduct, getAllbyRating, getById } = require("../controller/productController.js");
const auth = require('../middleware/auth.js');
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(auth, createProduct);
router.route("/product/login").post(auth, loginSalon);
// router.route("/product/:email").put(updateProduct).get(getById );
router.put('/product/profile/:email',auth, updateProduct);
router.get('/product/:email', getByEmail);
// router.get('/product/id/:id', getById);
router.route("/product/id/:id").get(getById);
// router.get('/product/getbyrating', getAllbyRating);
router.route("/products/getbyrating").get(getAllbyRating)
router.delete('/product/:email', deleteProduct);

module.exports = router