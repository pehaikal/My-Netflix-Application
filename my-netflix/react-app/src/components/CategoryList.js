import "../styles/_categoryList.scss"
import { useRef, useState } from "react"
import ItemList from "./ItemList"
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@material-ui/icons"

export default function List() {
  
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const listRef = useRef()

  const handleClick = (direction) => {
    setIsMoved(true);

    let distance = listRef.current.getBoundingClientRect().x - 50;

    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1)
      listRef.current.style.transform = `translateX(${230 + distance}px)`
    }

    if (direction === "right" && slideNumber < 5) {
      setSlideNumber(slideNumber + 1)
      listRef.current.style.transform = `translateX(${-230 + distance}px)`
    }
  };

  return (
    <div className = "movies-list">

      <span className = "listTitle">Watch Movies Again</span>

      <div className = "wrapper">

        <ArrowBackIosOutlined
          className = "sliderArrow left"
          onClick = {() => handleClick("left")}
          style = {{ display: !isMoved && "none" }} />

        <div className = "container" ref = {listRef}>
          <ItemList index={0} />
          <ItemList index={1} />
          <ItemList index={2} />
          <ItemList index={3} />
          <ItemList index={4} />
          <ItemList index={5} />
          <ItemList index={6} />
          <ItemList index={7} />
          <ItemList index={8} />
          <ItemList index={9} />
        </div>

        <ArrowForwardIosOutlined
          className = "sliderArrow right"
          onClick = {() => handleClick("right")} />
        
      </div>
    </div>
  );
}