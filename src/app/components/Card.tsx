"use client";

import { useState, useEffect } from "react";

const apiKey = "caa074a6065043a42af08c2246836d08";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
}

const Card = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const getWeather = async () => {
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
    const url = `${baseUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Unable to fetch weather data");
      }

      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error(error);
      setWeatherData(null);
    }
  };

  return (
    <div className={`h-screen w-screen flex justify-center items-center `}>
      <div className="flex gap-3 flex-col w-[300px] h-[380px] p-1 bg-opacity-50 rounded-sm bg-slate-950 text-white">
        <h1 className="text-center text-xl p-2">Weather App</h1>
        <div className="flex gap-3">
          <input
            type="text"
            value={city}
            placeholder="City Name"
            className=" px-3 w-[200px] bg-opacity-50 bg-slate-950 border-none rounded-xl outline-none p-1"
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>Search</button>
        </div>

        {weatherData ? (
          <div className="flex gap-10 mt-8 items-center justify-center flex-wrap">
            <p>
              Temperature:{" "}
              <span className="font-bold text-blue-400">
                {Math.round(weatherData.main.temp - 273.15)}°C
              </span>
            </p>
            <p>
              Humidity:{" "}
              <span className="font-bold text-blue-400">
                {weatherData.main.humidity}%
              </span>
            </p>
            <p>
              Description:{" "}
              <span className="font-bold text-blue-400">
                {weatherData.weather[0].description}
              </span>
            </p>
          </div>
        ) : (
          <p>No weather data available.</p>
        )}
      </div>
    </div>
  );
};

export default Card;
