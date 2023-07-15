require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const axios = require('axios');

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000' // Update with the correct URL of your React app
  }));
app.use(express.json(), express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000' // Update with the correct URL of your React app
  }));

const port = 8000;

app.get('/api/recipes/search', async (req, res) => {
  try {
    const { ingredients, number } = req.query;

    const ingredientsQuery = ingredients.join(',');

    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
        ingredientsQuery
      )}&number=${number}&addRecipeNutrition=true&addRecipeInformation=true&apiKey=0de1ff1e8039475d937fabae43c74b79`
    );

    const recipes = response.data;
    res.json(recipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

require('./config/mongoose.config');

require('./routes/recipe.routes')(app);
require('./routes/user.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));
