const Course = require('../models/course.model');
const Trainer = require('../models/trainer.model');
const Category = require('../models/category.model');


const ITEMS_PER_PAGE = 6;

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

module.exports.renderListCourse = async function (req,res) {
    let pageNumber = req.query.page;
    if (!pageNumber) pageNumber = 1;

    const totalCourse = await Course.countDocuments();
    const totalPage = Math.ceil((totalCourse/ITEMS_PER_PAGE * 10) / 10 );
    console.log('count: ',totalCourse);

    const courses = await Course.find({})
        .skip((pageNumber-1)*ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .populate('trainer','name email phone-number')
        .populate('category','name');
    // res.send(courses);
    res.render('course/courses',{
        courses : courses,
        totalCourse : totalCourse,
        currentPage : pageNumber,
        totalPage : totalPage,
        hasNextPage : pageNumber < totalPage,
        hasPreviousPage : pageNumber > 1,
    });
};

module.exports.getCoursePage = async function (req,res) {
    let pageNumber = req.params.page;
    if (!pageNumber) pageNumber = 1;

    const totalCourse = await Course.countDocuments();
    const totalPage = Math.ceil((totalCourse/ITEMS_PER_PAGE * 10) / 10 );
    console.log('count: ',totalCourse);

    const courses = await Course.find({})
        .skip((pageNumber-1)*ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .populate('trainer','name email phone-number')
        .populate('category','name');
    // res.send(courses);
    res.status(200).json({
        courses : courses,
        totalCourse : totalCourse,
        currentPage : pageNumber,
        totalPage : totalPage,
        hasNextPage : pageNumber < totalPage,
        hasPreviousPage : pageNumber > 1,
    })
};

module.exports.categories_list = function () {
    return Category.find({})
};