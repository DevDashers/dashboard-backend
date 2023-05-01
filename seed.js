'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const ToDo = require('./models/todo.js');

async function seed() {
    // title: {type: String, required: true},
    // description: {type: String, required: true},
    // dueDate: {type: Date, required: false, default:Date.now},
    // completed: {type: Boolean, required: true, default: false}  

  await ToDo.create({
    title: 'Create backend code',
    completed: false
  });

  console.log('Task 1 was created');

  await ToDo.create({
    title: 'Create frontend code',
    completed: false
  });

  console.log('Task 2 was created');

  

  mongoose.disconnect();
}

seed();