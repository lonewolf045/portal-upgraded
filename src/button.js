import { formDisplay } from "./loginForm";
import {logOutAdmin} from './admin/adminLogout';
// import { appendGroup, appendStudent, appendTeacher } from "./adminLoginPage";
import { makeAssignment, makeCourse } from "./teacherFunctionality";
import { logOutTeacher } from "./teacherLogout";
import { appendAssignment, appendCourses } from "./teacherLoginPage";

const btn = document.querySelector("#btn");
const btnLogin = document.querySelector("#btnLogin");
const btnLogoutTeach = document.querySelector("#logout-button-teach");
const btnLogoutAdmin = document.querySelector("#logout-button-admin");
const btnLogoutStudent = document.querySelector("#logout-button-student");
const loginBtn = document.querySelector(".open-login-button");
const closeLogin = document.querySelector(".cancelLogin");
const teacherBtn = document.querySelector(".teacher");
const studentBtn = document.querySelector(".student");
const passUpdateBtn = document.querySelector(".open-uppassword-button");
const btnPassUpdate = document.querySelector("#btnPassUpdate");
const btnOpenAdmin = document.querySelector('#openBtnAdmin');
const btnProfUpdate = document.querySelector("#btnProfUpdate");
const profUpdateBtn = document.querySelector('.open-upprofile-button');
const teacherClose = document.querySelector('#teacherClose');
const studentClose = document.querySelector('#studentClose');
const teacherAdd = document.querySelector('#btnAddTeacher');
const studentAdd = document.querySelector('#btnAddStudent');
const btnCloseAdmin = document.querySelector('#closeNavAdmin');
const studentListAdmin = document.querySelector('.open-student-button');
const teacherListAdmin = document.querySelector('.open-teacher-button');
const courseBtn = document.querySelector(".course");
const courseClose = document.querySelector("#courseClose");
const courseAdd = document.querySelector('#btnAddCourse');
const groupBtn = document.querySelector(".group");
const groupListAdmin = document.querySelector('.open-group-button');
const groupAdd = document.querySelector("#btnAddGroup");
const groupClose = document.querySelector('#groupClose');
const btnOpenTeach = document.querySelector('#openBtnTeach');
const closeOpenTeach = document.querySelector('#closeNavTeach');
const courseListTeach = document.querySelector('.open-course-button');
const assignmentBtn = document.querySelector('.assignment');
const assignListTeach = document.querySelector('.open-assignment-button');
const assignmentClose = document.querySelector('#assignmentClose');
const assignmentAdd = document.querySelector('#btnAddAssignment');
const closeBlacklayer = document.querySelector('#closeBlacklayer');
const container = document.querySelector('#container');



function closeBlacklayerList() {
    const blacklayer = document.querySelector('.listMaker');
    //container.innerHTML = "";
    //courseListTeach.click();
    blacklayer.innerHTML = "";
    closeBlacklayer.style.display = "none";
    blacklayer.remove();
}


function openFormTeacher() {
    document.getElementById("addTeacher").style.display = "block";
}
  
function closeFormTeacher() {
    document.getElementById("addTeacher").style.display = "none";
    clearFormFieldsTeacher();
}

function openFormStudent() {
    document.getElementById("addStudent").style.display = "block";
}
  
function closeFormStudent() {
    document.getElementById("addStudent").style.display = "none";
    clearFormFieldsStudent();
}
  
function openFormLogin() {
    document.getElementById("loginForm").style.display = "block";
}
  
function closeFormLogin() {
    document.getElementById("loginForm").style.display = "none";
    clearFormFieldsLogin();
}

function openFormCourse() {
    document.getElementById("addCourse").style.display = "block";
}
  
function closeFormCourse() {
    document.getElementById("addCourse").style.display = "none";
    clearFormFieldsCourse();
}

function openFormGroup() {
    document.getElementById("addGroup").style.display = "block";
}
  
function closeFormGroup() {
    document.getElementById("addGroup").style.display = "none";
    clearFormFieldsGroup();
}

function openFormAssignment() {
    document.getElementById("addAssignment").style.display = "block";
}
  
function closeFormAssignment() {
    document.getElementById("addAssignment").style.display = "none";
    clearFormFieldsAssignment();
}
  
//   function openFormSignUp() {
//     closeForm();
//     closeFormLogin();
//     document.getElementById("signupForm").style.display = "block";
//   }
  
//   function closeFormSignUp() {
//     document.getElementById("signupForm").style.display = "none";
//     clearFormFieldsSignUp();
//   }
  
//   function openFormUpdate() {
//     document.getElementById("updateForm").style.display = "block";
//   }
  
