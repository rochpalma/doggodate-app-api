require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');
const dogsRouter = require('./dogs/dogs-router');
const eventsRouter = require('./events/events-router');
const commentsRouter = require('./comments/comments-router');
const imagesRouter = require('./users/images-route');

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());


app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/dogs', dogsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/profile', imagesRouter);

app.get('/', (req, res) => {
    res.send('Hello, Doggodate User!')
})

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})



module.exports = app;