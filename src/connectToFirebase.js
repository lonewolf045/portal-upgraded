import { user,course, adminDept, adminDeg, adminBatch } from "./index";
import { importFail, importSuccess, loader } from "./randomFeatures";
import { updatePwd } from "./session";
import { loadCSVToDataStudent } from "./student/student";
import { loadCSVToDataTeacher } from "./teacher/teacher";

var firebaseConfig = {
    apiKey: "AIzaSyDI7nXtkFGzhjnvqfPuHm6xIAJoebeK1tA",
    authDomain: "omega-portal-du.firebaseapp.com",
    databaseURL: "https://omega-portal-du.firebaseio.com",
    projectId: "omega-portal-du",
    storageBucket: "omega-portal-du.appspot.com",
    messagingSenderId: "654265063936",
    appId: "1:654265063936:web:ab123649861c035f7d96e5",
    measurementId: "G-JJT6FHL7GK"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
let storageService = firebase.storage();
let storageRef = storageService.ref();
let db = firebase.database();
let dataRefUsers = db.ref().child('users');
let dataRefStudents = db.ref().child('Students');
let dataRefTeachers = db.ref().child('Teachers');
let dataRefCourses = db.ref().child('Courses');
let dataRefGroups = db.ref().child('Groups');
let dataRefDepartments = db.ref().child('Departments');
let userDatabaseData = "";
let userDatabase = [];
let studentDatabase = [];
let studentDatabaseData = "";
let teacherDatabase = [];
let teacherDatabaseData = "";
let courseDatabase = [];
let courseDatabaseData = "";
let groupDatabase = [];
let groupDatabaseData = "";
let particularGroupDatabase = [];
let particularGroupDatabaseData = "";
let assignmentDatabase = [];
let assignmentDatabaseData = "";
let departmentDatabase = [];
let departmentDatabaseData = "";
let degreeDatabase = [];
let degreeDatabaseData = "";
let batchDegreeDatabase = [];
let batchDegreeDatabaseData = "";

const onDataUser = (snapshot) => {
  userDatabaseData = snapshot.val();
  //console.log(snapshot.val());
  userDatabase = Object.values(userDatabaseData);
  //console.log(userDatabase);
}

const onErrorUser = () => {
  userDatabaseData = "";
  userDatabase = [];
}

const onDataStudent = (snapshot) => {
  studentDatabaseData = snapshot.val();
  //console.log(snapshot.val());
  studentDatabase = Object.values(studentDatabaseData);
  //console.log(studentDatabase);
}

const onErrorStudent = () => {
  studentDatabaseData = "";
  studentDatabase = [];
}

const onDataTeacher = (snapshot) => {
  teacherDatabaseData = snapshot.val();
  //console.log(snapshot.val());
  teacherDatabase = Object.values(teacherDatabaseData);
  //console.log(teacherDatabase);
}

const onErrorTeacher = () => {
  teacherDatabaseData = "";
  teacherDatabase = [];
}

const onDataCourses = (snapshot) => {
  courseDatabaseData = snapshot.val();
    //console.log(snapshot.val());
    courseDatabase = Object.values(courseDatabaseData);
    //console.log(courseDatabase);
}

const onErrorCourses = () => {
  courseDatabaseData = "";
  courseDatabase = [];
}

const onDataGroups = (snapshot) => {
  groupDatabaseData = snapshot.val();
    //console.log(snapshot.val());
    groupDatabase = Object.values(groupDatabaseData);
    //console.log(groupDatabase);
}

const onErrorGroups = () => {
  particularGroupDatabaseData = "";
  particularGroupDatabase = [];
  console.log('Error');
}

const onDataParticularGroups = (snapshot) => {
  particularGroupDatabaseData = snapshot.val();
    console.log(snapshot.val());
  particularGroupDatabase = Object.values(particularGroupDatabaseData);
    //console.log(groupDatabase);
}

const onErrorParticularGroups = () => {
  particularGroupDatabaseData = "";
  particularGroupDatabase = [];
}

const onDataAssignment = (snapshot) => {
  assignmentDatabaseData = snapshot.val();
    console.log(snapshot.val());
    assignmentDatabase = Object.values(assignmentDatabaseData);
    console.log(assignmentDatabase);
}

const onErrorAssignment = () => {
  assignmentDatabaseData = "";
  assignmentDatabase = [];
}

const onDataDepartment = (snapshot) => {
  departmentDatabaseData = snapshot.val();
  console.log(snapshot.val());
  departmentDatabase = Object.values(departmentDatabaseData);
  console.log(departmentDatabase);
}

const onErrorDepartment = () => {
  departmentDatabaseData = "";
  departmentDatabase = [];
}

const onDataDegree = (snapshot) => {
  degreeDatabaseData = snapshot.val();
  console.log(snapshot.val());
  degreeDatabase = Object.values(degreeDatabaseData);
  console.log(departmentDatabase);
}

const onErrorDegree = () => {
  degreeDatabaseData = "";
  degreeDatabase = [];
}

const onDataBatchesDegree = (snapshot) => {
  batchDegreeDatabaseData = snapshot.val();
  console.log(snapshot.val());
  batchDegreeDatabase = Object.values(batchDegreeDatabaseData);
  console.log(batchDegreeDatabase);
}

const onErrorBatchesDegree = () => {
  batchDegreeDatabaseData = "";
  batchDegreeDatabase = [];
}

const getData = (ref) => {
  return new Promise((resolve, reject) => {
    const onError = error => reject(error);
    const onData = snap => resolve(snap);

    ref.on("value", onData, onError);
  });
};
const importUsers = () => {
  //dataRefUsers.on("value", function (snapshot) {
  return getData(dataRefUsers).then(onDataUser).catch(onErrorUser);
}
const importStudents = () => {
  let ref = dataRefStudents;
  return getData(ref).then(onDataStudent).catch(onErrorStudent);
}
const importTeachers = () => {
  return getData(dataRefTeachers).then(onDataTeacher).catch(onErrorTeacher);
}
const importCourses = () => {
  return getData(dataRefCourses).then(onDataCourses).catch(onErrorCourses);
}
const importGroups = () => {
  return getData(dataRefGroups).then(onDataGroups).catch(onErrorGroups);
}

const importParticularGroups = (groupCode) => {
  console.log('Importing',groupCode);
  return getData(db.ref().child(groupCode)).then(onDataParticularGroups).catch(onErrorParticularGroups);
}

const importAssignments = (uname,cname) => {
  let ref = returnReference(uname);
  let ref2 = returnCourseKey(uname,cname);
  let dataRefAssignments = db.ref().child('Teachers/' + ref + '/Courses/'+ref2+'/Assignments');
  return getData(dataRefAssignments).then(onDataAssignment).catch(onErrorAssignment);
}

const importDepartment = () => {
  return getData(dataRefDepartments).then(onDataDepartment).catch(onErrorDepartment);
}

const importDegree = (deptCode) => {
  let ref = db.ref().child('Departments/'+deptCode+'/Degrees');
  return getData(ref).then(onDataDegree).catch(onErrorDegree);
}

const importDegreeBatches = (deptCode,degCode) => {
  let code = degCode.split(".").join("");
  let ref = db.ref().child('Departments/'+deptCode+'/Degrees/'+code+'/Batches');
  return getData(ref).then(onDataBatchesDegree).catch(onErrorBatchesDegree);
}

const updateGroup = (index,data) => {
  let arrayKeys = Object.keys(groupDatabaseData);
  let refUpdate = db.ref().child('Groups/'+arrayKeys[index]);
  //let refSet = refUpdate.push();
  refUpdate.update({
    groupStudent:data
  });
  importGroups();
}

const updateCourse = (index,data) => {
  let arrayKeys = Object.keys(courseDatabaseData);
  let ref = returnReference(user);
  let refCourses = db.ref().child('Teachers/' + ref + '/Courses/'+arrayKeys[index]);
  refCourses.update({
    groups:data
  })
  importCourses(user);
}

const returnReference = (uname) => {
  let arrayKeys = Object.keys(teacherDatabaseData);
  let i;
  console.log(uname);
  for(i = 0; i < teacherDatabase.length; i++) {
    if(teacherDatabase[i].username === uname) {
      break;
    }
  }
  //let refUpdate = db.ref().child('Teachers/'+arrayKeys[i]);
  console.log(arrayKeys);
  return arrayKeys[i];
}

let returnCourseKey = (uname,cname) => {
  console.log(uname);
  importCourses(uname);
  let arrayKeys = Object.keys(courseDatabaseData);
  let i;
  console.log(courseDatabaseData);
  console.log(arrayKeys,uname,user);
  for(i = 0; i < courseDatabase.length; i++) {
    if(courseDatabase[i].courseName === cname) {
      break;
    }
  }
  return arrayKeys[i];
}

let selectedFile;
const handleFileUploadChange = (e) => {
  selectedFile = e.target.files[0];
}

const handleFileUploadSubmit = (e) => {
  console.log('Upload Click');
  const uploadTask = storageRef.child(`csv/student/${selectedFile.name}`).put(selectedFile).then(() => {
    storageRef.child(`csv/student/${selectedFile.name}`).getDownloadURL().then((url) => {
      document.getElementById('uploadForm').remove();
      document.querySelector('.blacklayer').appendChild(loader());  
      readStudentFile(url)
    }).then(() => {
      console.log('Tata');
      document.querySelector("#loader").remove();
      document.querySelector(".blacklayer").appendChild(importSuccess());
    }).catch(() => {
      console.log('Shit');
      document.querySelector("#loader").remove();
      document.querySelector(".blacklayer").appendChild(importFail());
    });
  })
}

const handleTeacherChange = (e) => {
  selectedFile = e.target.files[0];
}

const handleTeacherSubmit = (e) => {
  console.log('Upload Click');
  const uploadTask = storageRef.child(`csv/teacher/${selectedFile.name}`).put(selectedFile).then(() => {
    storageRef.child(`csv/teacher/${selectedFile.name}`).getDownloadURL().then((url) => {
      document.getElementById('uploadForm').remove();
      document.querySelector('.blacklayer').appendChild(loader());  
      readTeacherFile(url)
    }).then(() => {
      console.log('Tata');
      document.querySelector("#loader").remove();
      document.querySelector(".blacklayer").appendChild(importSuccess());
    }).catch(() => {
      console.log('Shit');
      document.querySelector("#loader").remove();
      document.querySelector(".blacklayer").appendChild(importFail());
    });
  })
}

const readTeacherFile = (fileUrl) => {
  var rawFile = new XMLHttpRequest();
    rawFile.open("GET", fileUrl);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
              var allText = showData(rawFile.responseText);
              console.log(allText);
              loadCSVToDataTeacher(allText);
              Promise.resolve();
            } else {
              Promise.reject();
            }
        }
    }
    rawFile.send(null);
}

