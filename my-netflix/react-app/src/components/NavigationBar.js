import "../styles/_navigationBar.scss";
import { useState } from "react";
import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (<>
    <div className = {isScrolled ? "navigationBar scrolled" : "navigationBar"}>
      <div className = "container">

        <div className = "navBar-left">
          <img
            src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt = ""/>

          <span>Welcomepage</span>
          <span>Series</span>
          <span>Movies</span>
          <span>New and Popular</span>
          <span>My Recent List</span>

        </div>

        <div className = "navBar-right">
          <Search className = "nav-icon" />
          <Notifications className = "nav-icon" />

          <img
            src = "https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt = "" />

          <div className = "user-profile">
            <ArrowDropDown className = "nav-icon" />

            <div className = "profile-info">
              <span>Settings</span>
              <span>Logout</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  </>);
};

export default NavigationBar;