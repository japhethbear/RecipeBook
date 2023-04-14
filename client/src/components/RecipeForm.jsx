import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const RecipeForm = () => {

    const navigate = useNavigate();

    const [recipe, setRecipe] = useState({
        recipeName: "",
        recipeMeal: "",
        ingredients: [],
        favorite: null
    })

    const onChangeHandler = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value,
        })
    }

    const [ingredientFields, setIngredientsFields] = useState(1);

    function addIngredientField() {
        setIngredientsFields(ingredientFields + 1);
    }

    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault()
            axios.post('http://localhost:8000/api/recipes', recipe)
                .then(res => {
                    console.log(res)
                    navigate('/')
                })
                .catch(err => {
                    const errorResponse = err.response.data.error.errors;
                    console.log(err)
                    const errorArr = [];
                    for (const key of Object.keys(errorResponse)) {
                        errorArr.push(errorResponse[key].message)
                    }   
                    setErrors(errorArr);
                })
    }

  return (
    <div>
        <div className='d-flex justify-content-around'>
            <h1>Add My Own Recipe</h1>
            <p><Link to={'..'} >go back home</Link></p>
        </div>
        <form action="" className="col-md-6 mx-auto" onSubmit={handleSubmit}>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <div className='form-group'>
                <label htmlFor='recipeName'>Recipe Name: </label>
                <input type="text" className='form-control' id='recipeName' name="recipeName" onChange={onChangeHandler}/>
            </div>
            <div className='form-group'>
                <label htmlFor='recipeMeal'>Recipe Meal: </label>
                <select className='form-control' id='recipeMeal' name="recipeMeal" max='255' onChange={onChangeHandler}>
                    <option value="">--Please choose an option--</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                </select>
            </div>
            <div className='form-group'>
                <label htmlFor='ingredients'>Ingredient(s): </label>
                <input type="text" className='form-control' id='ingredients' name="ingredients" max='255' onChange={onChangeHandler}/>
            </div>
            <button onClick={addIngredientField}>Add an Ingredient</button>
            <button className='btn btn-info mt-2'>Add Recipe!</button>
        </form>

    </div>
  )
  }

export default RecipeForm