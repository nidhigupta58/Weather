import React, { useState } from "react";
import axios from "axios";

function Weather() {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [weather, setWeather] = useState<any>("");

  const onSearch = () => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=7ac6e5a10e267853c1cc32cde1952fc6&query=${name}`
      )
      .then((res) => {
        console.log(res);
        setWeather(res.data);

        if (res.data.success == false) {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 3000);
        } else {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 3000);
        }
      })
      .catch((err) => {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };

  const onCancel = () => {
    setName("");
    setWeather(undefined);
  };
  return (
    <>
      {success && (
        <div
          id="toast-success"
          style={{ position: "absolute", right: "0px" }}
          className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="ml-3 text-sm font-normal">
            fetch weather successfully
          </div>
        </div>
      )}
      {error && (
        <div
          id="toast-danger"
          style={{ position: "absolute", right: "0px" }}
          className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="ml-3 text-sm font-normal">Something went wrong</div>
        </div>
      )}
      <form className="w-full max-w-sm">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Enter City Name"
            aria-label="Full name"
          />
          <button
            onClick={(e) => onSearch()}
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-green py-1 px-2 rounded"
            type="button"
          >
            Search
          </button>
          <button
            onClick={(e) => onCancel()}
            className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
      {weather && weather.current && (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img
            className="w-full"
            src={weather.current?.weather_icons[0]}
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              {weather.current?.weather_descriptions[0]}
            </div>
            <div className="font-bold text-xl mb-2">
              Temperature: {weather.current?.temperature} &deg;c
            </div>
            <div className="font-bold text-xl mb-2">
              Wind Speed: {weather.current?.wind_speed}{" "}
            </div>
            <div className="font-bold text-xl mb-2">
              Humidity: {weather.current?.humidity}{" "}
            </div>
            <div className="font-bold text-xl mb-2">
              Location: {weather.location?.name}, {weather.location?.country}{" "}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Weather;
