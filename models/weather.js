'use strict';

let { cacheData } = require('../cache');

class Weather {
  constructor(weatherObj) {
    this.city = weatherObj.city_name;
    this.date = weatherObj.ob_time;
    this.description = weatherObj.weather.description;
    this.icon = weatherObj.weather.icon;
    this.iconPath = `https://cdn.weatherbit.io/static/img/icons/${weatherObj.weather.icon}.png`;
    this.feelsLike = weatherObj.app_temp;
    this.temp = weatherObj.temp;
  }
}

const getWeatherData = async (request, response) => {
  let lon = request.query.lon;
  let lat = request.query.lat;
  const key = `weather-lat${lat}-lon${lon}`;
  const url = `http://api.weatherbit.io/v2.0/current?key=${process.env.REACT_APP_WEATHERBIT_API_KEY}&lang=en&lat=${lat}&lon=${lon}&units=I`;
  cacheData(response, key, url, 'data', Weather, 0.5);

};



module.exports = { getWeatherData };

