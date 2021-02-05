const sql = require("./db.js");

const Student = function(student) {
    this.enroll = student.enroll;
    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.bdate = student.bdate;
    this.deptcode = student.deptcode;
    this.batch = student.batch;
    this.deg_code = student.deg_code;
}

Student.create = (newStudent , result) => {
    sql.query("INSERT INTO students SET ?",newStudent,(err,res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created customer: ", {...newStudent });
    result(null, { ...newStudent });
    });
};

Student.selectAll = (result) => {
    sql.query("select * from students",(err,res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("students: ", res);
        result(null, res);
    })
}

module.exports = Student;