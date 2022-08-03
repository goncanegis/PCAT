const path = require('path');
const fs = require('fs');
const Photo = require('../models/Photo');

exports.getAllPhotos = async (req, res) => {
  const page = req.query.page || 1;
  const photosPerPage = 2;
  const totalPhotos = await Photo.countDocuments();
  const photos = await Photo.find({})
    .sort('-dateCreated')
    .skip((page - 1) * photosPerPage)
    .limit(photosPerPage);
  const totalPages = Math.ceil(totalPhotos / photosPerPage);

  res.render('index', { photos, current: page, totalPages });
};

exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', { photo });
};

exports.createPhoto = async (req, res) => {
  const uploadDir = path.join(__dirname, '..', 'public/uploads');

  if (fs.existsSync(uploadDir) === false) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = path.join(
    __dirname,
    '..',
    'public/uploads/',
    uploadedImage.name
  );

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  await photo.save();
  res.redirect(`/photos/${req.params.id}`);
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findByIdAndDelete(req.params.id);
  let deletedImage = path.join(__dirname, '..', 'public', photo.image);
  fs.unlinkSync(deletedImage);
  res.redirect('/');
};
