import React from 'react';
import { useHistory } from 'react-router-dom';

const ProductCard = ({ title, description, image, buttonText, route }) => {
  const history = useHistory();

  const handleButtonClick = () => {
    if (route) {
      history.push(route);
    }
  };

  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={image} alt={title} />
      </div>
      <div className="product-card-content">
        <h3 className="product-card-title">{title}</h3>
        <hr className="product-card-divider" />
        <p className="product-card-description">{description}</p>
        <button className="product-card-button" onClick={handleButtonClick}>
          {buttonText || 'SHOP NOW'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

