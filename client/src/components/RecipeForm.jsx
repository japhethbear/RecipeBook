import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const RecipeForm = () => {

    const navigate = useNavigate();

    const [recipe, setRecipe] = useState({
        recipeName: "",
        recipeMeal: "",
        favorite: false,
        ingredients: []
      });
    
    const onChangeHandler = (e) => {
        setRecipe({
        ...recipe,
        [e.target.name]: e.target.value,
        });
    };
    
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/recipes', recipe)
            .then(res => {
                console.log(res)
                navigate('/myrecipes')
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
        };

    const logout = () => {
        axios.post('http://localhost:8000/api/users/logout', {}, {withCredentials: true})
            .then(res => {
                console.log(res)
                navigate('/')})
            .catch(err => console.log(err));
    }
    

  return (
    <div>
        <div className='d-flex justify-content-around'>
            <h1>Add My Own Recipe</h1>
            <p><Link to={'/home'} >go back home</Link></p>
            <button className='btn btn-danger' onClick={logout}>Logout</button>
        </div>
        <form action="" className="col-md-6 mx-auto" onSubmit={handleSubmit}>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <div className='form-group'>
                <label htmlFor='recipeName'>Recipe Name: </label>
                <input type="text" className='form-control' id='recipeName' name="recipeName" onChange={onChangeHandler}/>
            </div>
            <div className='form-group'>
                <label htmlFor='recipeMeal'>Recipe Meal: </label>
                <select className='form-control' id='recipeMeal' name="recipeMeal" onChange={onChangeHandler}>
                    <option value="">--Please choose an option--</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor='ingredientName'>Ingredient One Name: </label>
                <input 
                    type="text" 
                    className="form-control"
                    id="ingredientName"
                    name="ingredientName"
                    onChange={(e) => {
                        const ingredientsCopy = [...recipe.ingredients];
                        ingredientsCopy[0] = {
                        ...ingredientsCopy[0],
                        [e.target.name]: e.target.value};
                        setRecipe({ ...recipe, ingredients: ingredientsCopy });
                        }}/>
                <label htmlFor='ingredientAmount'>Ingredient One Amount: </label>
                <input 
                    type="text" 
                    className="form-control"
                    id="ingredientAmount"
                    name="ingredientAmount"
                    onChange={(e) => {
                        const ingredientsCopy = [...recipe.ingredients];
                        ingredientsCopy[0] = {
                        ...ingredientsCopy[0],
                        [e.target.name]: e.target.value};
                        setRecipe({ ...recipe, ingredients: ingredientsCopy });
                        }}/>
            </div>
            <div className="form-group">
                <label htmlFor='ingredientName'>Ingredient Two Name: </label>
                <input 
                    type="text" 
                    className="form-control"
                    id="ingredientName"
                    name="ingredientName"
                    onChange={(e) => {
                        const ingredientsCopy = [...recipe.ingredients];
                        ingredientsCopy[1] = {
                        ...ingredientsCopy[1],
                        [e.target.name]: e.target.value};
                        setRecipe({ ...recipe, ingredients: ingredientsCopy });
                        }}/>
                <label htmlFor='ingredientAmount'>Ingredient Two Amount: </label>
                <input 
                    type="text" 
                    className="form-control"
                    id="ingredientAmount"
                    name="ingredientAmount"
                    onChange={(e) => {
                        const ingredientsCopy = [...recipe.ingredients];
                        ingredientsCopy[1] = {
                        ...ingredientsCopy[1],
                        [e.target.name]: e.target.value};
                        setRecipe({ ...recipe, ingredients: ingredientsCopy });
                        }}/>
            </div>
            <div className="form-group">
                <label htmlFor='ingredientName'>Ingredient Three Name: </label>
                <input 
                    type="text" 
                    className="form-control"
                    id="ingredientName"
                    name="ingredientName"
                    onChange={(e) => {
                        const ingredientsCopy = [...recipe.ingredients];
                        ingredientsCopy[2] = {
                        ...ingredientsCopy[2],
                        [e.target.name]: e.target.value};
                        setRecipe({ ...recipe, ingredients: ingredientsCopy });
                        }}/>
                <label htmlFor='ingredientAmount'>Ingredient Three Amount: </label>
                <input 
                    type="text" 
                    className="form-control"
                    id="ingredientAmount"
                    name="ingredientAmount"
                    onChange={(e) => {
                        const ingredientsCopy = [...recipe.ingredients];
                        ingredientsCopy[2] = {
                        ...ingredientsCopy[2],
                        [e.target.name]: e.target.value};
                        setRecipe({ ...recipe, ingredients: ingredientsCopy });
                        }}/>
            </div>

            
            <button className='btn btn-info mt-2'>Add Recipe!</button>
        </form>
    </div>
  )};

export default RecipeForm