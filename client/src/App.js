import './App.css';
import {Routes, Route} from 'react-router-dom'
import RecipeForm from './components/RecipeForm';
import RecipeDashboard from './components/RecipeDashboard';
import RecipeData from './components/RecipeData'
import LandingPage from './components/LandingPage';
import DynamicForm from './components/DynamicForm';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<LandingPage/>} path="home"/>
        <Route element={<RecipeDashboard/>} path="myrecipes"/>
        <Route element={<DynamicForm/>} path="recipe/new"/>
        <Route element={<RecipeData/>} path="recipe/:id"/>
      </Routes>
      
    </div>
  );
}

export default App;
