const express = require("express");
const { createCustomer, loginCustomer, getCustomerByEmail, getAllCustomers, getCustomerById } = require("../controller/customerController");
const auth = require('../middleware/auth.js');
const router = express.Router();

// Route to create a new customer
router.route("/customer").get(getAllCustomers);
router.route("/customer/register").post(auth, createCustomer);

// Route for customer login
router.route("/customer/login").post(auth, loginCustomer);

// Route to get a customer by email
router.route("/customer/email/:email").get(getCustomerByEmail);
router.route("/customer/id/:id").get(getCustomerById);

module.exports = router;
