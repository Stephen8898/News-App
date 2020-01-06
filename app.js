const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const news = require('./routes/newapi');
const app = express();



dotenv.config();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(cors());

//routes
app.use('/api', news);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`app listening on ${PORT}`);
});