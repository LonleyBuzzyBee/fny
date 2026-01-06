import React from "react";
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded} from 'react-redux-firebase';
import Header from '../../ReusableComponents/Header';
import TopSection from '../../ReusableComponents/TopSection';
import LogosSection from '../../ReusableComponents/LogosSection';
import Footer from '../../ReusableComponents/Footer';
import Items from '../Items';

const ItemList = () =>{
  const items = useSelector(state => state.firestore.ordered.items);
  
  // Console logs for debugging
  console.log('ListAllPage - items:', items);
  console.log('ListAllPage - items type:', typeof items);
  console.log('ListAllPage - items is array?', Array.isArray(items));
  console.log('ListAllPage - items length:', items?.length);
  console.log('ListAllPage - isLoaded(items):', isLoaded(items));
  
   useFirestoreConnect([
    {
      collection: 'items'
    }
  ]);
  
  // Check if items are loaded and is an array
  const itemsLoaded = isLoaded(items);
  const itemsArray = Array.isArray(items) ? items : [];
  
  if (itemsLoaded && itemsArray.length > 0) {
    return (
      <div className="full-width-container">
        <Header/>
        <TopSection/>
        <div className="listItemsMainContainer">
          <section className="title">
              <p>Shop all</p>
              <hr className="hrBorder"></hr>  
          </section>
          <Items items={itemsArray}/>
        </div>
        <LogosSection />
        <Footer />
      </div>
    );
  } else if (itemsLoaded && itemsArray.length === 0) {
    return (
      <div className="full-width-container">
        <Header/>
        <TopSection/>
        <div className="listItemsMainContainer">
          <section className="title">
              <p>Shop all</p>
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
      <div className="full-width-container">
        <Header/>
        <TopSection/>
        <div className="listItemsMainContainer">
          <section className="title">
              <p>Shop all</p>
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