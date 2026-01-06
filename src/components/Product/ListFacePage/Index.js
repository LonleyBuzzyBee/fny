import React from "react";
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded} from 'react-redux-firebase';
import Header from '../../ReusableComponents/Header';
import TopSection from '../../ReusableComponents/TopSection';
import LogosSection from '../../ReusableComponents/LogosSection';
import Footer from '../../ReusableComponents/Footer';
import Items from '../Items';

const FaceItemList = () =>{
  const items = useSelector(state => state.firestore.ordered.items);
  
  // Console logs for debugging
  console.log('ListFacePage - items:', items);
  console.log('ListFacePage - items length:', items?.length);
  console.log('ListFacePage - isLoaded(items):', isLoaded(items));
  
  useFirestoreConnect([
    {
      collection: 'items'
    }
  ]);
  
  // Check if items are loaded and is an array
  const itemsLoaded = isLoaded(items);
  const itemsArray = Array.isArray(items) ? items : [];
  
  // Filter items by category (case-insensitive)
  const filteredItems = itemsArray.filter(item => {
    const category = item?.category?.toLowerCase();
    return category === 'face';
  });
  
  console.log('ListFacePage - filteredItems:', filteredItems);
  console.log('ListFacePage - filteredItems length:', filteredItems.length);
  
  if (itemsLoaded && filteredItems.length > 0) {
    return (
      <div className="full-width-container">
        <Header/>
        <TopSection/>
        <div className="listItemsMainContainer">
          <section className="title">
              <p>Shop face</p>
              <hr className="hrBorder"></hr>  
          </section>
          <Items items={filteredItems}/>
        </div>
        <LogosSection />
        <Footer />
      </div>
    );
  } else if (itemsLoaded && filteredItems.length === 0) {
    return (
      <div className="full-width-container">
        <Header/>
        <TopSection/>
        <div className="listItemsMainContainer">
          <section className="title">
              <p>Shop face</p>
              <hr className="hrBorder"></hr>  
          </section>
          <div className="listItemsContainer">
            <div className="listItems">
            <h3>No Face items found</h3>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
      return (
      <div className="full-width-container">
        <Header/>
        <TopSection/>
        <div className="listItemsMainContainer">
          <section className="title">
              <p>Shop face</p>
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

export default FaceItemList;