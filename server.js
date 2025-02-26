require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.once('open', () => console.log('Connected to database'));
db.on('error', (error) => console.error('co nnection error', error));

app.use(express.json())

const subscriberRouter = require('./routes/subscribers')
app.use('/subscribers', subscriberRouter)

app.listen(3000, () => console.log('Server started'));
