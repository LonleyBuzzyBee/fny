import React from 'react';
import ReusableForm from '../ReusableComponents/ReusableForm';
import * as a from "../../actions";
import { useDispatch } from "react-redux";
import { db, storage } from '../../firebase';
import Header from '../ReusableComponents/Header';

const CreateItem = () => {
 
  const dispatch = useDispatch();
  dispatch(a.seeForm());

  const [fileUrl, setFileUrl] = React.useState(null);
  const [submitStatus, setSubmitStatus] = React.useState(null); // 'success', 'error', or null

  const handleImageAsFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log('📤 Uploading image:', file.name, 'Size:', file.size, 'bytes');
    
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);

      await fileRef.put(file);
      const url = await fileRef.getDownloadURL();
      setFileUrl(url);
      console.log('✅ Image uploaded successfully! URL:', url);
    } catch (error) {
      console.error('❌ Error uploading image:', error);
    }
  }
  
  const addItemToFirestore = async (event) => {
    event.preventDefault();
    
    // Store form reference before async operation (React events are pooled and nullified)
    const form = event.target;
    
    // Clear previous status
    setSubmitStatus(null);
    
    const rawRating = form.rating.value;
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/bd97ad55-7a7a-4fbc-9f19-f7d92a0b37d5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'CreateItem.js:41',message:'Before conversion - rating from form',data:{rawRating,rawRatingType:typeof rawRating},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    const itemData = {
      title: form.title.value,
      rating: Number(form.rating.value) || 0, // Convert to number
      price: form.price.value,
      category: form.category.value,
      description: form.description.value,
      img: fileUrl,
    };
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/bd97ad55-7a7a-4fbc-9f19-f7d92a0b37d5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'CreateItem.js:48',message:'ItemData after conversion - rating type',data:{rating:itemData.rating,ratingType:typeof itemData.rating},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    console.log('📝 Submitting item data:', itemData);
    
    try {
      const docRef = await db.collection('items').doc().set(itemData);
      console.log('✅ Item successfully created in Firestore!', itemData);
      // Reset form using stored reference (event.target is nullified after async)
      form.reset();
      setFileUrl(null);
      setSubmitStatus('success');
    } catch (error) {
      console.error('❌ Error creating item:', error);
      console.error('Error details:', error.message);
      setSubmitStatus('error');
    }
  };
  return(
    <>
       <Header />
      <div className="adminCreate">
        {submitStatus === 'success' && <h4>Success</h4>}
        {submitStatus === 'error' && <h4>Upload failed</h4>}
        <ReusableForm
        formSubmission={addItemToFirestore}
        importImage={handleImageAsFile}
        buttonText="Submit"/>
      </div>
    </>
  );
}
export default CreateItem;