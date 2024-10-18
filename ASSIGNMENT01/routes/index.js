var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/portfolio', async(req, res, next) => {
  res.render('portfolio/index', { title: 'Portfolio' });
});

router.get('/portfolio/about', async(req, res, next) => {
  res.render('portfolio/about', { title: 'ABOUT' });
});

router.get('/portfolio/services', async(req, res, next) => {
  res.render('portfolio/services', { title: 'ABOUT' });
});

router.get('/portfolio/contact', async(req, res, next) => {
  res.render('portfolio/contact', { title: 'CONTACT' });
});

router.get('/portfolio/projects', async(req, res, next) => {
  res.render('portfolio/projects', { title: 'PROJECTS' });
});


module.exports = router;
