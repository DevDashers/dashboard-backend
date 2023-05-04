'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const ToDo = require('./models/todo.js');
const Resources = require('./models/resources.js');
const getMeme = require('./models/meme.js');
const verifyUser = require('./auth.js');

const app = express();
const { getWeatherData } = require('./models/weather');

// MIDDLEWARE
app.use(cors());
app.use(express.json());

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

app.use(verifyUser);

//get todo lists
app.get('/todo', async (request, response) => {
    try {
        const allTasks = await ToDo.find({ email: request.user.email });
        response.status(200).send(allTasks);
    } catch (error) {
        console.error(error);
        response.status(500).send('server error');
    }
});

//create todo list item
app.post('/todo', async (request, response) => {
    try {
        // console.log(request.user.email);
        const createdItem = await ToDo.create({ ...request.body, email: request.user.email });
        response.status(201).send(createdItem);
    } catch (error) {
        console.error(error);
        response.status(500).send('server error');
    }
});



app.delete('/todo/:taskID', async (request, response) => {

    try {
        let id = request.params.taskID;
        await ToDo.findByIdAndDelete(id);
        response.status(200).send(`Task with the ID of ${id} was deleted!`)
    } catch (error) {
        console.error(error);
        response.status(500).send('server error');
    }
});

app.put('/todo/:taskID', async (request, response) => {
    try {
        let id = request.params.taskID;
        let updatedTask = await ToDo.findByIdAndUpdate(id, { ...request.body, email: request.user.email }, { new: true, overwrite: true });
        response.status(200).send(updatedTask)
    } catch (error) {
        console.error(error);
        response.status(500).send('server error');
    }
});

//get resources
app.get('/resources', async (request, response) => {
    try {
        let getResources = await Resources.find({ email: request.user.email });
        response.status(200).send(getResources);
    } catch (error) {
        console.error(error);
        response.status(500).send('server error');
    }
});

//create resource item
app.post('/resources', async (request, response) => {
    try {
        let createdResource = await Resources.create({ ...request.body, email: request.user.email });
        response.status(201).send(createdResource);
    } catch (error) {
        console.error(error);
        response.status(500).send('server error');
    }
});

app.delete('/resources/:resourceId', async (request, response) => {
    try {
        let id = request.params.resourceId;
        await Resources.findByIdAndDelete(id);

        response.status(200).send(`Resource with the ID of ${id} was deleted!`)

    } catch (error) {
        console.error(error);
        response.status(500).send('server error');
    }
});

app.put('/resources/:resourceId', async (request, response) => {
    try {
        let id = request.params.resourceId;
        let updatedResource = await Resources.findByIdAndUpdate(id, { ...request.body, email: request.user.email }, { new: true, overwrite: true });
        response.status(200).send(updatedResource)
    } catch (error) {
        console.error(error);
        response.status(500).send('server error');
    }
})

app.get('/weather', (req, res, next) => {
    try {
        getWeatherData(res);
    } catch (error) {
        next(error)
    }
})

// Get Memes
app.get('/meme', getMeme)

// ERROR HANDLERS
app.get('*', (request, response) => {
    response.status(404).send('Not available');
});

app.use((error, request, response, next) => {
    console.log(error.message);
    response.status(500).send(error.message);
});
