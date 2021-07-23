//Imports
const express = require('express');
const app = express();
const Restaurant = require('./models/restaurant')
const cors = require('cors')

//Configurations
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

//Controllers
const restaurantController = require('./controllers/restaurant');
const userController = require('./controllers/user');
app.use('/restaurants', restaurantController);
app.use('/users', userController);

//Ports
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Port happening on ${port}`)
});