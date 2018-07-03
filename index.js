const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Bear = require('./app/models/bear');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://adarsh:sample12345@ds125331.mlab.com:25331/restful-api');

const PORT = process.env.port || 8000;

const router = express.Router();

router.use((request, response, next) => {
    console.log('Request Received');
    next();
});

router.get('/', (request, response) => response.json('Welcome to our API!'));

app.use('/api', router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
