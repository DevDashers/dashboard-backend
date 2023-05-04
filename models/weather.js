'use strict';

let { cacheData } = require('../cache');

class Weather {
    constructor(weatherObj) {
        console.log(weatherObj)
        this.city = weatherObj.location.name;
        this.description = weatherObj.current.condition.text;
        this.icons = weatherObj.current.condition.icon;
        this.feelsLikeF = weatherObj.current.feelslike_f;
        this.tempF = weatherObj.current.temp_f;
        this.lastUpdated = weatherObj.current.last_updated;
    }
}

const getWeatherData = async (response, request, next) => {
    try {
        const currentDate = new Date().toISOString().slice(0, 10);
        let key = `weather-${currentDate}`;
        const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API}&q=auto:ip`;

        //response, key, apiUrl, Constructor, daysCached
        cacheData(response, key, url, Weather, 1);

    } catch (error) {
        // next(error);
        next('>>>', error);
    }

};

module.exports = { getWeatherData };
