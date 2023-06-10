import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom'

const ApiTest = () => {
  
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const [ingredient1, setIngredient1] = useState('');
  const [ingredient2, setIngredient2] = useState('');
  const [ingredient3, setIngredient3] = useState('');
  const [number, setNumber] = useState(1); // Default value is 1
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${id}`)
      .then(res => {
        console.log(res.data)
        setUser(res.data.user)}
        )
      .catch(err => console.log(err));
  }, [id]);

  const apiKey = 'd355fd2b45d04cc0947f5ccfdc25dd59';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ingredients = `${ingredient1},${ingredient2},${ingredient3}`;
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
          ingredients
        )}&number=${number}&addRecipeNutrition=true&addRecipeInformation=true&apiKey=${apiKey}`
      );
      const data = response.data;
      console.log(data)
      setRecipe(data);
    } catch (error) {
      console.log(error)
    }
  };

  const logout = () => {
    axios.post('http://localhost:8000/api/users/logout', {}, {withCredentials: true})
        .then(res => {
            console.log(res)
            navigate('/')})
        .catch(err => console.log(err));
}

  const logoutButtonStyle = {
      position: 'absolute',
      top: '10px',
      right: '10px',
  };

  return (
    <>
      <div>
        <h1>ApiTest</h1>
        <button className='btn btn-danger' style={logoutButtonStyle} onClick={logout}>Logout</button>
      </div>
      <div className='d-flex justify-content-around mt-4 mb-4'>
            <h5 className=''><Link to={`/recipe/new/${id}`} >Add My Own Recipe</Link></h5>
            <h5><Link to={`/home/${id}`} >Home Page</Link></h5>
      </div>
      <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor="ingredient1">Ingredient 1:</label>
              <input
                type="text"
                className='form-control text-center'
                id="ingredient1"
                value={ingredient1}
                onChange={(e) => setIngredient1(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor="ingredient2">Ingredient 2:</label>
              <input
                type="text"
                className='form-control text-center'
                id="ingredient2"
                value={ingredient2}
                onChange={(e) => setIngredient2(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor="ingredient3">Ingredient 3:</label>
              <input
                type="text"
                className='form-control text-center'
                id="ingredient3"
                value={ingredient3}
                onChange={(e) => setIngredient3(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor="number">Number of recipes (1-5):</label>
              <input
                type="number"
                className='form-control text-center'
                id="number"
                min="1"
                max="5"
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value))}
              />
            </div>
            <button className='btn btn-primary mt-4' type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>

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
