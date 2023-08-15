require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const axios = require('axios');
const { load } = require('cheerio');

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
      )}&number=${number}&addRecipeNutrition=true&addRecipeInformation=true&apiKey=${process.env.REACT_APP_API_KEY}`
    );

    const recipes = response.data;
    res.json(recipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/api/recipes/:id/information', async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );

    const recipeInfo = response.data;
    res.json(recipeInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const websiteConfigs = {
  'www.farmhouseonboone.com': {
    title: 'h2.mv-create-title.mv-create-title-primary',
    ingredients: 'div.mv-create-ingredients ul li',
    instructions: 'div.mv-create-instructions.mv-create-instructions-slot-v2 ol li'
  },
};

// API route to handle recipe scraping
app.post('/scrape-recipe', async (req, res) => {
  try {
    const { url } = req.body;

    // Fetch the HTML content of the provided URL
    const response = await axios.get(url);
    const html = response.data;

    // Use Cheerio to parse the HTML content
    const $ = load(html);

    // Implement your scraping logic here to extract recipe data
    const hostname = new URL(url).hostname;
    const websiteConfig = websiteConfigs[hostname];

    if (!websiteConfig) {
      return res.status(400).json({ error: 'Unsupported website' })
    }

    // For now, let's just send back the title of the page
    const title = $(websiteConfig.title).text();
    const ingredients = [];
    const instructions = [];

    $(websiteConfig.ingredients).each((index, element) => {
      const ingredient = $(element).text().trim();
      ingredients.push(ingredient);
    });

    $(websiteConfig.instructions).each((index, element) => {
      const instruction = $(element).text().trim();
      instructions.push(instruction);
    });
    
    res.json({ title, ingredients, instructions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


require('./config/mongoose.config');

require('./routes/recipe.routes')(app);
require('./routes/user.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));
