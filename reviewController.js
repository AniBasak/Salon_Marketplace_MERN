const Salon = require("../models/productModel");

exports.createReview = async (req, res) => {
    const { salonId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    try {
        const salon = await Salon.findById(salonId);
        if (!salon) {
            return res.status(404).json({ success: false, message: "Salon not found" });
        }

        const review = {
            user: userId,
            name: req.user.name,
            rating,
            comment,
        };

        salon.reviews.push(review); // Add review to salon's reviews
        await salon.save(); // Save the salon document

        res.status(201).json({ success: true, message: "Review added", salon });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
