const jwt = require('jsonwebtoken');  // Importing JWT for token verification
const User = require('../models/customerModel');  // Importing the user model

const isAuthenticatedUser = async (req, res, next) => {
  try {
    // 1. Extract token from the Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');

    // 2. Verify the token using your JWT secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find the user based on the decoded token's id
    const user = await User.findById(decoded.id);
    if (!user){
      // 4. If no user is found, respond with an error
      return res.status(401).json({ message: 'User not found' });
    }

    // 5. Attach the user to the request object so the next middleware can access it
    req.user = user;

    // 6. Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // 7. If there was an issue (invalid token, etc.), return an authentication error
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = isAuthenticatedUser;
