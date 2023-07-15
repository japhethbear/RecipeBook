import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import RecipeForm from './RecipeForm';

const ApiTest = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState([]);
  const [number, setNumber] = useState(1);
  const [multiplier, setMultiplier] = useState(1); // New state for serving size multiplier

  const [recipes, setRecipes] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [recipeInfo, setRecipeInfo] = useState(null);
  const [errors, setErrors] = useState([]);

  const [recipe, setRecipe] = useState({
    recipeName: '',
    recipeMeal: '',
    favorite: false,
    ingredients: [],
    instructions: [],
    photos: [],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/users/${id}`)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8000/api/recipes/search', {
        params: {
          ingredients,
          number
        }
      });
      const data = response.data;
      console.log(data);
      setRecipes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCurrentIngredientChange = (e) => {
    setCurrentIngredient(e.target.value);
  };

  const handleAddIngredient = () => {
    if (currentIngredient.trim() !== '') {
      setIngredients([...ingredients, currentIngredient]);
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleToggleDetails = async (recipeId) => {
    if (recipeInfo && recipeInfo.id === recipeId) {
      setRecipeInfo(null);
    } else {
      try {
        const response = await axios.get(`/api/recipes/${recipeId}/information`);
        const data = response.data;
        console.log(data);
        setRecipeInfo(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleRecipeSelection = (recipe) => {
    console.log('Selected Recipe:', recipe);

    const dishTypes = recipe.dishTypes || [];
    const mealType =
      dishTypes.includes('breakfast')
        ? 'breakfast'
        : dishTypes.includes('lunch')
        ? 'lunch'
        : dishTypes.includes('dinner')
        ? 'dinner'
        : dishTypes.includes('snack')
        ? 'snack'
        : 'lunch';
  
    const ingredients = recipe.extendedIngredients ? recipe.extendedIngredients.map((ingredient) => ingredient.original) : [];
    const instructions = recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? recipe.analyzedInstructions[0].steps.map((step) => step.step) : [];
  
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      recipeName: recipe.title,
      recipeMeal: mealType,
      ingredients,
      instructions,
      photos: [recipe.image],
    }));
  };
  

  const submitRecipe = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/recipes', recipe)
      .then((res) => {
        console.log(res);
        navigate(`/myrecipes/${id}`);
      })
      .catch((err) => {
        const errorResponse = err.response.data.error.errors;
        console.log(err);
        const errorArr = [];
        for (const key of Object.keys(errorResponse)) {
          errorArr.push(errorResponse[key].message);
        }
        setErrors(errorArr);
      });
  };

  const logout = () => {
    axios
      .post('http://localhost:8000/api/users/logout', {}, { withCredentials: true })
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  const logoutButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
  };

    // Function to handle serving size multiplier
    const handleMultiplier = (multiplier) => {
      setMultiplier(multiplier);
      setNumber(1); // Reset number of recipes to 1 when changing the serving size
    };
  

  return (
    <>
      <div>
        <h1>Search for Recipe!</h1>
        <button className="btn btn-danger" style={logoutButtonStyle} onClick={logout}>
          Logout
        </button>
      </div>
      <div className="d-flex justify-content-around mt-4 mb-4">
        <h5 className="">
          <Link to={`/recipe/new/${id}`}>Add My Own Recipe</Link>
        </h5>
        <h5>
          <Link to={`/home/${id}`}>Home Page</Link>
        </h5>
      </div>
      <div className="d-flex">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor={ingredients}>Ingredient:</label>
                  <input
                    type="text"
                    className="form-control text-center"
                    id={currentIngredient}
                    value={currentIngredient}
                    onChange={handleCurrentIngredientChange}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-primary mb-4 mt-2"
                  onClick={handleAddIngredient}
                >
                  Add Ingredient
                </button>
                <div className="form-group">
                  <label htmlFor="number">Number of recipes (1-5):</label>
                  <input
                    type="number"
                    className="form-control text-center"
                    id="number"
                    min="1"
                    max="5"
                    value={number}
                    onChange={(e) => setNumber(parseInt(e.target.value))}
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="multiplier">Serving size multiplier:</label>
                  <div>
                    <button
                      className={`btn btn-sm ${multiplier === 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => handleMultiplier(1)}
                      disabled={multiplier === 1}
                    >
                      1x
                    </button>
                    <button
                      className={`btn btn-sm ${multiplier === 2 ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => handleMultiplier(2)}
                      disabled={multiplier === 2}
                    >
                      2x
                    </button>
                    <button
                      className={`btn btn-sm ${multiplier === 3 ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => handleMultiplier(3)}
                      disabled={multiplier === 3}
                    >
                      3x
                    </button>
                  </div>
                </div>
                <button className="btn btn-primary mt-4" type="submit">
                  Search for Recipe
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <h3>Instructions:</h3>
              <p>To search for a recipe by ingredients:</p>
              <p>1. Enter your desired ingredient in the ingredient input box.</p>
              <p>2. Click the "Add Ingredient" button to add the ingredient to the list.</p>
              <p>
                3. Specify the number of recipes you want to retrieve (between 1 and 5) using
                the number input box.
              </p>
              <p>4. Click the "Search for Recipe" button to fetch recipes.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-around mt-4 mb-4">
        <div>
          <h5>My Ingredients:</h5>
          <ul className="list-group">
            {ingredients.map((ingredient, index) => (
              <li className="list-group-item" key={index}>
                {ingredient}
                <button
                  type="button"
                  className="btn btn-sm btn-danger float-right mx-2"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5>Recipes:</h5>
          <ul className="list-group">
            {recipes.map((recipe) => (
              <li className="list-group-item" key={recipe.id}>
                <div className="d-flex justify-content-between mb-2 align-items-center">
                  <h6>{recipe.title}</h6>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary mx-2"
                    onClick={() => handleToggleDetails(recipe.id)}
                  >
                    {recipeInfo && recipeInfo.id === recipe.id ? 'Hide Details' : 'Show Details'}
                  </button>
                </div>
                <img className='img-thumbnail'src={recipe.image} alt={recipe.title || 'Recipe Image'} style={{width: '175px'}}/>

                {recipeInfo && recipeInfo.id === recipe.id && (
                  <div>
                  <h3 style={{ fontWeight: 'bold' }}>Preparation Time:</h3>
                  <p>{recipeInfo.readyInMinutes} minutes</p>
                  <h3 style={{ fontWeight: 'bold' }}>Servings:</h3>
                  <p>{recipeInfo.servings * multiplier}</p>
                  <h3 style={{ fontWeight: 'bold' }}>Ingredients:</h3>
                  <ul style={{ listStyleType: 'none' }}>
                    {recipeInfo.extendedIngredients.map((ingredient) => (
                      <li key={ingredient.id}>
                        {ingredient.amount * multiplier} {ingredient.unit} {ingredient.name}
                      </li>
                    ))}
                  </ul>
                  <h3 style={{ fontWeight: 'bold' }}>Instructions:</h3>
                  <ol style={{ listStyleType: 'none' }}>
                    {recipeInfo.analyzedInstructions.map((instruction, index) => (
                      instruction.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step.number}. {step.step.replace(/\.(\w)/g, '. $1')}</li>
                        ))
                    ))}
                  </ol>
                </div>
                )}
                <div>
                <button
                  type="button"
                  className="btn btn-sm btn-success mt-2"
                  onClick={() => handleRecipeSelection(recipe)}
                >
                  Select Recipe
                </button>

                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ApiTest;
