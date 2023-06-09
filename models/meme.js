'use strict';

const axios = require('axios');

async function getMeme(request, response, next) {
    try {
        let url = `https://meme-api.com/gimme/aww`;
        let memeData = await axios.get(url);
        let memeTitle = memeData.data.title;
        let memeURL = memeData.data.url;
        let memeAuthor = memeData.data.author;
        let memeArray = [memeTitle, memeAuthor, memeURL]
        response.status(200).send(memeArray)
    } catch (error) {
        next(error);
    }
}

module.exports = getMeme;