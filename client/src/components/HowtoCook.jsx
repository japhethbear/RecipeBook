import React from 'react';

const HowToCook = () => {
  return (
    <div className="how-to-cook-container">
      <h2 className="how-to-cook-title">How to Cook</h2>
      <div className="how-to-cook-video">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/zhI7bQyTmHw"
          title="How to Cook Video"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default HowToCook;
