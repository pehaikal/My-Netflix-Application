import '../styles/_features.scss'
import { InfoOutlined, PlayArrow } from "@material-ui/icons"
import { useEffect, useState } from "react"
import axios from 'axios'

export default function Featured({ type }) {
  const [content, setContent] = useState({})
  const instance = axios.create({ baseURL: process.env.REACT_APP_NODE_API_BASE_URL })
  
  useEffect(() => {
    const getRandomContent = async () => {
      try{
        const response = await instance.get(`/movies/random?type=${type}`, 
        {
          headers: {
            token: 
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGRkNzlhMTE5NjEzODBiNjQyOTI3NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1OTc2ODkyNCwiZXhwIjoxNjYwMzczNzI0fQ.huduS0kelVha2Z7f8Aw8Yf5ho4ySyy_ycMaV6iXZv1I",
          },
        })
        setContent(response.data[0])

      }catch(error){
        console.log(error)
      }
    }
    getRandomContent()
  }, [type])

  return (
    <div className = "movie-features">

      {type && (
        <div className = "movie-category">

          <span>{type === "movie" ? "Movies" : "Series"}</span>

          <select name = "movie-genre" id = "movie-genre">
            <option>Genre</option>
            <option value = "fantasy">Fantasy</option>
            <option value = "historical">Historical</option>
            <option value = "horror">Horror</option>
            <option value = "sci-fi">Sci-fi</option>
            <option value = "thriller">Thriller</option>
            <option value = "romance">Romance</option>
            <option value = "crime">Crime</option>
            <option value = "western">Western</option>
            <option value = "documentary">Documentary</option>
            <option value = "animation">Animation</option>
            <option value = "drama">Drama</option>
            <option value = "adventure">Adventure</option>
            <option value = "comedy">Comedy</option>
          </select>

        </div>
      )}

      <img
        src = { content.img }
        alt = "" />

      <div className = "movie-title">
        <img src = { content.imgTitle }
        alt = "" />

        <span className = "movie-description">
          {content.description}
        </span>

        <div className = "btns">

          <button className = "play-mock-btn">
            <PlayArrow />
            <span>Play</span>
          </button>

          <button className = "more-info">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}