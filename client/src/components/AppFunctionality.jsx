import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './styles.css'; // Import the custom CSS file
import LoginVideo from '..assets/videos/LoginVideo.mov';

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
              <source src={LoginVideo} type="video/mov" />
              Your browser does not support the video tag.
            </video>
            <p>Video 1 Description</p>
          </div>
          <div className="carousel-item">
            <video controls>
              <source src="/path/to/video2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>Video 2 Description</p>
          </div>
          <div className="carousel-item">
            <video controls>
              <source src="/path/to/video3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>Video 3 Description</p>
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
