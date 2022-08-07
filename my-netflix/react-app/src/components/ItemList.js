import "../styles/_itemList.scss"
import { useEffect, useState } from "react"
import { PlayCircleOutline, AddCircleOutline, ThumbUp, ThumbDown } from "@material-ui/icons"
import axios from "axios"

export default function ItemList({ index, item }) {

  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({})

  // const trailer = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  useEffect(() => {
    const getMovie = async () => {
      try{
        const response = await axios.get("/movies/find/" + item, 
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
      onMouseEnter = {() => setIsHovered(true)}
      onMouseLeave = {() => setIsHovered(false)}>
        
      <img
      src = { movie.img }
      alt = "" />

      {isHovered && (<>
          <video src = { movie.trailer } autoPlay = { true } loop />

          <div className = "movie-itemInfo">

            <div className = "hvr-icons">
              <PlayCircleOutline className = "icon" />
              <AddCircleOutline className = "icon" />
              <ThumbUp className = "icon" />
              <ThumbDown className = "icon" />
            </div>

            <div className="movie-details">
              <span>{ movie.duration }</span>
              <span className = "PG">{ movie.limit }</span>
              <span>{ movie.year }</span>
            </div>

            <div className = "movie-description">
              { movie.description }
            </div>

            <div className = "movie-genre">{ movie.genre }</div>

          </div>
        </>)}

    </div>
  </>)
}