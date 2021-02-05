const { returnReference, db, returnCourseKey, importAssignments } = require("./connectToFirebase");
import {user,course} from './index';
//const { course } = require("./teacherLoginPage");

const assigment = (assignmentDetails,dueDate) => {
    return {assignmentDetails,dueDate};
}

const createAssignment = (assignmentDetails,dueDate) => {
    let newAssignment = assigment(assignmentDetails,dueDate);
    console.log('Attack');
    console.log(user,course);
    let returnCourseRef = returnCourseKey(user,course);
    let returnRef = returnReference(user);
    db.ref().child('Teachers/'+returnRef+'/Courses/'+returnCourseRef+'/Assignments').push().set(newAssignment);
    importAssignments(user,course);
}

export {createAssignment};