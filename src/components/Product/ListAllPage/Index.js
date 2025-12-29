import React from "react";
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded} from 'react-redux-firebase';
import ItemDetail from "../ItemDetails";
import Header from '../../ReusableComponents/Header';
import TopSection from '../../ReusableComponents/TopSection';
import Items from '../Items';

const ItemList = () =>{
  const items = useSelector(state => state.firestore.ordered.items);
  const selectedItem = useSelector(state => state.selectedItem);
  
  // Console logs for debugging
  console.log('ListAllPage - items:', items);
  console.log('ListAllPage - items type:', typeof items);
  console.log('ListAllPage - items is array?', Array.isArray(items));
  console.log('ListAllPage - items length:', items?.length);
  console.log('ListAllPage - isLoaded(items):', isLoaded(items));
  console.log('ListAllPage - selectedItem:', selectedItem);
  
   useFirestoreConnect([
    {
      collection: 'items'
    }
  ]);
  
  if (selectedItem) {
    return (
      <ItemDetail />
    )
  }
  
  // Check if items are loaded and is an array
  const itemsLoaded = isLoaded(items);
  const itemsArray = Array.isArray(items) ? items : [];
  
  if (itemsLoaded && itemsArray.length > 0) {
    return (
      <div>
        <Header/>
        <TopSection/>
        <div className="listItemsMainContainer">
          <section className="title">
              <h1>S H O P  A L L :</h1>
              <hr className="hrBorder"></hr>  
          </section>
          <Items items={itemsArray}/>
        </div>
      </div>
    );
  } else if (itemsLoaded && itemsArray.length === 0) {
    return (
      <div>
        <Header/>
        <TopSection/>
        <div className="listItemsMainContainer">
          <section className="title">
              <h1>S H O P  A L L :</h1>
              <hr className="hrBorder"></hr>  
          </section>
          <div className="listItemsContainer">
            <div className="listItems">
             <h3>No items found</h3>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Header/>
        <TopSection/>
        <div className="listItemsMainContainer">
          <section className="title">
              <h1>S H O P  A L L :</h1>
              <hr className="hrBorder"></hr>  
          </section>
          <div className="listItemsContainer">
            <div className="listItems">
             <h3>Loading...</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ItemList;