const express = require('express');
const mongoose = require('mongoose');
let mainRouter = require('./routes/mainRouter');
let loginRouter = require('./routes/loginRouter');
let deleteRouter = require('./routes/deleteRouter');
let updateRouter = require('./routes/update');
let mailSenderRouter = require('./routes/mailSenderRouter');




mongoose.connect('mongodb://localhost:27017/rest2', {useNewUrlParser: true});
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
    next();
});



app.use('/', mainRouter);
app.use('/login', loginRouter);
app.use('/delete', deleteRouter);
app.use('/update', updateRouter);
app.use('/mailSend', mailSenderRouter);



app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(3001, (err)=>{
    console.log('LISTENING jwt!');
});
