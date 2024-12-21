const express = require("express");
const { createReview } = require("../controller/reviewController.js");
const { auth } = require("../middleware/auth");
const router = express.Router();

// router.route("/salons/:salonId/reviews").post(auth, createReview);
router.post("/salons/reviews/:salonId",auth, createReview);



module.exports = router;