const readStudentFile = (fileUrl) => {
    //let fileUrl = `omega-portal-du.appspot.com/csv/${fileName}`;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", fileUrl);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = showData(rawFile.responseText);
                console.log(allText);
                loadCSVToDataStudent(allText);
                Promise.resolve();
            } else {
              Promise.reject();
            }
        }
    }
    rawFile.send(null);
}

function showData(data) {
  let rows = data.split(/\r?\n/);
  let rowNum;
  let cells;
  let csvData = [];

  for (rowNum = 1; rowNum < rows.length; ++rowNum) {
    cells = rows[rowNum].split(",");
    csvData.push(cells);
  }
  return csvData;
}

let storeStudent = (student) => {
  dataRefStudents.child(student.enroll).set(student);
  let userRef = db.ref().child('users');
  let userReference = userRef.child(student.enroll);
  userReference.set({
      Type: 'Student',
      username:   student.username,
      password: 'student123'
  });
}

let storeTeacher = (teacher) => {
  dataRefTeachers.child(teacher.facId).set(teacher);
  let userRef = db.ref().child('users');
  let userReference = userRef.child(teacher.facId);
  userReference.set({
      Type: 'Teacher',
      username:   teacher.username,
      password: 'teacher123'
  });
}

let storeGroup = (group) => {
  dataRefGroups.child(group.groupCode).set(group);
};

