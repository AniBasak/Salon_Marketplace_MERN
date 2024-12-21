const Booking = require("../models/bookingModel");
const Salon = require("../models/productModel");

exports.createBooking = async (req, res) => {
    const { salonId, date, time } = req.body;
    const customerId = req.user.id;
    try {
        const salon = await Salon.findById(salonId);
        if (!salon) {
            return res.status(404).json({ success: false, message: "Salon not found" });
        }

        const booking = await Booking.create({
            salon: salonId,
            customer: customerId,
            date,
            time,
            state: 'pending' // Initial state
        });

        res.status(201).json({ success: true, booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateBookingState = async (req, res) => {
    const { bookingId } = req.params;
    const { state } = req.body;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        booking.state = state;
        await booking.save();

        res.status(200).json({ success: true, booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
