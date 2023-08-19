import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import '../components/HomePage/homepagestyles.css'
import kitchenBackground from '../assets/images/kitchenbackground.jpg'
import cookbook from '../assets/images/cookbook.png'
import excitedRamsey from '../assets/images/excitedramsey.gif'

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
                    src={excitedRamsey}
                    alt="Gordon Ramsey Help GIF"
                    style={{ width: '300px', maxWidth: '400px', padding: '20px' }}
                    />
                    <h1 className="landing-heading" style={{ marginLeft: '300px'}}>My Recipe Book</h1>
            </div>


            <div className='recipe-list-container'>
                <div className='d-flex justify-content-end mt-4'>
                    <button className="btn-secondary" onClick={navigateToRecipeForm}>Add a Recipe</button>
                </div>
                <div className='d-flex justify-content-end align-content-start mt-4'>
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
                                    <h3 className='d-flex justify-content-start recipe-background' style={{ fontSize: '30px' }}>{recipe.recipeName}</h3>
                                    <div className='d-flex justify-content-between'>
                                        <p className='recipe-background'style={{ fontSize: '20px'}}>{recipe.recipeMeal}</p>
                                        <p className='recipe-background'><Link to={`../recipe/${id}/${recipe._id}/view`} style={{ fontSize: '20px'}} className='auth-navbar-link'>View</Link></p>
                                        <p className='recipe-background'><Link to={`../recipe/${id}/${recipe._id}`} style={{ fontSize: '20px'}} className='auth-navbar-link'>edit</Link></p>
                                    </div>
                                </div>
                            )
                    })}
                </div>
            </div>
    </div>
  )
}

export default RecipeDashboard