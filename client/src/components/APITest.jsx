import React, { useState } from 'react';
import axios from 'axios';

const ApiTest = () => {
  const [ingredient1, setIngredient1] = useState('');
  const [ingredient2, setIngredient2] = useState('');
  const [ingredient3, setIngredient3] = useState('');
  const [recipe, setRecipe] = useState(null);

  const apiKey = 'd355fd2b45d04cc0947f5ccfdc25dd59';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ingredients = `${ingredient1},${ingredient2},${ingredient3}`;
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
          ingredients
        )}&number=1&apiKey=${apiKey}`
      );
      const data = response.data;
      setRecipe(data);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <div>ApiTest</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ingredient1">Ingredient 1:</label>
        <input
          type="text"
          id="ingredient1"
          value={ingredient1}
          onChange={(e) => setIngredient1(e.target.value)}
        />
        <label htmlFor="ingredient2">Ingredient 2:</label>
        <input
          type="text"
          id="ingredient2"
          value={ingredient2}
          onChange={(e) => setIngredient2(e.target.value)}
        />
        <label htmlFor="ingredient3">Ingredient 3:</label>
        <input
          type="text"
          id="ingredient3"
          value={ingredient3}
          onChange={(e) => setIngredient3(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {recipe && (
        <div>
          <h1>{recipe[0].title}</h1>
          <img src={recipe[0].image} alt={recipe[0].title} />
        </div>
      )}
    </>
  );
};

export default ApiTest;
