const Student = require("../models/student.model");

exports.create = (req,res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    console.log(req);

    const student = new Student({
        enroll : req.body.enroll,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        bdate : req.body.bdate,
        deptcode : req.body.deptcode,
        batch : req.body.batch,
        deg_code : req.body.deg_code
    });
    
    Student.create(student,(err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Customer."
          });
        else res.send(data);
      });
}

exports.findAll = (req,res) => {
  Student.selectAll((err,data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  })
}