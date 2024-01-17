import React, { useEffect, useState } from "react";
import "./PreferredLocations.css";
import axios from "axios";

const PreferredLocations = () => {
  const [preferredLocations, setPreferredLocations] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const res = await axios.get(
        "http://192.168.10.210:8080/weatherApp/user/1/allpreferedLocationsWeather"
      );
      console.log(res.data);
      const preferredLocationsData = res.data;
      setPreferredLocations(preferredLocationsData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {preferredLocations.map((location) => (
        <div className="preferedlocations-content-holder">
          <div className="cityname-description-container">
            <h1>{location.city.name}</h1>
            <p className="high-low-temp">
              H:{Math.round(location.list[0].main.temp_max)}° L:
              {Math.round(location.list[0].main.temp_min)}°
            </p>
            <p className="real-feel">
              Real feel: {Math.round(location.list[0].main.feels_like)}°C
            </p>
            <p className="desc-prefer-loc">
              {location.list[0].weather[0].description.charAt(0).toUpperCase() +
                location.list[0].weather[0].description.slice(1)}
            </p>
          </div>
          <div className="prefered-loc-icon">
            <img alt="synny" src={location.list[0].weather[0].iconUrl} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreferredLocations;
