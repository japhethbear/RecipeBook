import React from 'react';

const About = () => {
  return (
    <div className="about-container">
      <h2 className="about-title">About Recipe Book</h2>
      <p className="about-description">
        Recipe Book is a web application that allows you to store and organize your favorite recipes.
        With Recipe Book, you can create and manage your own recipe collection, search for recipes, and even share your recipes with others.
      </p>
      <h3>Key Features:</h3>
      <ul>
        <li>Create and store your own recipes</li>
        <li>Browse and search for recipes</li>
        <li>Organize recipes into categories or collections</li>
        <li>Share your recipes with others</li>
        <li>Mark recipes as favorites</li>
        <li>Add notes and comments to recipes</li>
      </ul>
      <h3>How to Get Started:</h3>
      <p className="about-description">
        To get started with Recipe Book, simply sign up for an account or log in if you already have one.
        Once logged in, you can start creating your recipe collection and exploring the various features of the application.
      </p>
      <p className="about-description">
        We hope you enjoy using Recipe Book to discover, organize, and share your favorite recipes!
      </p>
    </div>
  );
};

export default About;
