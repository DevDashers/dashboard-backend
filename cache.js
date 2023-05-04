'use strict';
let axios = require('axios');

let cache = {};

const cacheData = async (response, key, apiUrl, Constructor, daysCached) => {
  let milliseconds  = daysCached * 24 * 60 * 60 * 1000;

  if (cache[key] && (Date.now() - cache[key].timestamp) < milliseconds) {
    // console.log('Cache hit', cache);
    let date = new Date(cache[key].timestamp);
    let formattedDate = date.toString();
    response.status(200).send([cache[key].data, formattedDate]);

  } else {

    // console.log('Cache miss', cache);


    let dataFromApi = await axios.get(apiUrl);
    let dataToSend = new Constructor(dataFromApi.data);
    
    // console.log('dataFromApi', dataFromApi);
    // console.log('dataToSend', dataToSend);


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