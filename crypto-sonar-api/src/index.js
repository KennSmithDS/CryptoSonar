require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const server = async () => {
    
    const app = express();
    const port = process.env.API_SERVER_PORT;

    app.listen({port}, () => {
        console.log(`Server connected and listening on ${port}`);
    })

}

server();