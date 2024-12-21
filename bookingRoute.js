const express = require('express');
const router = express.Router();
const { createBooking, updateBookingState } = require('../controller/bookingController');
const auth = require('../middleware/auth');


// Route for creating a booking
router.route("/booking/create").post(auth, createBooking);
// router.route("/customer/register").post(auth, createCustomer);


// Route for updating the booking state (only salon can approve or decline)
router.route('/booking/:bookingId').put(auth, updateBookingState);

module.exports = router;
