const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
require('dotenv').config();
const path = require('path');

const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageController');

const app = express();

// connect db
mongoose
  .connect(
    `mongodb+srv://${process.env.USER_ID}:${process.env.USER_KEY}@cluster0.cqnchgx.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((err) => console.log(err));

// Template engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// Routes
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.post('/photos', photoController.createPhoto);
app.get('/photos/edit/:id', pageController.getEditPage);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