//   function closeFormUpdate() {
//     document.getElementById("updateForm").style.display = "none";
//     clearFormFieldsSignUp();
//   }
  
//   function openFormPassUpdate() {
//     document.getElementById("passUpdateForm").style.display = "block";
//   }
  
//   function closeFormPassUpdate() {
//     document.getElementById("passUpdateForm").style.display = "none";
//     clearFormFieldsPassUpdate();
//   }
  
  /* Set the width of the sidebar to 250px (show it) */
  function openNavAdmin() {
    document.getElementById("sidepanelAdmin").style.width = "280px";
    document.getElementById("container").style.left = "280px";
    document.getElementById("head").style.left = "40%";
  }
  
  /* Set the width of the sidebar to 0 (hide it) */
  function closeNavAdmin() {
    document.getElementById("sidepanelAdmin").style.width = "0";
    document.getElementById("container").style.left = "0";
    document.getElementById("head").style.left = "30%";
  }

  function openNavTeach() {
    document.getElementById("sidepanelTeach").style.width = "280px";
    document.getElementById("container").style.left = "280px";
    document.getElementById("head").style.left = "40%";
  }
  
  /* Set the width of the sidebar to 0 (hide it) */
  function closeNavTeach() {
    document.getElementById("sidepanelTeach").style.width = "0";
    document.getElementById("container").style.left = "0";
    document.getElementById("head").style.left = "30%";
  }
  
//   function openFormProfUpdate() {
//     document.getElementById("profUpdateForm").style.display = "block";
//   }
  
//   function closeFormProfUpdate() {
//     document.getElementById("profUpdateForm").style.display = "none";
//     clearFormFieldsProfUpdate();
//   }
  
function clearFormFieldsTeacher() {
     document.forms["addTeacher"].reset();
}

function clearFormFieldsStudent() {
    document.forms["addStudent"].reset();
}

function clearFormFieldsCourse() {
    document.forms["addCourse"].reset();
}

function clearFormFieldsGroup() {
    document.forms["addGroup"].reset();
}

function clearFormFieldsAssignment() {
    document.forms["addAssignment"].reset();
}

function clearFormFieldsLogin() {
    document.forms["loginForm"].reset();
}
  
//   function clearFormFieldsSignUp() {
//     document.forms["signupForm"].reset();
//   }
  
//   function clearFormFieldsUpdate() {
//     document.forms["updateForm"].reset();
//   }
  
//   function clearFormFieldsPassUpdate() {
//     document.forms["passUpdateForm"].reset();
//   }
  
//   function clearFormFieldsProfUpdate() {
//     document.forms["profUpdateForm"].reset();
//   }

const buttonClass = () => {
    loginBtn.addEventListener('click',openFormLogin);
    closeLogin.addEventListener('click',closeFormLogin);
    btnLogin.addEventListener('click',formDisplay);
    teacherBtn.addEventListener('click',openFormTeacher);
    teacherClose.addEventListener('click',closeFormTeacher);
    studentBtn.addEventListener('click',openFormStudent);
    studentClose.addEventListener('click',closeFormStudent);
    btnLogoutAdmin.addEventListener('click',logOutAdmin);
    btnLogoutTeach.addEventListener('click',logOutTeacher);
    btnLogoutStudent.addEventListener('click',logOutAdmin);
    studentAdd.addEventListener('click',makeStudent);
    teacherAdd.addEventListener('click',makeTeacher);
    btnOpenAdmin.addEventListener('click',openNavAdmin);
    btnCloseAdmin.addEventListener('click',closeNavAdmin);
    teacherListAdmin.addEventListener('click',appendTeacher);
    studentListAdmin.addEventListener('click',appendStudent);
    groupListAdmin.addEventListener('click',appendGroup);
    courseBtn.addEventListener('click',openFormCourse);
    courseClose.addEventListener('click',closeFormCourse);
    courseAdd.addEventListener('click',makeCourse);
    groupBtn.addEventListener('click',openFormGroup);
    groupClose.addEventListener('click',closeFormGroup);
    groupAdd.addEventListener('click',makeGroup);
    btnOpenTeach.addEventListener('click',openNavTeach);
    closeOpenTeach.addEventListener('click',closeNavTeach);
    courseListTeach.addEventListener('click',appendCourses);
    assignmentBtn.addEventListener('click',openFormAssignment);
    assignListTeach.addEventListener('click',appendAssignment);
    assignmentClose.addEventListener('click',closeFormAssignment);
    assignmentAdd.addEventListener('click',makeAssignment);
    closeBlacklayer.addEventListener('click',closeBlacklayerList);
}
export default buttonClass;