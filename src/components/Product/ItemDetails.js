import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import { useFirestore, isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import * as a from "../../actions";
import { useSelector, useDispatch} from "react-redux";
import Header from '../ReusableComponents/Header';
import LogosSection from '../ReusableComponents/LogosSection';
import Footer from '../ReusableComponents/Footer';
import Recommended from '../ReusableComponents/RecommendedSection';

const ItemDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const firestore = useFirestore(); 
  const dispatch = useDispatch();
  const isAdmin = useSelector(state => state.admin);
  const selectedItem = useSelector(state => state.selectedItem);
  const items = useSelector(state => state.firestore.ordered.items);
  const topRef = useRef(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  // Store the previous location when component mounts
  const previousLocationRef = useRef(location.state?.from || null);
  
  useEffect(() => {
    // Update previous location if we have state from navigation
    if (location.state?.from) {
      previousLocationRef.current = location.state.from;
    }
  }, [location]);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showDeleteModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showDeleteModal]);
  
  // Connect to Firestore to get items
  useFirestoreConnect([
    {
      collection: 'items'
    }
  ]);
  
  // Get item from Firestore by ID from URL params
  const itemsArray = Array.isArray(items) ? items : [];
  const itemFromStore = itemsArray.find(item => item.id === id);
  // Use item from store (URL-based) first, fallback to selectedItem if available
  const currentItem = itemFromStore || (selectedItem?.id === id ? selectedItem : null);
  
  // Update Redux state when item is found from URL (for backward compatibility)
  useEffect(() => {
    if (itemFromStore) {
      dispatch(a.selectedItem(itemFromStore));
    }
  }, [itemFromStore, dispatch]);
  
  // Scroll to top when component mounts or item changes
  useLayoutEffect(() => {
    if (currentItem) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    }
  }, [currentItem]);
  
  useEffect(() => {
    if (currentItem) {
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [currentItem]);
  
  // Get recommended items
  let recommended = currentItem ? itemsArray.filter(item => 
    item?.category === currentItem?.category && item?.id !== currentItem?.id
  ) : [];
  
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  }

  const handleDeleteConfirm = (itemId) => {
    firestore.delete({collection: 'items', doc: itemId});
    dispatch(a.selectedItem(null));
    setShowDeleteModal(false);
    
    // Navigate back to previous location or default to /All
    if (previousLocationRef.current) {
      history.push(previousLocationRef.current);
    } else {
      history.push('/All');
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  }

  const handleEdit = () => {
    // Navigate to edit route
    history.push(`/item/${id}/edit`, { from: location.pathname });
  }
  
  const handleBack = () => {
    dispatch(a.selectedItem(null));
    
    // If we have a previous location from state, go there
    // Otherwise, try to go back in history
    // If no history, default to /All
    if (previousLocationRef.current) {
      history.push(previousLocationRef.current);
    } else if (window.history.length > 1) {
      history.goBack();
    } else {
      // Fallback if there's no history
      history.push('/All');
    }
  }
  
  const handleShopAll = () => {
    dispatch(a.selectedItem(null));
    history.push('/All');
  }
  
  if (!currentItem) {
    // Item not found - could be loading or invalid ID
    const itemsLoaded = isLoaded(items);
    if (!itemsLoaded) {
      return (
        <div className="item-loading-container">
          <Header />
          <div className="centered-padding">
            <h3>Loading...</h3>
          </div>
        </div>
      );
    }
    return (
      <div className="item-error-container">
        <Header />
        <div className="centered-padding">
          <h3>Item not found</h3>
          <button className="listButton" onClick={handleShopAll}>SHOP ALL</button>
        </div>
      </div>
    );
  }
  
  if (currentItem) {
    return (
      <div className="full-width-container">
        <div ref={topRef} className="scroll-anchor" aria-hidden="true" />
        <Header />
        <div className="item-details">
          <div className="item-details-container">
            <div className="item-details-left-column">
              <img src={currentItem.img} className="item-details-image"alt="img"/>
            </div>
            <div className="item-details-right-column">
              <div className="item-details-info">
                <div className="item-details-title-section">
                  <h2><strong>{currentItem.title}</strong></h2>
                  <svg className="heart" viewBox="0 0 32 29.6">
                    <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                    c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
                  </svg>
                </div>
                <hr className="hrItem"></hr>
                <div className="item-details-rating">
                  <p>Rating:</p>
                  <StarRatings
                    rating={Number(currentItem.rating) || 0}
                    starDimension="15px"
                    starSpacing="15px"
                    numberOfStars={5} />
                </div>
                <p className="item-details-category"><span>Price: $</span> {currentItem.price }</p>
                <p className="item-details-category">Tags: <em>{currentItem.category}</em></p>
                <p className="item-details-description"><span>Description: </span>{currentItem.description} </p>
                <p className="item-details-description"><span>Ingredients:</span> iquam elementum tristique metus, et vulputate sapien feugiat et. Duis orci dui, varius ut sem viverra, aliquam placerat augue. Vivamus dolor turpis, placerat sit amet risus quis, suscipit pretium arcu. Curabitur aliquet ex metus, in vehicula neque interdum sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className={isAdmin? "hiddenAdminControls" : "item-details-buttons-title"}>
                <hr className="hrItem"></hr>
                <h5>Would you like to add this to your cart?</h5>
              </div>
              <div className={isAdmin? "hiddenAdminControls": "item-details-buttons"}>
                <button className="listButton" onClick={() => {
                  dispatch(a.addToCart(currentItem));
                  setShowSuccessPopup(true);
                  setTimeout(() => {
                    setShowSuccessPopup(false);
                  }, 3000);
                }}>ADD TO CART</button>
                <button className="listButton" onClick={handleShopAll}>SHOP ALL</button>
              </div>
              <div className={isAdmin?"item-details-buttons-title" : "hiddenAdminControls"}>
                <hr className="hrItem"></hr>
                <h5>Would you like to make changes?</h5>
              </div>
              <div className={isAdmin ? "item-details-buttons" : "hiddenAdminControls"}>
                 <button className="listButton" onClick={handleBack}>BACK</button>
                <button className="listButton" onClick={handleEdit}>EDIT</button>
                <button className="listButton" onClick={handleDeleteClick}>DELETE</button>
              </div>
            </div>
          </div>
        </div>
        <Recommended recommended={recommended}/>
        
        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="delete-modal-overlay" onClick={handleDeleteCancel}>
            <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Are you sure you want to delete this item?</h3>
              <div className="delete-modal-buttons">
                <button className="listButton delete-button-cancel" onClick={handleDeleteCancel}>
                  CANCEL
                </button>
                <button className="listButton delete-button-confirm" onClick={() => handleDeleteConfirm(currentItem.id)}>
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="cart-success-popup-overlay" onClick={() => setShowSuccessPopup(false)}>
            <div className="cart-success-popup" onClick={(e) => e.stopPropagation()}>
              <div className="cart-success-content">
                <div className="cart-success-icon">✓</div>
                <p className="cart-success-message">Successfully added to cart!</p>
                <button className="cart-success-close" onClick={() => setShowSuccessPopup(false)}>Close</button>
              </div>
            </div>
          </div>
        )}
        <LogosSection />
        <Footer />
      </div>
  );
  }
}

export default ItemDetail;
