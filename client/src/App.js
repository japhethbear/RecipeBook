import './App.css';
import {Routes, Route} from 'react-router-dom'
import RecipeDashboard from './components/RecipeDashboard';
import RecipeData from './components/RecipeData'
import LandingPage from './components/LandingPage';
import RecipeForm from './components/RecipeForm';
import NotFound from './components/NotFound';
import HomePage from './components/HomePage/HomePage';
import ViewRecipe from './components/ViewRecipe';
import APITest from './components/APITest';
import RegLogin from './components/RegLogin/RegLogin';
import AppDemo from './components/AppDemo/AppDemo';
import { useState, useEffect } from 'react';
import axios from 'axios';



function App() {

  return (
    <div className="App">
      <Routes>
        <Route element={<HomePage/>} path=""/>
        <Route element={<RegLogin/>} path="registerandlogin"/>
        <Route element={<AppDemo/>} path="appdemo"/>
        <Route element={<LandingPage/>} path="home/:id"/>
        <Route element={<RecipeDashboard/>} path="myrecipes/:id"/>
        <Route element={<RecipeForm/>} path="recipe/new/:id"/>
        <Route element={<RecipeData/>} path="recipe/:userId/:recipeId"/>
        <Route element={<ViewRecipe/>} path="recipe/:userId/:recipeId/view"/>
        <Route element={<NotFound/>} path="*"/>
        <Route element={<APITest/>} path="api/:id"/>
      </Routes>
      
    </div>
  );
}

export default App;
