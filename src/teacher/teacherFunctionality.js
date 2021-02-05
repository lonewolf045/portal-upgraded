import { createAssignment } from "../assignment";
import { assignmentDatabase, courseDatabase } from "../connectToFirebase";

const { createCourse } = require("../course");

const courseClose = document.querySelector('#courseClose');
const assignmentClose = document.querySelector('#assignmentClose');
const makeCourse = () => {
    const courseForm = document.forms["addCourse"];
    console.log(courseForm);
    let cName = courseForm["courseName"].value;
    let cCode = courseForm["courseCode"].value;
    let tCode = courseForm["teacherCode"].value;
    console.log(cName,cCode,tCode);
    createCourse(cName,cCode,tCode);
    courseClose.click();
}

const makeAssignment = () => {
    const assignForm = document.forms["addAssignment"];
    let detail = assignForm["assignmentDetail"].value;
    let dueDate = assignForm["dueDate"].value;
    console.log(detail,dueDate);
    createAssignment(detail,dueDate);
    assignmentClose.click();
}

const loadCourseList = () => {
    let courseData = [...courseDatabase];
    console.log(courseData);
    return courseData;
}

const loadAssignList = () => {
    let assignData = [...assignmentDatabase];
    console.log(assignData);
    return assignData;
}

export {makeCourse,loadCourseList,makeAssignment,loadAssignList};