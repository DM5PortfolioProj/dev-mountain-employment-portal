var StudentPortf = require('../models/studentPortf');
var User = require('../models/userSchema');


CustomLogger = function() {
    this.active = true;
}


CustomLogger.prototype.deactivate = function() {
    this.active = false;
}
CustomLogger.prototype.activate = function() {
    this.active = true;
}
CustomLogger.prototype.log = function() {
    if (this.active) {
        console.log(arguments[0], arguments[1]);
    }
}
var myLog = new CustomLogger();
// uncomment next line to turn console logs on
// myLog.deactivate();
module.exports = {
     create: function(req, res) {
    console.log('this is studentPortf req', req.body);
    var newstudentPortf = new StudentPortf(req.body);
    newstudentPortf.save(function(err, result) {
      if (err) return res.status(500).send(err);
      res.send(result)
      console.log('this is studentPortf send result', result);
    });
  },
  read: function(req, res) {
    StudentPortf.find(req.query)
      /*.populate(
        'cohort.cohortName cohort.cohortLocation cohort.className projects skills'
      )*/
      .exec(function(err, result) {
        console.log('this is studentPortf read result STCRtl', result);
        if (err) return res.status(500).send(err);
        res.send(result);
      });
  },

    getStudentById: function(req, res) {
        User.findById({
            _id: req.params.id
        })
        .exec(function(err, result) {
            if (err) return res.status(500).send(err);
            var studentPortfolio = {};
            var userId = result._id;
            myLog.log('this is userId', userId);

            StudentPortf.findOne({
                    loginInfo: userId
                })
                //.populate('cohort.cohortName cohort.cohortLocation cohort.className skills')
                .exec(function(err, result) {
                    studentPortfolio.studentPortf = result;
                    res.send(studentPortfolio);
                })
        })
    },

    update: function(req, res) {
        StudentPortf.findOneAndUpdate({
                loginInfo: req.params.id
            }, {
                $set: req.body
            }, {
                upsert: true
            },
            function(err, result) {
                if (err) {
                    myLog.log("\n\n\n\nThere was an erro :-[", err);
                    myLog.log("\n\n\n\n\n");
                } else {
                    myLog.log("\n\n\n\n\nYESSSS!", result);
                    myLog.log("\n\n\n\n\n");
                }
                res.send(result);
            });
    },

    delete: function(req, res) {
        StudentPortf.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) return res.status(500).send(err);
            res.send(result);
        });
    }

    //end module.exports
}