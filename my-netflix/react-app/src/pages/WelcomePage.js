import NavigationBar from "../components/NavigationBar"
import Featured from "../components/Features"
import "../styles/_welcomePage.scss"
import List from "../components/CategoryList"
// import { useState, useEffect } from "react"

const Welcome = ({ type }) => {
  // const [lists, setLists] = useState([])

  // useEffect(() => {
  //   fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
  //     .then(response => response.json())
  //     .then(data => setLists(data.results))
  // })

  return (
    <div className = "welcome">
      <NavigationBar />
      <Featured type = { type }/>
      <List />
      <List />
      <List />
      <List />
    </div>
  )
}

export default Welcome;