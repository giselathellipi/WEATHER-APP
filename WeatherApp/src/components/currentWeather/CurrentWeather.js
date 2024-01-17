import React from "react";
import "./CurrentWeather.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import axios from "axios";
const CurrentWeather = ({ data }) => {
  console.log(data);
  const handlePreferredLocation = async () => {
    if (data) {
      const { city } = data;
      console.log("hi", data.city.coord.lat, data.city.coord.lon, city);
      const userId = 1; // Replace with the actual user ID

      const locationData = {
        latitude: data.city.coord.lat,
        longitude: data.city.coord.lon,
        name: city.name,
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
    <div className="weather-content-holder">
      <div className="city-name">
        <div style={{ display: "flex" }}>
          <p>{data.city.name}</p>
        </div>

        <h1>{Math.round(data.list[0].main.feels_like)}°</h1>
        <p className="city-description">
          {data.list[0].weather[0].description}
        </p>
        <p className="min-max-temp">
          H: {Math.round(data.list[0].main.temp_max)}° L:
          {Math.round(data.list[0].main.temp_min)}°
        </p>
      </div>
      <div className="weather-icon">
        <img src={data.list[0].weather[0].iconUrl} alt="weather-icon" />
        <StarBorderIcon
          onClick={handlePreferredLocation}
          style={{ color: "white" }}
        />
      </div>
    </div>
  );
};

export default CurrentWeather;
