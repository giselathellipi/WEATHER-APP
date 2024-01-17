import React from "react";
import "./ForecastWeather.css";
import { Accordion, AccordionItem } from "react-accessible-accordion";

const ForecastWeather = ({ data }) => {
  const Week_DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const dayInAWeek = new Date().getDay();

  const forecastDays = Week_DAYS.slice(dayInAWeek, Week_DAYS.length).concat(
    Week_DAYS.slice(0, dayInAWeek)
  );
  console.log(data);
  return (
    <Accordion allowZeroExpanded>
      {data.list.slice(0, 4).map((item, idx) => {
        const forecastDayIndex = (dayInAWeek + idx) % 7;
        const forecastDay = forecastDays[forecastDayIndex];

        return (
          <AccordionItem key={idx}>
            <div className="forecast-weather-content-holder">
              <p
                style={{
                  textAlign: "center",
                  color: "rgb(147, 153, 162)",
                  fontFamily: "Rubik",
                  fontSize: "14px",
                  padding: "15px",
                }}
              >
                {item.weather[0].main.toUpperCase()}
              </p>

              <div style={{ display: "flex" }}>
                <div className="container-weather">
                  <div className="day-name">{forecastDay}</div>
                  <div className="icon-content-holder">
                    <img
                      alt="icon"
                      src={item.weather[0].iconUrl}
                      className="forecast-icons"
                    />
                  </div>
                </div>
                <div className="desc-content-holder">
                  <div className="weather-description">
                    {item.weather[0].description.charAt(0).toUpperCase() +
                      item.weather[0].description.slice(1)}
                  </div>
                  <div className="temp">
                    {Math.round(item.main.temp_max)}/
                    {Math.round(item.main.temp_min)} °C
                  </div>
                </div>
              </div>
            </div>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default ForecastWeather;
