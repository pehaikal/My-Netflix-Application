import NavigationBar from "../components/NavigationBar"
import Featured from "../components/Features"
import "../styles/_welcomePage.scss"
import List from "../components/CategoryList"
import {  useState, useEffect } from "react"
import axios from "axios"
  
const Welcome = ({ type }) => {
  const instance = axios.create({ baseURL: process.env.REACT_APP_NODE_API_BASE_URL })
  
  const [lists, setLists] = useState([])
  const [genre, setGenre] = useState(null)

  useEffect(() => {
    const fetchRandomLists = async () => {
      try{
        const response = await instance.get(`lists${ type ? "?type=" + type : "" }${ genre ? "&genre=" + genre : "" }`,
        {
          headers: {
            token: 
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGRkNzlhMTE5NjEzODBiNjQyOTI3NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1OTc2ODkyNCwiZXhwIjoxNjYwMzczNzI0fQ.huduS0kelVha2Z7f8Aw8Yf5ho4ySyy_ycMaV6iXZv1I",
          },
        })
        console.log(response.data)
        setLists(response.data)

      }catch(error) {
        console.log(error)
      }
    }
    fetchRandomLists()
  }, [type, genre])

  return (<>
    <div className = "welcome">
      <NavigationBar />
      <Featured type = { type }/>
      {lists.map((list, index) =>(
        <List list={ list } key={index}/>
      ))}
    </div>
  </>)
}

export default Welcome;