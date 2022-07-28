import '../styles/_features.scss'
import { InfoOutlined, PlayArrow } from "@material-ui/icons"

export default function Featured({ type }) {

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
        src = "https://www.biloxifumc.com/wp-content/uploads/2017/06/Movie.jpg" alt = "" />

      <div className = "movie-title">
        <img src = "https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUZdeG1DrMstq-YKHZ-dA-cx2uQN_YbCYx7RABDk0y7F8ZK6nzgCz4bp5qJVgMizPbVpIvXrd4xMBQAuNe0xmuW2WjoeGMDn1cFO.webp?r=df1" alt = "" />

        <span className = "movie-description">
        A descendent of explorer Sir Francis Drake uncovers the location of the legendary El Dorado. With the help of his mentor and an ambitious journalist he works to uncover its secrets while surviving on an island filled with pirates, mercenaries, and a mysterious enemy.
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