import React from "react";
import { useHistory } from 'react-router-dom';

const ReusableForm = ({formSubmission, importImage, buttonText, initialValues }) => {
  const history = useHistory();
  const isEditMode = !!initialValues;

  const handleBackToList = (e) => {
    e.preventDefault();
    history.push('/All');
  };

  return (
    <div className="form">
      <h3>{isEditMode ? 'EDIT ITEM' : 'CREATE NEW ITEM'}</h3>
       <hr className="hrItem"></hr>
      <form onSubmit={formSubmission}>
        <input
          type='text'
          name='title'
          placeholder='Product Name'
          defaultValue={initialValues?.title || ''}
        />
        <input
          type='number'
          name='rating'
          placeholder='Star Rating'
          defaultValue={initialValues?.rating || ''}
        />
        <input
          type='number'
          name='price'
          placeholder='Price'
          defaultValue={initialValues?.price || ''}
        />
        <input
          type='text'
          name='category'
          placeholder='Category'
          defaultValue={initialValues?.category || ''}
        />
        <input className="fileButton"
          type='file'
          onChange={importImage}
          name='img'
          placeholder='image path'
        />
        {isEditMode && initialValues?.img && (
          <div className="form-image-preview">
            <p>Current image:</p>
            <img src={initialValues.img} alt="Current" />
          </div>
        )}
        <textarea
          type='text'
          name='description'
          placeholder='Enter description here'
          defaultValue={initialValues?.description || ''}
        />
        <div className="formButtons">
          <button className="submitButton" type='submit'>{buttonText}</button>
          <button className="formListButton" onClick={handleBackToList}>Back to list</button>
        </div>
      </form>
    </div>
  );
}
export default ReusableForm;