const express = require('express');

const app = express()
app.use(express.urlencoded({ extended: false }));

const userRoutes = require('./routes/userRoutes');

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(userRoutes)

app.listen(3002, () => {
    console.log('server is listening on 3002')
})