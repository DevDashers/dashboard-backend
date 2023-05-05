'use strict';

const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.DB_URL);


const City = require('./models/city.js');

async function seed() {
  // title: {type: String, required: true},
  // description: {type: String, required: true},
  // dueDate: {type: Date, required: false, default:Date.now},
  // completed: {type: Boolean, required: true, default: false}
  // title: { type: String, required: true },
  // description: { type: String, required: false },
  // url: { type: String, required: true },

    // city: { type: String, required: true },
    // lat: { type: String, required: true },
    // lon: { type: String, required: true },
    // email: { type: String }

  await City.create({
    city: 'Saipan',
    lat: '15.1909825',
    lon: '145.746743003024',
    email: "dmada.edp@gmail.com"
  });

  console.log('City was added');

  // await ToDo.create({
  //   title: 'Create frontend code',
  //   completed: false
  // });

  // console.log('Task 2 was created');



  mongoose.disconnect();
}

seed();