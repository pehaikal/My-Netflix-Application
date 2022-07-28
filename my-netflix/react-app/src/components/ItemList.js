import "../styles/_itemList.scss"
import { useState } from "react"
import { PlayCircleOutline, AddCircleOutline, ThumbUp, ThumbDown } from "@material-ui/icons"


export default function ItemList({ index }) {

  const [isHovered, setIsHovered] = useState(false);
  const trailer = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  
  return (<>
    <div className = "itemList"
      style = {{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter = {() => setIsHovered(true)}
      onMouseLeave = {() => setIsHovered(false)}>
        
      <img
        src = "https://www.e-tribart.fr/blog/wp-content/uploads/2016/11/strange1.jpg"
        alt = "" />

      {isHovered && (<>
          <video src = {trailer} autoPlay = {true} loop />

          <div className = "movie-itemInfo">

            <div className = "hvr-icons">
              <PlayCircleOutline className = "icon" />
              <AddCircleOutline className = "icon" />
              <ThumbUp className = "icon" />
              <ThumbDown className = "icon" />
            </div>

            <div className="movie-details">
              <span>1 hour 14 mins</span>
              <span className = "PG">+16</span>
              <span>1999</span>
            </div>

            <div className = "movie-description">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Praesentium hic rem eveniet error possimus, neque ex doloribus.
            </div>

            <div className = "movie-genre">Action</div>

          </div>
        </>)}

    </div>
  </>);
}