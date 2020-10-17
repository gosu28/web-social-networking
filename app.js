const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const usersRoutes = require('./routes/api/users');
const postRouters = require('./routes/api/posts');
const authRouters = require('./routes/api/auth');
const path=require('path')
const app = express();
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json({ extended: false }));

app.use(compression());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use('/api/v1', postRouters);
app.use('/api/v1', authRouters);
app.use('/api/v1/users',usersRoutes);
module.exports = app;