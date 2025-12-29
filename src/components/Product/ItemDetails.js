import React  from "react";
import { useFirestore, isLoaded } from 'react-redux-firebase';
import StarRatings from 'react-star-ratings';
import EditItem from '../AdminOptions/EditItem';
import * as a from "../../actions";
import { useSelector, useDispatch} from "react-redux";
import Header from '../ReusableComponents/Header';
import Recommended from '../ReusableComponents/RecommendedSection';

const ItemDetail = () => {
  const firestore = useFirestore(); 
  const dispatch = useDispatch();
  const isAdmin = useSelector(state => state.admin);
  const selectedItem = useSelector(state => state.selectedItem);
  const editing = useSelector(state => state.editing);
  const items = useSelector(state => state.firestore.ordered.items);
  
  // Console logs for debugging
  console.log('ItemDetails - selectedItem:', selectedItem);
  console.log('ItemDetails - selectedItem type:', typeof selectedItem);
  console.log('ItemDetails - selectedItem is truthy?', !!selectedItem);
  console.log('ItemDetails - editing:', editing);
  
  // Safety check for items array
  const itemsArray = Array.isArray(items) ? items : [];
  let recommended = selectedItem ? itemsArray.filter(item => item?.category === selectedItem?.category) : [];
  
  const deletingItem = (id) => {
    firestore.delete({collection: 'items', doc: id});
    dispatch(a.selectedItem(null));
  }

  const editItem = () => {
    dispatch(a.editItem()); 
  }
  
  if (editing) {
    return (
      <EditItem selectedItem={selectedItem}/>
    )
  }
  else if (selectedItem) {
    return (
      <>
        <Header />
        <div className="item-details">
          <div className="item-details-container">
            <div className="item-details-left-column">
              <img src={selectedItem.img} className="item-details-image"alt="img"/>
            </div>
            <div className="item-details-right-column">
              <div className="item-details-info">
                <div className="item-details-title-section">
                  <h2><strong>{selectedItem.title}</strong></h2>
                  <svg className="heart" viewBox="0 0 32 29.6">
                    <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                    c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
                  </svg>
                </div>
                <hr className="hrItem"></hr>
                <div className="item-details-rating">
                  <p>Rating:</p>
                  <StarRatings
                    rating={Number(selectedItem.rating) || 0}
                    starDimension="15px"
                    starSpacing="15px"
                    numberOfStars={5} />
                </div>
                <p className="item-details-category"><span>Price: $</span> {selectedItem.price }</p>
                <p className="item-details-category">Tags: <em>{selectedItem.category}</em></p>
                <p className="item-details-description"><span>Description: </span>{selectedItem.description} </p>
                <p className="item-details-description"><span>Ingredients:</span> iquam elementum tristique metus, et vulputate sapien feugiat et. Duis orci dui, varius ut sem viverra, aliquam placerat augue. Vivamus dolor turpis, placerat sit amet risus quis, suscipit pretium arcu. Curabitur aliquet ex metus, in vehicula neque interdum sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className={isAdmin? "hiddenAdminControls" : "item-details-buttons-title"}>
                <hr className="hrItem"></hr>
                <h5>Would you like to add this to your cart?</h5>
              </div>
              <div className={isAdmin? "hiddenAdminControls": "item-details-buttons"}>
                <button className="listButton" onClick={() => dispatch(a.selectedItem(null))}>ADD TO CART</button>
                <button className="listButton" onClick={() => dispatch(a.selectedItem(null))}>SHOP ALL</button>
              </div>
              <div className={isAdmin?"item-details-buttons-title" : "hiddenAdminControls"}>
                <hr className="hrItem"></hr>
                <h5>Would you like to make changes?</h5>
              </div>
              <div className={isAdmin ? "item-details-buttons" : "hiddenAdminControls"}>
                 <button className="listButton" onClick={() => dispatch(a.selectedItem(null))}>BACK</button>
                <button className="listButton"  onClick={editItem}>EDIT</button>
                <button className="listButton" onClick={() => deletingItem(selectedItem.id)}>DELETE</button>
              </div>
            </div>
          </div>
          <Recommended recommended={recommended}/>
        </div>
      </>
  );
} else {
  return (
    <React.Fragment>
        <Header />
        <h3>No item selected</h3>
    </React.Fragment>
    )
  }
}

export default ItemDetail;
