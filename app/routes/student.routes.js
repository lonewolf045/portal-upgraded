module.exports = app => {
    const student = require("../controllers/student.controller");
    app.post("/students",student.create);
    app.get("/students",student.findAll);
}