import axios from "axios";
import React, { useState } from "react";

function HistoricalWeather() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<any>("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const onSearch = () => {
    console.log(name, date);
    axios
      .get(
        `http://api.weatherstack.com/historical?access_key=7ac6e5a10e267853c1cc32cde1952fc6&query=${name}&historical_date=${date}&hourly=1`
      )
      .then((res) => {
        console.log(res);
        setWeather(res.data);
        if (res.data.success == false) {
          setError(true);
          setErrorMsg(res.data.error.info);
          setTimeout(() => {
            setError(false);
          }, 3000);
        }
      })
      .catch((e) => {});
  };
  return (
    <>
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
          <div className="ml-3 text-sm font-normal">{errorMsg}</div>
        </div>
      )}
      <form className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              City
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Date
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="date"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3"></div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              onClick={(e) => onSearch()}
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default HistoricalWeather;
