import { useContext, useState } from "react";
import { login } from "../authContext/apiCalls";
import { sha256 } from "js-sha256";

import { AuthContext } from "../authContext/AuthContext";
import "../styles/_loginPage.scss";

export default function Login() {
  
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ userName, userPassword }, dispatch);
  };

  return (
    <div className = "signIn">
      <div className = "header">
        <div className = "wrapper">

          <img
            className = "netflix-logo"
            src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt = ""
          />

        </div>
      </div>

      <div className = "container">
        <form>

          <h1>Sign In</h1>

          <input type="email" placeholder="Email"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input type="password" placeholder="Password"
            onChange={(e) => (setUserPassword(sha256.update(e.target.value).hex()))}
          />

          <button className = "signIn-btn" onClick={handleLogin}>Login</button>

          <span>
            New to Netflix? <b>Sign Up now.</b>
          </span>

          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b> Learn more</b>.
          </small>

        </form>
      </div>
    </div>
  );
}