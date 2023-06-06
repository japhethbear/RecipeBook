import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpoonacularApi from 'spoonacular_api';

const ApiTest = () => {

    var SpoonacularApi = require('spoonacular_api');

    var defaultClient = SpoonacularApi.ApiClient.instance;
    // Configure API key authorization: apiKeyScheme
    var apiKeyScheme = defaultClient.authentications['apiKeyScheme'];
    apiKeyScheme.apiKey = "*****************************"
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    apiKeyScheme.apiKeyPrefix['x-api-key'] = "Token"
    
    var api = new SpoonacularApi.DefaultApi()
    var analyzeRecipeRequest = new SpoonacularApi.AnalyzeRecipeRequest(); // {AnalyzeRecipeRequest} Example request body.
    var opts = {
      'language': 'en', // {String} The input language, either \"en\" or \"de\".
      'includeNutrition': false, // {Boolean} Whether nutrition data should be added to correctly parsed ingredients.
      'includeTaste': false // {Boolean} Whether taste data should be added to correctly parsed ingredients.
    };
    var callback = function(error, data, response) {
      if (error) {
        console.error(error);
      } else {
        console.log('API called successfully. Returned data: ' + data);
      }
    };
    api.analyzeRecipe(analyzeRecipeRequest, opts, callback);

    const [recipe, setRecipe] = useState('')

    useEffect(() => {
        axios.get('https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2&apiKey=d355fd2b45d04cc0947f5ccfdc25dd59')
            .then(res => {
                console.log(res.data)
                setRecipe(res.data)})
            .catch(err => console.log(err))
    }, [])

  return (
    <>
      <div>ApiTest</div>
      <h1>{recipe && recipe.data}</h1>
    </>

  )
}

export default ApiTest