const courseModel = require('../model/courseModel');

module.exports.createCourse = function(req,res){
    var course = new courseModel(req.body);
    console.log(req.body);
    course.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
}

module.exports.getAllCourses = function(req,res){
    var query ={isDeleted:false};
    courseModel.find(query,function(err,courseobjarr){
        if(err){
            res.json({error:err});
        }
        else{
          res.json(courseobjarr);
        }

    })
};

module.exports.updateCourse = function(req, res){
    courseModel.updateOne({_id:req.params.courseid}, req.body, (err, itemDetails) => {
        if (err) console.log('ERROR: ' + err);
        res.json(itemDetails);
    });
}

module.exports.deleteCourse = function(req, res){
    courseModel.updateOne({_id:req.params.courseid}, req.body, (err, itemDetails) => {
        if (err) console.log('ERROR: ' + err);
        res.json(itemDetails);
    });
}
