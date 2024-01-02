import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../components/HomePage/newhomepagestyles.css'
import kitchenBackground from '../assets/images/kitchenbackground.jpg'
import cookbook from '../assets/images/cookbook.png'
import gordonIncredible from '../assets/images/gordonincredible.gif'

const ViewRecipe = () => {

    const { recipeId, userId } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({})
    const [recipes, setRecipes] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipes/${recipeId}`)
            .then(res => {
            console.log("Get One Recipe", res.data)
            setRecipe(res.data.recipe)})
            .catch(err => console.log(err))
        }, [recipeId])
        
        useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${userId}`)
            .then(res => {
            setUser(res.data.user)}
            )
            .catch(err => console.log(err));
        }, [userId]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipes/all/${userId}`)
            .then(res => {
                console.log(res.data)
                setRecipes(res.data.allRecipes)})
            .catch(err => console.log(err))
    }, [])

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
        <div className="background-container" style={{ backgroundImage: `url(${kitchenBackground})` }}>
            <div className="navbar">
                <div className="navbar-brand">
                    <img src={cookbook} alt="Cook Book Picture" style={{ width: '40px', height: 'auto' }} />
                    <h3>Recipe Book</h3>
                </div>
                <div className="navbar-links">
                    <Link to={`/myrecipes/${userId}`} className="navbar-link">Back to Recipes</Link>
                    <Link to="/" className="navbar-link" onClick={logout}>Logout</Link>
                </div>
            </div>
            <div className='d-flex justify-content-around mt-3'>
                <h1>{recipe.recipeName || 'Recipe Name'}</h1>
            </div>
            <div className='d-flex justify-content-around'>

                <div className='table table-responsive m-2' style={{ padding: '5px' }}>
                    <table className="table table-striped table-hover table-bordered caption-top">
                        <caption style={{ fontSize: '18px'}}>List of Ingredients</caption>
                        <thead className='table-secondary'>
                            <tr>
                            <th scope="col">Ingredient</th>
                            <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        
                        <tbody className='table table-group-divider'>
                            {recipe.ingredients &&
                            recipe.ingredients.map((ingredient, index) => (
                            <tr key={index}>
                                <td>{ingredient.ingredientName}</td>
                                <td>{ingredient.ingredientAmount}</td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>

                <div className='table table-responsive m-2' style={{ padding: '5px' }}>
                    <table className="table table-striped table-hover table-bordered caption-top">
                        <caption style={{ fontSize: '18px'}}>List of Instructions</caption>
                        <thead className='table-secondary'>
                            <tr>
                                <th scope="col">Instructions</th>
                            </tr>
                        </thead>
                        
                        <tbody className='table table-group-divider'>
                            {recipe.instructions &&
                            recipe.instructions.map((instruction, index) => (
                            <tr key={index}>
                                <td>{instruction}</td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>

            </div>
            <img
                    src={gordonIncredible}
                    alt="Gordon Ramsey Incredible GIF"
                    style={{ width: '100%', maxWidth: '400px', padding: '20px' }}
                    />
        </div>
      )
    }
    
    export default ViewRecipe