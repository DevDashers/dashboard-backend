'use strict';

const mongoose = require('mongoose');

const {Schema} = mongoose;

const oneDay = 24 * 60 * 60 * 1000; // 1 day in miliseconds

const todoSchema = new Schema({
    task: {type: String, required: true},
    dueDate: {type: String, required: false},
    completed: {type: Boolean, required: true, default:false},
    email: {type: String}  
});

const ToDo = mongoose.model('todo', todoSchema);

module.exports = ToDo;