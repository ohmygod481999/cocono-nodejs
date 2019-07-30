const express = require('express');
const router = express.Router();
const course_controller = require('../controllers/course.controller');
const isAuth = require('../middleware/auth.middleware');

router.get('/courses-management',isAuth.checkAdmin,function (req,res) {
    res.render('admin/courses-management');
});
router.get('/add-course',isAuth.checkAdmin,async function (req,res) {
    const categories = await course_controller.categories_list();
    res.render('admin/add-course',{categories: categories});
});
router.get('/edit-course/:id',isAuth.checkAdmin, async function (req,res) {
    try {
        const id = req.params.id;
        const course = await course_controller.course_detail(id);
        if (!course) res.send(500,'Khoa hoc khong ton tai');
        else
        res.render('admin/edit-course',{course: course});
    }
    catch (e) {
        res.send(500,'Khoa hoc khong ton tai');
    }
});

module.exports = router;