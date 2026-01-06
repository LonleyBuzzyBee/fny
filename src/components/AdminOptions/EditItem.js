import ReusableForm from '../ReusableComponents/ReusableForm';
import { useFirestore, useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import React, { useState, useEffect } from 'react';
import * as a from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { storage } from '../../firebase';
import Header from '../ReusableComponents/Header';
import LogosSection from '../ReusableComponents/LogosSection';
import Footer from '../ReusableComponents/Footer';


const EditItem = () => {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [fileUrl, setFileUrl] = useState(null);
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const items = useSelector(state => state.firestore.ordered.items);
  const selectedItem = useSelector(state => state.selectedItem);
  
  // Connect to Firestore to get items
  useFirestoreConnect([
    {
      collection: 'items'
    }
  ]);
  
  // Get item from Firestore by ID from URL params
  const itemsArray = Array.isArray(items) ? items : [];
  const itemFromStore = itemsArray.find(item => item.id === id);
  const currentItem = itemFromStore || (selectedItem?.id === id ? selectedItem : null);
  
  // Update Redux state when item is found from URL
  useEffect(() => {
    if (itemFromStore) {
      dispatch(a.selectedItem(itemFromStore));
    }
  }, [itemFromStore, dispatch]);
  
  // Redirect if item not found
  useEffect(() => {
    const itemsLoaded = isLoaded(items);
    if (itemsLoaded && !currentItem) {
      history.push('/All');
    }
  }, [items, currentItem, history]);
  const handleImageAsFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      const url = await fileRef.getDownloadURL();
      setFileUrl(url);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    }
  }
  const editItemFormSubmission = async (event) => {
    event.preventDefault();
    if (!currentItem) {
      alert('Item not found');
      return;
    }
    
    const propertiesToUpdate = {
      title: event.target.title.value,
      rating: Number(event.target.rating.value) || 0, // Convert to number
      price: event.target.price.value,
      category: event.target.category.value,
      description: event.target.description.value,
    };
    
    // Only update image if a new one was uploaded
    if (fileUrl) {
      propertiesToUpdate.img = fileUrl;
    } else {
      // Keep existing image if no new image was uploaded
      propertiesToUpdate.img = currentItem.img;
    }
    
    try {
      await firestore.update({ collection: 'items', doc: currentItem.id }, propertiesToUpdate);
      dispatch(a.selectedItem({ ...currentItem, ...propertiesToUpdate }));
      
      // Navigate back to item detail page after successful update
      history.push(`/item/${currentItem.id}`);
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update item. Please try again.');
    }
  }
  
  if (!currentItem) {
    const itemsLoaded = isLoaded(items);
    if (!itemsLoaded) {
      return (
        <React.Fragment>
          <Header />
          <div className="centered-padding">
            <h3>Loading...</h3>
          </div>
          <LogosSection />
          <Footer />
        </React.Fragment>
      );
    }
    return null; // Will redirect via useEffect
  }
  return (
    <React.Fragment>
      <Header />
      <ReusableForm
        formSubmission={editItemFormSubmission}
        importImage={handleImageAsFile}
        buttonText="Update Item"
        initialValues={currentItem}
      />
      <LogosSection />
      <Footer />
    </React.Fragment>
  )
}
export default EditItem; 