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
        maxlength: [255, "Meal must be no more than 255 characters"],
        enum: ["Breakfast", "Lunch", "Dinner", "Snack"]
        // Add in select bar for this item with enums //
    },
    ingredients: [{
        name: {
            type: String,
            required: [true, "At least one ingredient required."],
            minlength: [2, "Ingredient must be at least 2 characters long"]
        },
        amount: {
            type: String,
            required: [true, "Amount is required"],
            minlength: [2, "Amount must be at least 2 characters long"]
        }
    }],
    favorite: {
        type: Boolean,
        required: [true],
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model("Recipe", RecipeSchema);