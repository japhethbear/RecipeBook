const RecipeController = require('../controllers/recipe.controller');
const { authorizeRecipe, authenticateUser } = require('../middleware/authorizationMiddleware');

module.exports = app => {
    // Get all recipes for the logged-in user
    app.get('/api/recipes/all/:id', RecipeController.findAllRecipes);

    // Get data for one specific recipe
    app.get('/api/recipes/:id', RecipeController.findOneRecipe);

    // Create a new recipe
    app.post('/api/recipes', RecipeController.createRecipe);

    // Update a recipe
    app.put('/api/recipes/:id', RecipeController.updateRecipe);

    // Delete a recipe
    app.delete('/api/recipes/:id', authorizeRecipe, RecipeController.deleteRecipe);
}
