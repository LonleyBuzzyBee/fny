import React from "react";
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded} from 'react-redux-firebase';
import ItemDetail from "../ItemDetails";
import Header from '../../ReusableComponents/Header';
import TopSection from '../../ReusableComponents/TopSection';
import Items from '../Items';

const LipsItemList = () =>{
  const items = useSelector(state => state.firestore.ordered.items);
  const selectedItem = useSelector(state => state.selectedItem);
  
  // Console logs for debugging
  console.log('ListLipsPage - items:', items);
  console.log('ListLipsPage - items length:', items?.length);
  console.log('ListLipsPage - isLoaded(items):', isLoaded(items));
  
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
  
  // Filter items by category (case-insensitive)
  const filteredItems = itemsArray.filter(item => {
    const category = item?.category?.toLowerCase();
    return category === 'lips';
  });
  
  console.log('ListLipsPage - filteredItems:', filteredItems);
  console.log('ListLipsPage - filteredItems length:', filteredItems.length);
  
  if (itemsLoaded && filteredItems.length > 0) {
    return (
      <div>
        <Header/>
        <TopSection/>
        <div className="listItemsMainContainer">
          <section className="title">
              <h1>S H O P   L I P S :</h1>
              <hr className="hrBorder"></hr>  
          </section>
          <Items items={filteredItems}/>
        </div>
      </div>
    );
  } else if (itemsLoaded && filteredItems.length === 0) {
    return (
      <div>
        <Header/>
        <TopSection/>
        <div className="listItemsMainContainer">
          <section className="title">
              <h1>S H O P   L I P S :</h1>
              <hr className="hrBorder"></hr>  
          </section>
          <div className="listItemsContainer">
            <div className="listItems">
            <h3>No Lips items found</h3>
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
              <h1>S H O P   L I P S :</h1>
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

export default LipsItemList;