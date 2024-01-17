import React, { useState, useEffect } from "react";
import "./App.css";
import CurrentWeather from "./components/currentWeather/CurrentWeather";
import ForecastWeather from "./components/forecastWeather/ForecastWeather";
import Search from "./components/search/Search";
import { Weather_API_URL } from "./config/Api";
import PreferredLocations from "./components/preferredLocations/PreferredLocations";
import { Route, Routes, Link, useNavigate } from "react-router-dom";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [lastSearch, setLastSearch] = useState();
  const [showPreferredLocation, setShowPreferredLocation] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchLastSearchedCity();
  }, []);

  const fetchLastSearchedCity = async () => {
    try {
      const response = await fetch(
        "http://192.168.10.210:8080/weatherApp/user/1/weatherforecats"
      );
      const lastSearchedCity = await response.json();
      console.log(lastSearchedCity);

      localStorage.setItem(
        "lastSearchedCity",
        JSON.stringify(lastSearchedCity)
      );

      setLastSearch(lastSearchedCity);

      if (lastSearchedCity && lastSearchedCity.value) {
        fetchDataAndUpdateState(lastSearchedCity);
      }
    } catch (error) {
      console.error("Error fetching last searched city:", error);
    }
  };

  const fetchDataAndUpdateState = async (searchData) => {
    const [latitude, longitude] = searchData.value.split(" ");

    try {
      const currentResponse = await fetch(
        `${Weather_API_URL}/${latitude}/${longitude}`
      );
      const currentWeatherData = await currentResponse.json();

      const forecastResponse = await fetch(
        `${Weather_API_URL}/${latitude}/${longitude}`
      );
      const forecastWeatherData = await forecastResponse.json();

      setCurrentWeather({ city: searchData.label, ...currentWeatherData });
      setForecast({ city: searchData.label, ...forecastWeatherData });
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const handleWeatherDataFetch = async (searchData) => {
    if (searchData && searchData.value) {
      fetchDataAndUpdateState(searchData);
      navigate("/");
    }
    setShowPreferredLocation(false);
  };

  const handleLocationSelect = async (selectedLocation) => {
    fetchDataAndUpdateState(selectedLocation);
    setShowPreferredLocation(false);
    navigate("/");
  };
  return (
    <div className="container">
      <Search onSearchChange={handleWeatherDataFetch} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              {(currentWeather || lastSearch) && (
                <CurrentWeather data={currentWeather || lastSearch} />
              )}
              {(forecast || lastSearch) && (
                <ForecastWeather data={forecast || lastSearch} />
              )}
            </>
          }
        />
        <Route
          path="/preferred-location"
          element={
            <>
              {showPreferredLocation === true && (
                <PreferredLocations onSelectLocation={handleLocationSelect} />
              )}
            </>
          }
        />
      </Routes>
      <div className="button-show-loc">
        <button
          onClick={() => setShowPreferredLocation(!showPreferredLocation)}
          style={{
            backgroundColor: "#c4c9ce",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          <Link
            to="/preferred-location"
            style={{
              textDecoration: "none",
              color: "black",
              fontFamily: "Rubik",

              fontWeight: "bold",
            }}
          >
            Show Preferred Locations
          </Link>
        </button>
      </div>
    </div>
  );
}

export default App;
