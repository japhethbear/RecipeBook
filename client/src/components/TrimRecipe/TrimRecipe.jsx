// TrimRecipe.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom'
import '../../components/HomePage/homepagestyles.css'
import kitchenBackground from '../../assets/images/kitchenbackground.jpg'
import cookbook from '../../assets/images/cookbook.png'
import gordonContinue from '../../assets/images/gordoncontinue.gif'
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import '../TrimRecipe/trimrecipestyles.css'


function TrimRecipe() {
  const [userInputURL, setUserInputURL] = useState('');
  const [scrapedData, setScrapedData] = useState({ title: '', ingredients: [], instructions: [], imageUrl: '' });
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [shared, setShared] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${id}`)
      .then(res => {
        setUser(res.data.user)}
        )
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/scrape-recipe', { url: userInputURL });
      setScrapedData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveImage = async () => {
    // Find the element you want to capture (the recipe content in this case)
    const recipeContentElement = document.querySelector('.recipe-background');
  
    // Use html2canvas to capture the content as an image
    const canvas = await html2canvas(recipeContentElement);
  
    // Convert the canvas to a blob
    canvas.toBlob(function (blob) {
      // Create a file name for the saved image
      const fileName = `${scrapedData.title}_image.png`; // Adjust the file extension as needed
  
      // Use FileSaver.js to save the blob as a file
      saveAs(blob, fileName);
    });
  };
  
  
  

  const logout = () => {
    axios.post('http://localhost:8000/api/users/logout', {}, {withCredentials: true})
        .then(res => {
            console.log(res)
            navigate('/')})
        .catch(err => console.log(err));
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
                              src={gordonContinue}
                    alt="Gordon Ramsey Help GIF"
                    style={{ width: '300px', maxWidth: '400px', padding: '20px' }}
                    />
                    <h1 className="landing-heading" style={{ marginLeft: '300px'}}>Trim Recipe</h1>
            </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInputURL}
          onChange={(event) => setUserInputURL(event.target.value)}
          placeholder="Enter Recipe URL"
        />
        <button type="submit" style={{ marginLeft: '3px' }}>Scrape Recipe</button>
      </form>
      <div className='recipe-background'>
        <h3 style={{ marginTop: '20px' }}>
          <span style={{ fontWeight: 'bold' }}>Title:</span> {scrapedData.title}
        </h3>        
        <h4 style={{ fontSize: '24px', fontWeight: 'bold' }}>Ingredients:</h4>
        <ul style={{ fontSize: '18px' }}>
          {scrapedData.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h4 style={{ fontSize: '24px', fontWeight: 'bold' }}>Instructions:</h4>
        <ol style={{ fontSize: '18px' }}>
          {scrapedData.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
      <br></br>
        <button style={{ marginBottom: '16px'}}onClick={handleSaveImage}>Save Image</button>
      <br></br>
      <div className='recipe-background'>
        <h3 style={{ fontSize: '24px', fontWeight: '' }}>** Right now, the scraping only works on the following websites: **</h3>
        <ul style={{ fontSize: '20px', fontWeight: '' }}>
          <li className='recipe-background'>Farmhouse on Boone</li>
          <li className='recipe-background'>All Recipes</li>
        </ul>
        <p className='recipe-background' style={{ fontSize: '18px', fontWeight: '' }}>If you'd like to see more recipes added, please send your requests to j.bearessentials@gmail.com</p>

      </div>
      {shared && <p>Recipe shared successfully!</p>}
    </div>
  );
}

export default TrimRecipe;
