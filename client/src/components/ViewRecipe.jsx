import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

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
        axios.get('http://localhost:8000/api/recipes')
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
        <div>
            <div className='d-flex justify-content-around mt-3'>
                <h1>{recipe.recipeName || 'Recipe Name'}</h1>
                <h5><Link to={`/myrecipes/${userId}`} >Back to Recipes</Link></h5>
                <button className='btn btn-danger' style={logoutButtonStyle} onClick={logout}>Logout</button>
            </div>
            <div className='d-flex justify-content-around'>

                <div className='table table-responsive m-2'>
                    <table className="table table-striped table-hover table-bordered caption-top">
                        <caption>List of Ingredients</caption>
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

                <div className='table table-responsive m-2'>
                    <table className="table table-striped table-hover table-bordered caption-top">
                        <caption>List of Instructions</caption>
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
           
        </div>
      )
    }
    
    export default ViewRecipe