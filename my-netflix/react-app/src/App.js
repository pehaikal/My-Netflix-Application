import '../src/styles/app.scss'
import Register from "./pages/RegisterPage"
import Login from "./pages/LoginPage"
import Welcome from "./pages/WelcomePage"
// import Watch from "./pages/WatchPage"
import { useContext } from "react"
import { AuthContext } from "./authContext/AuthContext"
import { Navigate, Route, Routes } from "react-router-dom"

function App() {
  const user = useContext(AuthContext)
  // const user = false

  return (<>
  <Routes>
    <Route path = "/register" element = { !user ? <Register /> : <Navigate to = "/"/> }></Route>
    <Route path = "/login" element = { !user ? <Login /> : <Navigate to = "/"/> }></Route>
    <Route exact path = "/" element = { user ? <Welcome /> : <Navigate to = "/register"/>}></Route>

    {user && (<>
    <Route path = "/movies" element = { <Welcome type = "movie"/> }></Route>
    <Route path = "/series" element = { <Welcome type = "serie"/>}></Route>
    {/* <Route exact path = "/watch" element = { <Watch /> }></Route> */}
    </>)}
  </Routes>
</>)}

export default App