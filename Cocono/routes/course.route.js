const express = require('express');
const router = express.Router();
const course_controller = require('../controllers/course.controller');

router.get('/',function (req,res) {
    res.render('courses');
});
router.get('/api', course_controller.course_list);
router.post('/api', course_controller.course_create);
router.get('/api/:id',course_controller.course_detail);
router.put('/api/:id',course_controller.course_update);
router.delete('/api/:id',course_controller.course_delete);
module.exports = router;
