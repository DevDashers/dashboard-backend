'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const citySchema = new Schema({
    city: { type: String, required: true },
    lat: { type: String, required: true },
    lon: { type: String, required: true },
    email: { type: String }
});

const cityData = mongoose.model('cityData', citySchema);

module.exports = cityData;