import React from 'react';

const About = () => {
  return (
    <div className="about-container">
      <h2 className="about-title">About Recipe Book</h2>
      <p className="about-description">
      You know how looking up a recipe online feels like leaving your house as a celebrity being attacked by the paparazzi? Every little scroll down the page reveals more ads, more popups, more images that have to load, slowing down the page and making it nearly impossible to actually read the recipe. And on top of that, for some reason these online chefs have decided that their recipe pages are the place for them to let their aspiring writing dreams come true. I don't need a 750 word blog explaining how this recipe changed your life. I just want the recipe!</p>

      <p className='about-description'>Then there's the task of keeping track of the recipes you do like. You could look it up again, but then you're fighting the popups. Or you could screen shot the recipe, but then you'll have to find the picture each time.</p>

      <p className='about-description'>What if you don't know what you're going to make for dinner, but you have some ingredients lying around and need to get rid of them? I have a six-month old bag of egg noodles in my pantry that my mom left. It's just begging for me to make it, but I don't make egg noodles and wouldn't know where to start.</p>

      <p className='about-description'>Problems like these are why I have created Recipe Book. </p>

      <p className='about-description'>Recipe Book solves the first problem by allowing the user to manually add recipes to their recipe book that can be recalled any time and easily read. No more fighting popups! It solves the problem of lonely leftover ingredients by allowing the user to search for new recipes by ingredient. Look up an "Egg Noodle" recipe and an hour later, the lazy susan will need a new resident. 
      </p>
      <h3 className="about-subtitle">Key Features:</h3>
      <ul className="about-list">
        <li>Create and store your own recipes</li>
        <li>Browse and search for recipes</li>
        <li>Organize recipes into categories or collections</li>
        <li>Share your recipes with others</li>
      </ul>
    </div>
  );
};

export default About;
