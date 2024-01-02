// server/middleware/authorizationMiddleware.js
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

const authorizeRecipe = (req, res, next) => {
    // Check if the authenticated user's ID matches the recipe's user ID
    if (req.user && req.user.id === req.recipe.user.toString()) {
      // User is authorized, proceed with the request
      next();
    } else {
      // User is not authorized, return an error response
      return res.status(403).json({ error: "Unauthorized" });
    }
  };

const authenticateUser = (req, res, next) => {

  const token = req.headers.authorization || req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    req.user = decoded.user;

    next();
    console.log(req.user);
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
  
  module.exports = { authorizeRecipe, authenticateUser };
  