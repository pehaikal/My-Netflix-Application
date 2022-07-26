import { useState, useRef } from "react";
import "../styles/_registerPage.scss";

export default function Register() { 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailReference = useRef();
  const handleStart = () => {
    setEmail(emailReference.current.value);
  };

  const passwordReference = useRef();
  const handleFinish = () => {
    setPassword(passwordReference.current.value);
  };

  return (
    <div className="register">
      <div className="header">
        <div className="wrapper">

          <img
            className="netflix-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />

          <button className="signIn-btn">Sign In</button>

        </div>
      </div>

      <div className="container">
        <h1>Unlimited Movies, TV shows, and more.</h1>
        
        <h2>Watch anywhere. Cancel anytime.</h2>
        
        <p>
          Ready to watch? Enter your email address and password to create your account.
        </p>

        {!email ? (
          <div className="user-input">
            <input type="email" placeholder="Email address" ref={emailReference} />

            <button className="signUp-btn" onClick={handleStart}>
              Get Started
            </button>

          </div>

        ) : (

          <form className="user-input">
            <input type="password" placeholder="Password" ref={passwordReference} />
            
            <button className="signUp-btn" onClick={handleFinish}>
              Start
            </button>

          </form>
        )}

      </div>
    </div>
  );
}