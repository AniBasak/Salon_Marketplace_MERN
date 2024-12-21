const mongoose = require('mongoose');

const salonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
    unique: true,
  },
  menu: [
    {
      name: String,
      price: Number,
    }
  ],
  image:[
    {
        public_id:{
            type:String,
            // required:true,
        },
        url:{
            type:String,
            // required:true,
        }
    }
  ],
  phone: {
    type: String,
    // required: true,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, // Reference to the Customer model
            ref: 'Customer', // Ensure it references the correct model
            required: true, // Make it required
        },
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
  ],
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking' // reference to the Booking model
  }]
});

const Product = mongoose.model('Salon', salonSchema);
module.exports = Product;