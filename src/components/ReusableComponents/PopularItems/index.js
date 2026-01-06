import React, { useState, useEffect } from "react";
import Pagination from '../RecommendedSection/Pagination';
import Posts from '../RecommendedSection/Posts';
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';

const PopularItems = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  
  // Connect to Firestore to get items
  useFirestoreConnect([
    {
      collection: 'items'
    }
  ]);
  
  const items = useSelector(state => state.firestore.ordered.items);
  const itemsLoaded = isLoaded(items);
  const itemsArray = Array.isArray(items) ? items : [];
  
  // Filter items with 5-star rating
  const popularItems = itemsArray.filter(item => {
    const rating = Number(item?.rating) || 0;
    return rating === 5;
  });
  
  // Adjust posts per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setPostsPerPage(1);
      } else {
        setPostsPerPage(3);
      }
      // Reset to page 1 when changing posts per page
      setCurrentPage(1);
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const paginate = pageNumber => setCurrentPage(pageNumber);
  
  // Don't render if items aren't loaded or no popular items
  if (!itemsLoaded || !popularItems || popularItems.length === 0) {
    return null;
  }
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const numberOfPages = Math.ceil(popularItems.length / postsPerPage);
  const currentPosts = popularItems.slice(indexOfFirstPost, indexOfLastPost);
  
  return (
    <section className="recomended">
      <div className="recomended-container">
        <div className="recomended-title">
          <h3>Popular Items</h3>
        </div>
        <div className="recomended-posts">
          <Posts posts={currentPosts} />
        </div>
        <div className="recomended-pagination">
          <Pagination 
            postsPerPage={postsPerPage} 
            totalePosts={popularItems.length} 
            currentPage={currentPage} 
            paginate={paginate} 
          />
          <p className="recomended-page-number">Page {currentPage} of {numberOfPages}</p>
        </div>
      </div>
    </section>
  );
};

export default PopularItems;

