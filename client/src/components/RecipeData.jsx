import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EditRecipe = () => {

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

    const onChangeHandler = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        })
    }

    const [currentIngredient, setCurrentIngredient] = useState({
        ingredientName: "",
        ingredientAmount: ""
    });

    const [currentInstruction, setCurrentInstruction] = useState('');

    const addInstruction = () => {
        if (currentInstruction.trim() !== '') {
          setRecipe({
            ...recipe,
            instructions: [...recipe.instructions, currentInstruction],
          });
          setCurrentInstruction('');
        }
      };

    const [errors, setErrors] = useState([]);

    const deleteRecipe = (id) => {
        axios.delete(`http://localhost:8000/api/recipes/${recipeId}`)
            .then(res => {
                navigate(`/myrecipes/${userId}`)
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
            axios.put(`http://localhost:8000/api/recipes/${recipeId}`, recipe)
                .then(res => {
                    console.log(res)
                    navigate(`/myrecipes/${userId}`)
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
            <h5><Link to={`/home/${userId}`} >Home Page</Link></h5>
            <button className='btn btn-danger' style={logoutButtonStyle} onClick={logout}>Logout</button>
        </div>
        <form action="" className="col-md-6 mx-auto" onSubmit={handleSubmit}>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <div className='form-group text-center'>
                <label htmlFor='recipeName'>Recipe Name: </label>
                <input type="text" value={recipe.recipeName}className='form-control text-center' id='recipeName' name="recipeName" onChange={onChangeHandler}/>
            </div>
            <div className='form-group'>
                <label htmlFor='recipeMeal'>Recipe Meal: </label>
                <select className='form-control text-center' value={recipe.recipeMeal} id='recipeMeal' name="recipeMeal" onChange={onChangeHandler}>
                    <option value="">--Please choose an option--</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                </select>
            </div>

            {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
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
                </div>
                ))}
                
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

            {recipe.instructions && recipe.instructions.map((instruction, index) => (
                <div key={index} className="form-group">
                    <label htmlFor={`instruction${index}`}>Instruction:</label>
                    <input
                    type="text"
                    className="form-control text-center"
                    id={`instruction${index}`}
                    name="instruction"
                    value={instruction}
                    onChange={(e) => {
                        const instructionsCopy = [...recipe.instructions];
                        instructionsCopy[index] = e.target.value;
                        setRecipe({
                        ...recipe,
                        instructions: instructionsCopy
                        });
                    }}
                    />
                </div>
                ))}

                <div className="form-group">
                <label htmlFor="instruction">Instruction:</label>
                <input
                    type="text"
                    className="form-control text-center"
                    id="instruction"
                    name="instruction"
                    value={currentInstruction}
                    onChange={(e) => setCurrentInstruction(e.target.value)}
                />
                </div>
            <div>
            <button
                className="btn btn-primary mt-2"
                onClick={(e) => {
                e.preventDefault();
                setRecipe({
                    ...recipe,
                    instructions: [...recipe.instructions, currentInstruction]
                });
                setCurrentInstruction(
                    "",
                );
            }}>Add Instruction
            </button>
            </div>

            
            <button className='btn btn-info mx-2 mt-2'>Edit Recipe</button>

        </form>

        <button className="btn btn-danger mt-2" onClick={() => deleteRecipe(recipe._id)}>Delete</button>

    </div>
  )
}

export default EditRecipe