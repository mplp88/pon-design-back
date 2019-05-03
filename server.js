const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8081

const mailer = require('./mailer');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send('api is running');
})

app.use('/Mailer', mailer);

app.listen(port, () => {
    console.log('App is running in: http://localhost:'+port);
})