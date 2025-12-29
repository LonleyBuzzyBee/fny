import React from "react";
import * as a from "../../actions";
import { useDispatch } from "react-redux";
import StarRatings from 'react-star-ratings';

const Item = ( {item} ) => {
  const dispatch = useDispatch();
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/bd97ad55-7a7a-4fbc-9f19-f7d92a0b37d5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Item.js:7',message:'Item render - rating type check',data:{rating:item.rating,ratingType:typeof item.rating,itemId:item.id},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  const ratingNumber = Number(item.rating) || 0; // Convert to number as safety measure
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/bd97ad55-7a7a-4fbc-9f19-f7d92a0b37d5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Item.js:10',message:'After conversion - rating type',data:{ratingNumber,ratingNumberType:typeof ratingNumber},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  const handleItemClick = () => {
    console.log('Item clicked - dispatching selectedItem:', item);
    dispatch(a.selectedItem(item));
  };
  
  return (
    <React.Fragment>
      <div className="list-item" onClick={handleItemClick}>
        <img className="list-item-picture"  src={item.img} alt="img" />
        <hr className="hrItem"></hr>
        <div className="list-item-middle">
          <div className="list-item-bottom">
            <StarRatings
              rating={ratingNumber}
              starDimension="15px"
              starSpacing="15px"
              numberOfStars={5} />
            <button className="add2cart">ADD TO CART</button>
          </div>
          <h6>{item.title}</h6>
          <p>Price: ${item.price}</p>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Item;