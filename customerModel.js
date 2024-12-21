const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  bookings: [
    {
      salonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',  // Reference to 'Product' model
      },
      service: String,
      date: Date,
      status: {
        type: String,
        enum: ['booked', 'completed', 'cancelled'],
        default: 'booked',
      }
    }
  ],
  reviews: [
    {
      salonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',  // Reference to 'Product' model
      },
      rating: Number,
      comment: String,
    }
  ],
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
