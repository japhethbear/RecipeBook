const Recipe = require('../models/recipe.model');

// Find All Recipes
module.exports.findAllRecipes= (req, res) => {
    Recipe.find({}, (err, recipes) => {
        if (err) {
          // Handle errors
          return res.status(500).json({ error: "Internal Server Error" });
        }
    
        // Filter recipes to only include those created by the authenticated user
        const userRecipes = recipes.filter(recipe => recipe.user.toString() === req.user.id);
    
        // Return the filtered recipes
        return res.status(200).json(userRecipes);
      });
    }

// Find One Recipe
module.exports.findOneRecipe = (req, res) => {
    Recipe.findOne({_id:req.params.id})
        .then(oneRecipe => res.json({ recipe: oneRecipe }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

// Create One Recipe
module.exports.createRecipe = (req, res) => {
    Recipe.create(req.body)
        .then(newRecipe => res.json({ recipe: newRecipe }))
        .catch(err => res.status(400).json({ message: 'Something went wrong', error: err }));
}

// Update Recipe
module.exports.updateRecipe = (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(updatedRecipe => res.json({ recipe: updatedRecipe }))
        .catch(err => res.status(400).json({ message: 'Something went wrong', error: err }));
}

// Delete Recipe
module.exports.deleteRecipe = (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(result => res.json({ result: result }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }))
}