import React, {useState} from "react";
import { auth } from "../../firebase"
import Header from '../ReusableComponents/Header';
import LogosSection from '../ReusableComponents/LogosSection';
import Footer from '../ReusableComponents/Footer';
import FNYLOGO from '../assets/imgs/logoFNY.png'


const SignUp = () => {
  const [message, setMessage] = useState("");

  const doSignUp = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    // Using compat mode: auth.createUserWithEmailAndPassword()
    auth.createUserWithEmailAndPassword(email, password).then(function(){
      console.log("successfully signed up!");
      setMessage("Successfully signed up!");
    }).catch(function(error) {
      console.log(error.message);
      setMessage(error.message);
    });
  }
  return (
    <>
      <Header />
      <div className="sign-ins-container">
        <div className="sign-ins-container-inner">
          <img src={FNYLOGO}/>
          <form onSubmit={doSignUp}>
            <label>Join the FNY family</label>
            <input
              type='text'
              name='email'
              placeholder='email' />
            <input
              type='password'
              name='password'
              placeholder='Password' />
            {message}
            <a href="/"><button className="submitButton" type='submit'>SIGN UP</button></a>
          </form>
        </div>
      </div>
      <LogosSection />
      <Footer />
    </>
  );
}

export default SignUp;