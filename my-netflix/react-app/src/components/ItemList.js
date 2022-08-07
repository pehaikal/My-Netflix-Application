import "../styles/_itemList.scss"
import { useState } from "react"
import { PlayCircleOutline, AddCircleOutline, ThumbUp, ThumbDown } from "@material-ui/icons"
import { useEffect } from "react"
import axios from "axios"

export default function ItemList({ index, item }) {

  const [isHovered, setIsHovered] = useState(false);
  const [movieDetail, setMovie] = useState(null)

  const instance = axios.create({ baseURL: 'http://localhost:4500/backend-server/' })


  useEffect(() => {
    const getMovie = async () => {
      try{
        const response = await instance.get("/movies/find/" + item, 
        {
          headers: {
            token: 
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGRkNzlhMTE5NjEzODBiNjQyOTI3NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1OTgyNDY1NSwiZXhwIjoxNjYwNDI5NDU1fQ.LDp1BdQ54FtpFB6PlYKgQwUc3srcHmjCDVlAuCRwlaM",
          },
        })
        setMovie(response.data)

      }catch(error){
        console.log(error)
      }
    }
    getMovie()
  },[item])

  return (<>
    <div className = "itemList"
      style = {{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      
      onMouseLeave = {() => {setIsHovered(false)}}
      onMouseEnter= {() => {setIsHovered(true)}}>
      
      {/* https://www.e-tribart.fr/blog/wp-content/uploads/2016/11/strange1.jpg */}
     
      <img
      src = { movieDetail?.imgSmall}
      alt = "" />
      {isHovered && movieDetail && (<>
       
          <video src = { movieDetail.trailer } autoPlay = { true } loop />

          <div className = "movie-itemInfo">

            <div className = "hvr-icons">
              <PlayCircleOutline className = "icon" />
              <AddCircleOutline className = "icon" />
              <ThumbUp className = "icon" />
              <ThumbDown className = "icon" />
            </div>

            <div className="movie-details">
              <p>{movieDetail.title}</p>
              <span>{movieDetail.duration}</span>
              <span className = "PG">{movieDetail.limit}</span>
              <span>{movieDetail.year}</span>
            </div>

            <div className = "movie-description">
             { movieDetail.description }
            </div>

            <div className = "movie-genre">{movieDetail.genre}</div>

          </div>
        </>)}

    </div>
  </>)
}