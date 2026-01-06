import React from 'react'
import * as a from '../../../actions';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

const Posts = ({ posts }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  return (
    <>
      {posts.map(post => (
        <div  onClick={() => {
          dispatch(a.selectedItem(post));
          // Pass current location as state so back button knows where to return
          history.push({
            pathname: `/item/${post.id}`,
            state: { from: location.pathname }
          });
        }} className="recomended-posts-details"  key={post.id}>
          <img  src={post.img} alt="img" />
          <hr></hr>
          <div className="recomended-posts-details-info">
            <h6>{post.title}</h6>
            <p>Price: ${post.price}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default Posts; 
