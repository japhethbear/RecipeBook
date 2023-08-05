import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import LoginVideo from '../../assets/videos/LoginVideo.mp4'
import YourRecipes from '../../assets/videos/YourRecipes.mp4'
import AddRecipe from '../../assets/videos/AddRecipe.mp4'

const AppFunctionality = () => {
  return (
    <div className="app-functionality-container">
      <h2 className="app-functionality-title">App Functionality</h2>
      <div className="carousel-container">
        <Carousel
          showArrows={true} // Show navigation arrows
          showStatus={false} // Hide status indicator
          showThumbs={false} // Hide thumbnail images
          renderIndicator={(onClickHandler, isSelected) => (
            <div
              className={`custom-indicator ${isSelected ? 'active' : ''}`}
              onClick={onClickHandler}
            />
          )}
        >
          <div className="carousel-item">
            <video controls>
              <source src={LoginVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className='mt-3'>Register a new account or log in</p>
          </div>
          <div className="carousel-item">
            <video controls>
              <source src={YourRecipes} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className='mt-3' >View your recipe dashboard</p>
          </div>
          <div className="carousel-item">
            <video controls>
              <source src={AddRecipe} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className='mt-3'>Add your recipes</p>
            <div className="control-arrow-wrapper">
            </div>
            <div className="control-arrow-wrapper">
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default AppFunctionality;
