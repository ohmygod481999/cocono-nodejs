const express = require('express');
const router = express.Router();
const course_controller = require('../controllers/course.controller');

/* GET home page. */
router.get('/', function (req,res) {
    console.log(req.session.uname);
    res.render('index/index',{uname : req.session.uname, title : 'Cocono'});
});
router.get('/index/:id', function (req,res) {
    console.log(req.session.uname);
    res.render('index/index-'+req.params.id,{uname : req.session.uname, title : 'Cocono'});
});
module.exports = router;
