import React from 'react'
import Item from "./Item";

const Items = ({items}) => {
  // Safety check for items
  if (!items || !Array.isArray(items) || items.length === 0) {
    console.log('Items component - no items to display:', items);
    return (
      <div className="listItemsContainer">
        <div className="listItems">
          <h3>No items available</h3>
        </div>
      </div>
    );
  }
  
  console.log('Items component - rendering items:', items.length);
  
  return (
    <div className="listItemsContainer">
      <div className="listItems">
        {items.map((item) => {
          if (!item || !item.id) {
            console.warn('Items component - invalid item:', item);
            return null;
          }
          return (
            <Item
              item={item}
              id={item.id}
              key={item.id} />
          )
        })}
      </div>
    </div>
  )
}

export default Items
