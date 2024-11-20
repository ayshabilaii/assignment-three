var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
/* GET products page. */
router.get('/collection', function(req, res, next) {
  res.render('collection', { title: 'Collection' });
});
/* GET service page. */
router.get('/service', function(req, res, next) {
  res.render('index', { title: 'Shoes' });
});
/* GET contactus page. */
router.get('/contactus', function(req, res, next) {
  res.render('contactus', { title: 'Contact Us' });
});

module.exports = router;
