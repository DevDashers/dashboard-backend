'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const ToDo = require('./models/todo.js');
const Resources = require('./models/resources.js');
const getMeme = require('./models/meme.js');

const app = express();

// MIDDLEWARE
app.use(cors());

// Port connection
const PORT = process.env.PORT || process.env.PORT2;

app.listen(PORT, () => console.log(`listening on ${PORT}`));

mongoose.connect(process.env.DB_URL);

// *** BELOW CODE FOR TROUBLESHOOTING MongoDB IN TERMINAL ***
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Mongoose is connected');
});

app.get('/', (request, response) => {
    response.status(200).send('Welcome to DevDashers')
});

app.get('/test', (request, response) => {
    response.send('Test request received!')
});

//get todo lists
app.get('/todo', async(request, response,next) => {
    try {
        let allTasks = await ToDo.find({});
        response.status(200).send(allTasks);
    } catch (error) {
        next(error);
    }
})

//create todo list item
app.post('/todo', async(request, response, next) => {
    try {
        let todoItem = request.body;
        let createdItem = await ToDo.create(todoItem);

        response.status(201).send(createdItem);
    } catch (error) {
        next(error)
    }
});

app.delete('/todo/:taskId', async(request, response, next) => {
    try {
        let id = request.params.taskId;
        await ToDo.findByIdAndDelete(id);

        response.status(200).send(`Task with the ID of ${id} was deleted!`)
        
    } catch (error) {
        next(error)
    }
});

app.put('/todo/:taskID', async (request, response, next)=>{
    try {
        let id = request.params.taskId;
        let todoData = request.body;

        let updatedTask = await ToDo.findByIdAndUpdate(id, todoData);

        response.status(200).send(updatedTask)
    } catch (error) {
        next(error)
    }
})

//get resources

app.get('/resources', async(request, response,next) => {
    try {
        let getResources = await Resources.find({});
        response.status(200).send(getResources);
    } catch (error) {
        next(error);
    }
})

//create resource item

app.post('/resources', async(request, response, next) => {
    try {
        let resourceItem = request.body;
        let createdResource = await Resources.create(resourceItem);

        response.status(201).send(createdResource);
    } catch (error) {
        next(error)
    }
});

app.delete('/resources/:resourceId', async(request, response, next) => {
    try {
        let id = request.params.resourceId;
        await Resources.findByIdAndDelete(id);

        response.status(200).send(`Resource with the ID of ${id} was deleted!`)
        
    } catch (error) {
        next(error)
    }
});

// Get Memes
app.get('/meme', getMeme)

app.get('*', (request, response) => {
    response.status(404).send('Not available');
});

app.use((error, request, response, next) => {
    console.log(error.message);
    response.status(500).send(error.message);
});

