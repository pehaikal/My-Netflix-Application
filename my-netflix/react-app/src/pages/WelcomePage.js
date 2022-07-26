import NavigationBar from "../components/NavigationBar";
import Featured from "../components/Features";
import "../styles/_welcomePage.scss";
import List from "../components/CategoryList";

const Welcome = () => {
  return (
    <div className="welcome">
      <NavigationBar />
      <Featured/>
      <List/>
      <List/>
      <List/>
      <List/>
    </div>
  );
};

export default Welcome;