// TrimRecipe.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'

function TrimRecipe() {
  const [userInputURL, setUserInputURL] = useState('');
  const [scrapedData, setScrapedData] = useState({ title: '', ingredients: [], instructions: [] });
  const { id } = useParams();
  const [user, setUser] = useState({});

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

  return (
    <div>
        <Link to={`/home/${id}`}>
                Home
        </Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInputURL}
          onChange={(event) => setUserInputURL(event.target.value)}
          placeholder="Enter Recipe URL"
        />
        <button type="submit">Scrape Recipe</button>
      </form>
      <div>
        <h2>Scraped Recipe:</h2>
        <h3>Title: {scrapedData.title}</h3>
        <h4>Ingredients:</h4>
        <ul>
          {scrapedData.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h4>Instructions:</h4>
        <ol>
          {scrapedData.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default TrimRecipe;
