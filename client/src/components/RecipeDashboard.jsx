import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RecipeDashboard = () => {
    const [recipes, setRecipes] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/recipes')
            .then(res => {
                console.log(res.data)
                setRecipes(res.data.allRecipes)})
            .catch(err => console.log(err))
    }, [])

    const navigateToRecipeForm = () => {
        navigate('/recipe/new')
    }

    const deleteRecipes = (id) => {
        axios.delete(`http://localhost:8000/api/recipes/${id}`)
            .then(res => {
                setRecipes(recipes.filter(recipe => recipe._id !== id))
            })
            .catch(err => console.log(err))
    }

  return (
    <div className='container'>
        <div className='d-flex justify-content-between mt-4'>
            <h1>My Recipe Book</h1>
            <h5><Link to={'/home'} >Home Page</Link></h5>
        </div>
        <div className='d-flex justify-content-between mt-4'>
            <button className="btn-secondary" onClick={navigateToRecipeForm}>Add a Recipe</button>
            
        </div>
        <br></br>
        <div>
            {recipes.sort(function(a, b) {
                    if(a.createdAt < b.createdAt) return -1;
                    if(a.createdAt > b.createdAt) return 1;
                    return 0;
                }).map((recipe, i) => {
                    return (
                        <div key={recipe._id} data={recipe} className='d-flex flex-column'>
                            <h3 className='d-flex justify-content-start'>{recipe.recipeName}</h3>
                            <div className='d-flex justify-content-between'>
                                <p>{recipe.recipeMeal}</p>
                                <p><Link to={`../recipe/${recipe._id}`}>edit</Link></p>
                            </div>
                        </div>
                    )
            })}
        </div>
    </div>
  )
}

export default RecipeDashboard