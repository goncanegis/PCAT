const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// connect db
mongoose.connect('mongodb://localhost/pcat-test-db');

// create schema
const PhotosSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotosSchema);

// create a photo
// Photo.create({
//   title: 'Photo Title 1',
//   description: 'Photo Description 1',
// });

// ------------ //

// read a photo
// Photo.find({}, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// ------------ //

// update photo
// const id = '62e78be52fa11a1a91b63f8a';

// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: 'Photo Title 1 updated again',
//   },
//   { new: true },
//   (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//     }
//   }
// );

// ------------ //

// delete photo
const id = '62e78be52fa11a1a91b63f8a';
Photo.findByIdAndDelete(id, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Item deleted:', data);
  }
});
