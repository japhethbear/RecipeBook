import './App.css';
import {Routes, Route} from 'react-router-dom'
import RecipeDashboard from './components/RecipeDashboard';
import RecipeData from './components/RecipeData'
import LandingPage from './components/LandingPage';
import DynamicForm from './components/DynamicForm';
import RegisterForm from './components/RegisterForm';
import NotFound from './components/NotFound';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<HomePage/>} path=""/>
        {/* <Route element={<LoginForm/>} path="login"/> */}
        <Route element={<LandingPage/>} path="home/:id"/>
        <Route element={<RecipeDashboard/>} path="myrecipes"/>
        <Route element={<DynamicForm/>} path="recipe/new"/>
        <Route element={<RecipeData/>} path="recipe/:id"/>
        <Route element={<NotFound/>} path="*"/>
      </Routes>
      
    </div>
  );
}

export default App;
