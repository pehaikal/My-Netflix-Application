import NavigationBar from "../components/NavigationBar"
import Featured from "../components/Features"
import "../styles/_welcomePage.scss"
import List from "../components/CategoryList"
import { useState, useEffect } from "react"

const Welcome = ({ type }) => {
  const [lists, setLists] = useState([])

  useEffect(() => {
    const fetchRandomLists = async () => {
      try{

      }catch(error){
        console.log(error)
      }
    }
  })

  return (<>
    <div className = "welcome">
      <NavigationBar />
      <Featured type = { type }/>
      <List />
      <List />
      <List />
      <List />
    </div>
  </>)
}

export default Welcome;