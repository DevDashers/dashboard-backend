'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;


const resourceSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: false},
  url: {type: String, required: true},
  email: String
})

const Resources = mongoose.model('resources', resourceSchema);

module.exports = Resources;