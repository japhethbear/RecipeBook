const RecipeController = require('../controllers/recipe.controller');

module.exports = app => {
    app.get('/api/recipes', RecipeController.findAllRecipes);
    app.get('/api/recipes/:id', RecipeController.findOneRecipe);
    app.post('/api/recipes', RecipeController.createRecipe);
    app.put('/api/recipes/:id', RecipeController.updateRecipe);
    app.delete('/api/recipes/:id', RecipeController.deleteRecipe);
}