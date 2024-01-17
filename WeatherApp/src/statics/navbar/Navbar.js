import React from "react";
import "./Navbar.css";
import axios from "axios";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ListIcon from "@mui/icons-material/List";

const Navbar = ({ currentWeather, onListIconClick }) => {
  console.log(currentWeather);
  const handlePreferredLocation = async () => {
    console.log("lalal", currentWeather);
    if (currentWeather) {
      console.log(currentWeather);
      console.log(onListIconClick);
      const { latitude, longitude, city } = currentWeather;
      const userId = 1; // Replace with the actual user ID

      const locationData = {
        latitude: latitude,
        longitude: longitude,
        name: city,
        userId: userId,
      };

      try {
        await axios.post(
          "http://192.168.10.210:8080/weatherApp/preferredLocation",
          locationData
        );
        console.log("Location added to preferred locations");
      } catch (error) {
        console.log("Error adding location to preferred locations:", error);
      }
    }
  };

  return (
    <div className="navbar-content-holder">
      <StarBorderIcon onClick={handlePreferredLocation} />
      <ListIcon onClick={onListIconClick} />
    </div>
  );
};

export default Navbar;
