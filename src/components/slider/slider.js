import React, { useEffect, useState } from 'react';
import './slider.css'; // Import your CSS file for styling
import image1 from '../../assest/1.png';
import image2 from '../../assest/2.png';
import image3 from '../../assest/3.png';

const images = [image1, image2, image3];

const SingleImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage === images.length - 1 ? 0 : prevImage + 1));
  };

  const prevImage = () => {
    setCurrentImage((prevImage) => (prevImage === 0 ? images.length - 1 : prevImage - 1));
  };
  useEffect(() => {
    const autoplayInterval = setInterval(nextImage, 1500); // 1 second interval
    return () => {
      clearInterval(autoplayInterval); // Clean up the interval on component unmount
    };
  }, []);

  return (
    <div className="single-image-slider">

      <img src={images[currentImage]} alt={`Image ${currentImage + 1}`} />

      <div className='btn-slider'>
      <button className="next-button" onClick={nextImage}>
        Next
      </button>
      <button className="prev-button" onClick={prevImage}>
        Previous
      </button>
      </div>
      
    </div>
  );
};

export default SingleImageSlider;
