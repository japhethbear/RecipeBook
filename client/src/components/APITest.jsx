import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ApiTest = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState([]);
  const [number, setNumber] = useState(1); // Default value is 1
  const [recipe, setRecipe] = useState(null);
  const [currentIngredient, setCurrentIngredient] = useState('');


  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/users/${id}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data.user);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const apiKey = 'd355fd2b45d04cc0947f5ccfdc25dd59';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ingredientsQuery = ingredients.join(',');
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
          ingredientsQuery
        )}&number=${number}&addRecipeNutrition=true&addRecipeInformation=true&apiKey=${apiKey}`
      );
      const data = response.data;
      console.log(data);
      setRecipe(data);
    } catch (error) {
      console.log(error);
    }
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

  const handleCurrentIngredientChange = (e) => {
    setCurrentIngredient(e.target.value);
  };

  const handleAddIngredient = () => {
    if (currentIngredient.trim() !== '') {
      setIngredients([...ingredients, currentIngredient]);
      console.log(ingredients)
      setCurrentIngredient(''); // Show ingredient list when an ingredient is added
    }
  };
  
  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  return (
    <>
      <div>
        <h1>ApiTest</h1>
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
      <div className='d-flex'>

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
              <p>To search for recipe by ingredients:</p>
              <p>1. Enter your desired ingredient in the ingredient input box.</p>
              <p>2. Click the add ingredient button to save that ingredient for your search and add more if desired. </p>
              <p>3. The ingredients that you will be searching for will populate below.</p>
              <p>4. You will have an empty ingredient input box after you have clicked add ingredient for the last time. This is okay. Only the ingredients populated at the bottom will be contained in the search. </p>
            </div>
          </div>
        </div>
      </div>

      {recipe && (
        <div>
          <h1>{recipe[0].title}</h1>
          <img src={recipe[0].image} alt={recipe[0].title} />
        </div>
      )}

    {ingredients.length > 0 && (
      <div>
        <h3>Ingredients:</h3>
        <ul style={{ listStylePosition: 'inside' }}>
          {ingredients.map((ingredient, index) => (
            <li key={index} className='mb-1'>
              {ingredient}
              <button
                type='button'
                className='btn btn-sm btn-danger mx-2'
                style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem' }}
                onClick={() => handleRemoveIngredient(index)}
              >
                Remove Ingredient
              </button>
              </li>
          ))}
        </ul>
      </div>
    )}
    </>
  );
};

export default ApiTest;
