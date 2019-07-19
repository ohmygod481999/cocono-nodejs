const express = require('express');
const router = express.Router();
const course_controller = require('../controllers/course.controller');

/* GET home page. */
router.get('/', function (req,res) {
    res.render('index',{title : 'Express'});
});

module.exports = router;
