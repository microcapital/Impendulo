var express = require('express');
var router = express.Router();
const { postMethod, story, getMethod } = require('../controllers/index.js')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/0');
});

// To stop returning favicon for Post
router.get('/favicon.ico', (req, res) => {
  return 'your faveicon'
})

// get url by id
router.get('/:id', getMethod);

// Post form - add the element 
router.post('/:id', postMethod);

module.exports = router;



