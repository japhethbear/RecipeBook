import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import RecipeForm from './RecipeForm';
import '../components/HomePage/homepagestyles.css'
import kitchenBackground from '../assets/images/kitchenbackground.jpg'
import cookbook from '../assets/images/cookbook.png'
import gordonFlavors from '../assets/images/gordonflavors.gif'

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
      <div className="dashboard-background-container" style={{ backgroundImage: `url(${kitchenBackground})` }}>
          <div className="auth-navbar">
            <div className="container">
              <div className="auth-navbar-brand">
                <img src={cookbook} alt="Cook Book Picture" style={{ width: '40px', height: 'auto' }} />
                <h3>Recipe Book</h3>
              </div>
              <div className="auth-navbar-links">
                <Link to={`/home/${id}`} className="auth-navbar-link" >Home Page</Link>
                <Link to="/" className="auth-navbar-link" onClick={logout}>Logout</Link>
              </div>
           </div>
          </div>
          <div className='d-flex justify-content-start align-items-center mt-2'>
            <img
                    src={gordonFlavors}
                    alt="Gordon Ramsey Help GIF"
                    style={{ width: '300px', maxWidth: '400px', padding: '20px' }}
                    />
                    <h1 className="landing-heading" style={{ marginLeft: '300px'}}>Search for Recipe</h1>
            </div>
          
          <div className="d-flex">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor={ingredients} style={{ fontSize: '18px'}}>Ingredient:</label>
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
                      <label htmlFor="number" style={{ fontSize: '18px'}}>Number of recipes (1-5):</label>
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
                      <label htmlFor="multiplier" style={{ fontSize: '18px'}}>Serving size multiplier:</label>
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
                  <p style={{ fontSize: '18px'}}>To search for a recipe by ingredients:</p>
                  <p style={{ fontSize: '18px'}}>1. Enter your desired ingredient in the ingredient input box.</p>
                  <p style={{ fontSize: '18px'}}>2. Click the "Add Ingredient" button to add the ingredient to the list.</p>
                  <p style={{ fontSize: '18px'}}>
                    3. Specify the number of recipes you want to retrieve (between 1 and 5) using
                    the number input box.
                  </p>
                  <p style={{ fontSize: '18px'}}>4. Click the "Search for Recipe" button to fetch recipes.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around mt-4 mb-4">
            <div>
              <h5>My Ingredients:</h5>
              <ul className="list-group">
                {ingredients.map((ingredient, index) => (
                  <li className="list-group-item my-1" key={index}>
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
              <h5 style={{ fontSize: '28px' }}>Recipes:</h5>
              <ul className="list-group">
                {recipes.map((recipe) => (
                  <li className="list-group-item my-1" key={recipe.id}>
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
                      <div className='details-container' style={{ width: '550px' }}>
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
                    {/* <button
                      type="button"
                      className="btn btn-sm btn-success mt-2"
                      onClick={() => handleRecipeSelection(recipe)}
                    >
                      Select Recipe
                    </button> */}

                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
    </>
  );
};

export default ApiTest;
