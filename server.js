const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');



//routes
const apiInspectionRoutes = require('./routes/inspection');


//controllers
const pageNotFound = require('./controllers/404')

//express
const app = express();

//DATABASE and ODM
const mongoURL='mongodb+srv://ramykhayat:pt4fCNBaQiJ6apQ@cluster0-jzwd9.mongodb.net/health_safety?retryWrites=true'

const mongoose = require('mongoose');

//adding the body parser 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//adding the public path for static serving
app.use(express.static(path.join(__dirname, 'public')))
//adding template engine
app.set('view engine', 'ejs');
app.set('views', 'views');
//application routes

//todo
//app.use(adminRoutes) 

app.use('/api/v1/inspections', apiInspectionRoutes.routes);

//404 route, the catch all route if nothing matches
app.use(pageNotFound.pageNotFound)


mongoose.connect(mongoURL, { useNewUrlParser: true })
    .then((res) => {
        app.listen(8000);
        console.log("App running on port 8000")
    })
    .catch((err) => console.log(err,"Problem connecting to cluster"))