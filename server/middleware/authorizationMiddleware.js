// server/middleware/authorizationMiddleware.js

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
  
  module.exports = { authorizeRecipe };
  