'use strict';
let axios = require('axios');

let cache = {};

const cacheData = async (response, key, apiUrl, dataPath, Constructor, daysCached) => {
  let milliseconds  = daysCached * 24 * 60 * 60 * 1000;

  if (cache[key] && (Date.now() - cache[key].timestamp) < milliseconds) {
    let date = new Date(cache[key].timestamp);
    let formattedDate = date.toString();
    response.status(200).send([cache[key].data, formattedDate]);

  } else {
    let dataFromApi = await axios.get(apiUrl);
    let dataToSend = dataFromApi.data[dataPath].map(obj => new Constructor(obj));

    cache[key] ={
      data: dataToSend,
      timestamp: Date.now(),
    };

    let date = new Date(cache[key].timestamp);
    let formattedDate = date.toLocaleString();

    response.status(200).send([cache[key].data, formattedDate]);
  }
};

module.exports = { cacheData };
