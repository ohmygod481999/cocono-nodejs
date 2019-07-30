const express = require('express');
const router = express.Router();
const course_controller = require('../controllers/course.controller');
const auth = require('../middleware/auth.middleware');

router.get('/',async function (req,res) {
    const courses = await course_controller.course_list();
    // res.send(courses);
    res.render('course/courses',{courses : courses});
});
router.get('/:id',auth.checkLogin,async function (req,res) {
    const id = req.params.id;
    const course = await course_controller.course_detail(id);
    res.render('course/courses-single',{course: course});
});
router.get('/api', course_controller.course_list);
router.post('/api',auth.checkAdmin, course_controller.course_create);
router.get('/api/:id',auth.checkAdmin, course_controller.course_detail);
router.put('/api/:id',auth.checkAdmin,course_controller.course_update);
router.delete('/api/:id',auth.checkAdmin, course_controller.course_delete);
module.exports = router;
