const Course = require('../models/course.model');

module.exports.course_create = function (req,res){
    let course = new Course({
        name : req.body.name,
        price : req.body.price
    });

    course.save(function (err,next) {
        if (err){
            return next(err);
        }
        res.send('Product create successfully');
    })
};

module.exports.course_detail = function (req,res,next){
    Course.findById(req.params.id, function (err, course) {
        if (err) return next(err);
        res.send(course);
    })
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


module.exports.course_list = function (req,res,next) {
    Course.find({},function (err,courses) {
        if (err) return next(err);
        res.send(courses);
    })
};