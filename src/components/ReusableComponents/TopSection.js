import React from 'react';
import creamsGifStill from '../assets/imgs/creamsGifStill.png';
import creamsGif from '../assets/imgs/creamsGif.gif';
import dropperGifStill from '../assets/imgs/dropperGifStill.png';
import dropperGif from '../assets/imgs/dropperGif.gif';
// Import sale image - update the file extension (.jpeg, .jpg, or .png) to match your file
import saleImage from '../assets/imgs/sale.jpeg';

const TopSection = () => {
  return (
    <section className="itemListTopSection">
      <div className="product-row">
        {/* First Element - Creams with GIF on hover */}
        <div className="product-item">
          <div className="product-image-wrapper">
            <img 
              src={creamsGifStill} 
              alt="Beauty creams collection" 
              className="product-image static-image"
            />
            <img 
              src={creamsGif} 
              alt="Beauty creams animation" 
              className="product-image hover-image"
            />
          </div>
        </div>

        {/* Second Element - Sale image */}
        <div className="product-item">
          <div className="product-image-wrapper">
            <img 
              src={saleImage} 
              alt="FNY Skincare 35% off sale" 
              className="product-image"
            />
          </div>
        </div>

        {/* Third Element - Dropper with GIF on hover */}
        <div className="product-item">
          <div className="product-image-wrapper">
            <img 
              src={dropperGifStill} 
              alt="Serum dropper" 
              className="product-image static-image"
            />
            <img 
              src={dropperGif} 
              alt="Serum dropper animation" 
              className="product-image hover-image"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TopSection