let storeCourses = (course) => {
  dataRefCourses.child(course.courseCode + "_" + course.facultyAssigned).set(course);
}

let addStudentToGroup = (groupCode,x) => {
  let grDB = db.ref().child(`${groupCode}`);
  grDB.child(x.enroll).set({enroll:x.enroll});
  console.log('Done');
}

let deleteTeacher = (teacher) => {
  dataRefTeachers.child(teacher.facId).remove();
  db.ref().child('users').child(teacher.username).remove();
}

let deleteStudent = (student) => {
  dataRefStudents.child(student.enroll).remove();
  db.ref().child('users').child(student.username).remove();
}

let deleteGroup = (group) => {
  dataRefGroups.child(group.groupCode).remove();
  db.ref().child(group.groupCode);
}

let deleteStudentFromGroup = (groupCode,enroll) => {
  db.ref().child(groupCode).child(enroll).remove();
}

let adminTeacherUpdate = (teacher) => {
  dataRefTeachers.child(teacher.facId).update(teacher);
}

let adminStudentUpdate = (student) => {
  dataRefStudents.child(student.enroll).update(student);
}

let updateAdminPassword = (newPassword) => {
  dataRefUsers.child(user.username).update({'password':newPassword}).then(() => {
    user.password = newPassword
    updatePwd(newPassword);
  });
}

export {userDatabaseData,storeCourses,deleteStudentFromGroup,deleteGroup,addStudentToGroup,particularGroupDatabase,importParticularGroups,storeGroup,updateAdminPassword,adminStudentUpdate,adminTeacherUpdate,deleteStudent,deleteTeacher,storeTeacher,returnReference,importUsers,userDatabase,db,importStudents,studentDatabase,importTeachers,teacherDatabase,importCourses,courseDatabase,importGroups,groupDatabase,groupDatabaseData,updateGroup,updateCourse,returnCourseKey,importAssignments,assignmentDatabase,importDepartment,departmentDatabase,importDegree,degreeDatabase,importDegreeBatches,batchDegreeDatabase,handleFileUploadSubmit,handleFileUploadChange,storeStudent,handleTeacherChange,handleTeacherSubmit};
