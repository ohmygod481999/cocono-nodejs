const Course = require('../models/course.model');
const Trainer = require('../models/trainer.model');
const Category = require('../models/category.model');

module.exports.course_create = function (req,res){
    let course = new Course({
        name: req.body.name,
        price: req.body.price,
        duration : req.body.duration,
        students : req.body.students,
        lectures : req.body.lectures,
        overview : req.body.overview,
        requirement : req.body.requirement,
        category: req.body.category
    });

    course.save(function (err,next) {
        if (err){
            return res.send(err);
        }
        res.send('Product create successfully');
    })
};

module.exports.course_detail = function (id){
    return Course.findById(id)
        .populate('category','name')
};

module.exports.course_update = function (req,res,next) {
    Course.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, course) {
        if (err) return next(err);
        res.send('Course updated!');
    });
};

module.exports.course_delete = function (req,res,next) {
    Course.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Delete Successfully');
    });
};


module.exports.course_list = function () {
    return Course.find({})
        .populate('trainer','name email phone-number')
        .populate('category','name')
};

module.exports.categories_list = function () {
    return Category.find({})
};