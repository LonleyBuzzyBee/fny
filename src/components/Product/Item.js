import React, { useState } from "react";
import * as a from "../../actions";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import StarRatings from 'react-star-ratings';

const Item = ( {item} ) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const ratingNumber = Number(item.rating) || 0; // Convert to number as safety measure
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  const handleItemClick = () => {
    dispatch(a.selectedItem(item));
    // Pass current location as state so back button knows where to return
    history.push({
      pathname: `/item/${item.id}`,
      state: { from: location.pathname }
    });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent triggering the item click
    dispatch(a.addToCart(item));
    setShowSuccessPopup(true);
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };
  
  return (
    <React.Fragment>
      <div className="list-item" onClick={handleItemClick}>
        <div className="list-item-image-wrapper">
          <img className="list-item-picture" src={item.img} alt={item.title || "product"} />
        </div>
        <div className="list-item-content">
          <div className="list-item-rating">
            <StarRatings
              rating={ratingNumber}
              starDimension="12px"
              starSpacing="4px"
              numberOfStars={5} />
          </div>
          <h6 className="list-item-title">{item.title}</h6>
          <p className="list-item-price">Price: ${item.price}</p>
          <button className="add2cart" onClick={handleAddToCart}>ADD TO CART</button>
        </div>
      </div>
      
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="cart-success-popup-overlay" onClick={handleClosePopup}>
          <div className="cart-success-popup" onClick={(e) => e.stopPropagation()}>
            <div className="cart-success-content">
              <div className="cart-success-icon">✓</div>
              <p className="cart-success-message">Successfully added to cart!</p>
              <button className="cart-success-close" onClick={handleClosePopup}>Close</button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default Item;