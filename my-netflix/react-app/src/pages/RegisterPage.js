import { useRef } from "react"
import "../styles/_registerPage.scss"
import { sha256 } from "js-sha256"
import { useNavigate } from 'react-router-dom'
import axios from "axios"


export default function Register() { 
  const navigate = useNavigate();
  const emailReference = useRef()
  const passwordReference = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const phoneNumbRef = useRef()

  const handleStart = async (e) => {
    e.preventDefault()

    try{
      const userName = emailReference.current.value;
      const userPassword = sha256.update(passwordReference.current.value).hex();
      const firstName = firstNameRef.current.value;
      const lastName = lastNameRef.current.value;
      const phoneNumber = phoneNumbRef.current.value;

      console.log('url is' + process.env.REACT_APP_JAVA_API_BASE_URL)
      const response = await axios.post(process.env.REACT_APP_JAVA_API_BASE_URL + '/register', {
        userName,
        userPassword,
        firstName,
        lastName,
        phoneNumber
      })
      console.log(response)

      navigateToLogin();
      

    }catch(error) {
      console.log(error)
    }
  }

  function navigateToLogin(){
    navigate("/login", { replace: true });
  }
  
  return (
    <div className="register">
      <div className="header">
        <div className="wrapper">

          <img
            className="netflix-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />

          <button className="signIn-btn" onClick={navigateToLogin} >Sign In</button>

        </div>
      </div>

      <div className="container">
        <h1>Unlimited Movies, TV shows, and more.</h1>
        
        <h2>Watch anywhere. Cancel anytime.</h2>
        
        <p>
          Ready to watch? Enter your email address and password to create your account.
        </p>

        <div className="user-input">
          <input type="email" placeholder="Email Address" ref={ emailReference } />
          <input type="password" placeholder="Password" ref={ passwordReference } />
          <input type="firstName" placeholder="First Name" ref={firstNameRef} />
          <input type="lastName" placeholder="Last Name" ref={ lastNameRef } />
          <input type="phoneNumber" placeholder="Phone Number" ref={ phoneNumbRef } />

          
        </div>
        <div className="user-input no-margin">
        <button className="signUp-btn" onClick={ handleStart }>
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}