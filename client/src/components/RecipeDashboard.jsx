import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';

const RecipeDashboard = () => {
    const [recipes, setRecipes] = useState([])
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const { id } = useParams();
    const [selectedMeal, setSelectedMeal] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/recipes')
            .then(res => {
                console.log(res.data)
                setRecipes(res.data.allRecipes)})
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${id}`)
          .then(res => {
            console.log(res.data)
            setUser(res.data.user)}
            )
          .catch(err => console.log(err));
      }, [id]);

    const navigateToRecipeForm = () => {
        navigate(`/recipe/new/${id}`)
    }

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
    <div className='container'>
        <div className='d-flex justify-content-around mt-4'>
            <h1>My Recipe Book</h1>
            <h5><Link to={`/home/${id}`} >Home Page</Link></h5>
            <button className='btn btn-danger' style={logoutButtonStyle} onClick={logout}>Logout</button>
        </div>
        <div className='d-flex justify-content-between mt-4'>
            <button className="btn-secondary" onClick={navigateToRecipeForm}>Add a Recipe</button>
        </div>
        <div className='d-flex align-content-start mt-4'>
            <label htmlFor="selectedMeal" className='me-2'>Select Meal: </label>
            <select value={selectedMeal} onChange={(e) => setSelectedMeal(e.target.value)}>
                <option value="">All</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Snack">Snack</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
            </select>
        </div>
        <br></br>
        <div>
            {recipes.filter(recipe => selectedMeal === '' || recipe.recipeMeal === selectedMeal)
            .sort(function(a, b) {
                    if(a.createdAt < b.createdAt) return -1;
                    if(a.createdAt > b.createdAt) return 1;
                    return 0;
                }).map((recipe, i) => {
                    return (
                        <div key={recipe._id} data={recipe} className='d-flex flex-column'>
                            <h3 className='d-flex justify-content-start'>{recipe.recipeName}</h3>
                            <div className='d-flex justify-content-between'>
                                <p>{recipe.recipeMeal}</p>
                                <p><Link to={`../recipe/${id}/${recipe._id}/view`}>View</Link></p>
                                <p><Link to={`../recipe/${id}/${recipe._id}`}>edit</Link></p>
                            </div>
                        </div>
                    )
            })}
        </div>
    </div>
  )
}

export default RecipeDashboard