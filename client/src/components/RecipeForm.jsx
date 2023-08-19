import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom'
import DropzoneComponent from './DropzoneComponent';
import '../components/HomePage/homepagestyles.css'
import kitchenBackground from '../assets/images/kitchenbackground.jpg'
import cookbook from '../assets/images/cookbook.png'
import gordonPassion from '../assets/images/gordonpassion.gif'

const RecipeForm = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${id}`)
          .then(res => {
            setUser(res.data.user)}
            )
          .catch(err => console.log(err));
      }, [id]);

    const [recipe, setRecipe] = useState({
        recipeName: "",
        recipeMeal: "",
        favorite: false,
        ingredients: [],
        instructions: [],
        photos: []
      });

    const [currentIngredient, setCurrentIngredient] = useState({
        ingredientName: "",
        ingredientAmount: ""
    });

    const [currentInstruction, setCurrentInstruction] = useState('');
    
    const onChangeHandler = (e) => {
        setRecipe({
        ...recipe,
        [e.target.name]: e.target.value,
        });
    };

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

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/recipes', recipe)
            .then(res => {
                console.log(res)
                navigate(`/myrecipes/${id}`)
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

    const handleFileDrop = (droppedFiles) => {
        const updatedFiles = droppedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
        
        setRecipe(recipe => ({
            ...recipe,
            photos: [...recipe.photos, ...updatedFiles]
        }));
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
    <div className="dashboard-background-container" style={{ backgroundImage: `url(${kitchenBackground})` }}>
            <div className="auth-navbar">
                <div className="container">
                <div className="auth-navbar-brand">
                    <img src={cookbook} alt="Cook Book Picture" style={{ width: '40px', height: 'auto' }} />
                    <h3>Recipe Book</h3>
                </div>
                <div className="auth-navbar-links">
                    <Link to={`/api/${id}`} className="auth-navbar-link">Search for Recipe</Link>
                    <Link to={`/home/${id}`} className="auth-navbar-link" >Home Page</Link>
                    <Link to="/" className="auth-navbar-link" onClick={logout}>Logout</Link>
                </div>
                </div>
            </div>
            <div className='d-flex justify-content-center mt-2'>
                <h1 className="landing-heading">Add My Own Recipe</h1>
            </div>

        <div className='d-flex'>
            <form action="" className="col-md-8 mx-auto px-4" onSubmit={handleSubmit}>
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

                {recipe.instructions.map((instruction, index) => (
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
                    onClick={addInstruction}
                    type='button'>
                    Add Instruction
                </button>
                </div>
                {/* <div className="form-group text-center mt-2">
                    Photos: 
                    <DropzoneComponent handleFileDrop={handleFileDrop} />
                </div> */}
                
                <button className='btn btn-info mt-2'>Add Recipe!</button>
            </form>
            <div className="col-md-4 d-flex mx-auto align-items-center">
                <img
                    src={gordonPassion}
                    alt="Gordon Ramsey Passion GIF"
                    style={{ width: '100%', maxWidth: '400px', padding: '20px' }}
                />
            </div>
        </div>



            
    </div>
  )};

export default RecipeForm