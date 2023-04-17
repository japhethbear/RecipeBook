const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name must be at least 2 characters long"]
    },
    recipeMeal: {
        type: String,
        required: [true, "Meal is required"],
        enum: ["Breakfast", "Lunch", "Dinner", "Snack"]
    },
    favorite: {
        type: Boolean,
        required: [true],
        default: false
    },
    ingredients: [{
        ingredientName: {
            type: String,
            required: [true, "Name is required"],
            minlength: [2, "Name must be at least 2 characters long"]
        },
        ingredientAmount: {
            type: String,
            required: [true, "Amount is required"],
            minlength: [2, "Amount must be at least 2 characters long"]
        }
    }],
}, {timestamps: true});

module.exports = mongoose.model("Recipe", RecipeSchema);