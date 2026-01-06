import React from 'react'

const Pagination = ({ postsPerPage, totalePosts, paginate, currentPage }) => {
  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(totalePosts / postsPerPage); i++){
    pageNumbers.push(i);
  }
  return (
    <div className="pagination-dots-container">
      {pageNumbers.map(number => (
        <div 
          className={`pagination-item ${number === currentPage ? "circle-highlight" : "circle"}`} 
          onClick={() => paginate(number)} 
          key={number}
        >
        </div>
      ))}
    </div>
  )
}

export default Pagination
