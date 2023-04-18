import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const RecipeFormTwo = () => {

    const navigate = useNavigate();

    const [recipe, setRecipe] = useState({
        recipeName: "",
        recipeMeal: "",
        favorite: false,
        ingredients: []
      });

    const [currentIngredient, setCurrentIngredient] = useState({
        ingredientName: "",
        ingredientAmount: ""
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

    const logoutButtonStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
    };

  return (
    <div>
        <div className='d-flex justify-content-around mt-4'>
            <h1>Add My Own Recipe</h1>
            <h5><Link to={'/home'} >Home Page</Link></h5>
            <button className='btn btn-danger' style={logoutButtonStyle} onClick={logout}>Logout</button>
        </div>
        <form action="" className="col-md-6 mx-auto" onSubmit={handleSubmit}>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <div className='form-group text-center mx-2'>
                <label htmlFor='recipeName'>Recipe Name: </label>
                <input type="text" className='form-control text-center' id='recipeName' name="recipeName" onChange={onChangeHandler}/>
            </div>
            <div className='form-group text-center mx-2'>
                <label htmlFor='recipeMeal'>Recipe Meal: </label>
                <select className='form-control text-center' id='recipeMeal' name="recipeMeal" onChange={onChangeHandler}>
                    <option value="">--Please choose an option--</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="ingredientName">Ingredient Name:</label>
                <input
                    type="text"
                    className="form-control text-center"
                    id="ingredientName"
                    name="ingredientName"
                    value={currentIngredient.ingredientName}
                    onChange={(e) => {
                    setCurrentIngredient({
                        ...currentIngredient,
                        ingredientName: e.target.value
                    });
                    }}
                />
                <label htmlFor="ingredientAmount">Ingredient Amount:</label>
                <input
                    type="text"
                    className="form-control text-center"
                    id="ingredientAmount"
                    name="ingredientAmount"
                    value={currentIngredient.ingredientAmount}
                    onChange={(e) => {
                    setCurrentIngredient({
                        ...currentIngredient,
                        ingredientAmount: e.target.value
                    });
                    }}
                />
                <button
                    className="btn btn-primary mt-2"
                    onClick={(e) => {
                    e.preventDefault();
                    setRecipe({
                        ...recipe,
                        ingredients: [...recipe.ingredients, currentIngredient]
                    });
                    setCurrentIngredient({
                        ingredientName: "",
                        ingredientAmount: ""
                    });
                    }}>Add Ingredient
                </button>
            </div>

            {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="form-group">
                    <label htmlFor={`ingredientName${index}`}>Ingredient {index + 1} Name:</label>
                    <input
                    type="text"
                    className="form-control text-center"
                    id={`ingredientName${index}`}
                    name="ingredientName"
                    value={ingredient.ingredientName}
                    onChange={(e) => {
                        const ingredientsCopy = [...recipe.ingredients];
                        ingredientsCopy[index] = {
                        ...ingredientsCopy[index],
                        ingredientName: e.target.value
                        };
                        setRecipe({
                        ...recipe,
                        ingredients: ingredientsCopy
                        });
                    }}
                    />
                    <label htmlFor={`ingredientAmount${index}`}>Ingredient {index + 1} Amount:</label>
                    <input
                    type="text"
                    className="form-control text-center"
                    id={`ingredientAmount${index}`}
                    name="ingredientAmount"
                    value={ingredient.ingredientAmount}
                    onChange={(e) => {
                        const ingredientsCopy = [...recipe.ingredients];
                        ingredientsCopy[index] = {
                        ...ingredientsCopy[index],
                        ingredientAmount: e.target.value
                        };
                        setRecipe({
                        ...recipe,
                        ingredients: ingredientsCopy
                        });
                    }}
                    />
                    {index === recipe.ingredients.length - 1 && (
                    <button
                        className="btn btn-primary mt-2"
                        onClick={(e) => {
                        e.preventDefault();
                        setCurrentIngredient({
                            ingredientName: "",
                            ingredientAmount: ""
                        });
                        }}
                    >
                        Add Ingredient
                    </button>
                    )}
                </div>
                ))}
            
            <button className='btn btn-info mt-2'>Add Recipe!</button>
        </form>
    </div>
  )};

export default RecipeFormTwo