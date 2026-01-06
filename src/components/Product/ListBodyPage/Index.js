import React from "react";
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded} from 'react-redux-firebase';
import Header from '../../ReusableComponents/Header';
import TopSection from '../../ReusableComponents/TopSection';
import LogosSection from '../../ReusableComponents/LogosSection';
import Footer from '../../ReusableComponents/Footer';
import Items from '../Items';

const BodyItemList = () =>{
  const items = useSelector(state => state.firestore.ordered.items);
  
  // Console logs for debugging
  console.log('ListBodyPage - items:', items);
  console.log('ListBodyPage - items length:', items?.length);
  console.log('ListBodyPage - isLoaded(items):', isLoaded(items));
  
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
    return category === 'body';
  });
  
  console.log('ListBodyPage - filteredItems:', filteredItems);
  console.log('ListBodyPage - filteredItems length:', filteredItems.length);
  
  if (itemsLoaded && filteredItems.length > 0) {
    return (
      <div className="full-width-container">
        <Header/>
        <TopSection/>
        <div className="listItemsMainContainer">
          <section className="title">
              <p>Shop body</p>
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
              <h1>Shop body</h1>
              <hr className="hrBorder"></hr>  
          </section>
          <div className="listItemsContainer">
            <div className="listItems">
            <h3>No Body items found</h3>
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
              <h1>Shop body</h1>
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

export default BodyItemList;