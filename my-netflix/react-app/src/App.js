import Register from "./pages/RegisterPage"
import Login from "./pages/LoginPage"
import Welcome from "./pages/WelcomePage"
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  // return (
  //   <div className="App">
  //     {user ? <Welcome /> : <Login />}
  //     {!user ? <Register /> : null}
  //   </div>
  // );

  // return <Register/>
  return <Login/>
  // return <Welcome/>

}

export default App