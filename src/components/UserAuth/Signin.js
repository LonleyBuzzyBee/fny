import React, {useState} from "react";
import { useHistory } from 'react-router-dom';
import { auth } from "../../firebase"
import Header from '../ReusableComponents/Header';
import LogosSection from '../ReusableComponents/LogosSection';
import Footer from '../ReusableComponents/Footer';
import FNYLOGO from '../assets/imgs/logoFNY.png'

const Signin = () => { 
  const [message, setMessage] = useState("");
  const history = useHistory();
  
  const doSignIn = (event)=> {
  event.preventDefault();
  const email = event.target.signinEmail.value;
  const password = event.target.signinPassword.value;

  // Using compat mode: auth.signInWithEmailAndPassword()
  auth.signInWithEmailAndPassword(email, password).then(function () {
      // console.log(auth.currentUser)
    console.log("Successfully signed in!");
    setMessage("Successfully signed in!");
    // Redirect to home page after successful sign-in
    setTimeout(() => {
      history.push("/");
    }, 500);
  }).catch(function (error) {
    setMessage(error.message)
      
      console.log(error.message);
    });
  }
  return (
    <>
      <Header />
      <div className="sign-ins-container">
        <div className="sign-ins-container-inner">
          <img src={FNYLOGO}/>
          <form onSubmit={doSignIn}>
          <label>Welcome</label>
            <input
              type='text'
              name='signinEmail'
              placeholder='Email' />
            <input
              type='password'
              name='signinPassword'
              placeholder='Password' />
            {message}
            <a href="/"><button className="submitButton"  type='submit'>SIGN IN</button></a>
          </form>
        </div>
      </div>
      <LogosSection />
      <Footer />
    </>
  );
}
export default Signin