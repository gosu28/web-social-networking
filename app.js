const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser=require('cookie-parser')
const usersRoutes = require('./routes/api/users');
const postRouters = require('./routes/api/posts');
const authRouters = require('./routes/api/auth');

const path=require('path')
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname,'public')))
app.use(express.json({ extended: true }));
app.use(cookieParser());

app.use(compression());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use('/api/v1', postRouters);
app.use('/api/v1', authRouters);
app.use('/api/v1/users',usersRoutes);
module.exports = app;