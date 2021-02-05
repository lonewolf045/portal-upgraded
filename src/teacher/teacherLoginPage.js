import { loadGroupList } from "../admin/adminFunctionality";
import { assignmentDatabase, courseDatabase, importAssignments, updateCourse } from "../connectToFirebase";
import { loadAssignList, loadCourseList } from "./teacherFunctionality";
import {course,user} from '../index';

const btnLogout = document.querySelector("#logout-button-teach");
const loginBtn = document.querySelector(".open-login-button");
const courseBtn = document.querySelector('.course');
const assignmentBtn = document.querySelector('.assignment');
//let course;
const closeBlacklayer = document.querySelector('#closeBlacklayer');
const navTeach = document.querySelector('#openBtnTeach');
const container = document.querySelector('#container');
//const studentBtn = document.querySelector(".student");
const welcomeMessage = function (user) {
    const use = document.querySelector(".welcome-message");
    use.innerHTML = "Welcome, " + user;
}

const loginTeacherDOM = (username) => {
    welcomeMessage(username);
    changeButton();
}

const changeButton = () => {
    loginBtn.style.display = "none";
    btnLogout.style.display = "block";
    navTeach.style.display = "block";
}

const appendCourses = () => {
    courseBtn.style.display = "block";
    assignmentBtn.style.display = "none";
    container.innerHTML = "";
    let courseList = loadCourseList();
    let courseDOM = courseList.map(x => courseListMaker(x));
    courseDOM.forEach(function(x) {
        container.appendChild(x);
    });
}

const courseListMaker = (x) => {
    const card = document.createElement('div');
    card.classList.add('info-card');
    const cName = document.createElement('div');
    cName.classList.add('info-detail');
    const cCode = document.createElement('div');
    cCode.classList.add('info-detail');
    cName.innerHTML = x.courseName;
    cCode.innerHTML = x.courseCode;
    card.appendChild(cName);
    card.appendChild(cCode);
    card.addEventListener('click',() => {
        courseClick(x.courseName);
    });
    return card;
}

const courseClick = (cName) => {
    const blackLayer = document.createElement('div');
    blackLayer.classList.add('listMaker');
    let groupList = loadGroupList();
    let clickDOM = groupList.map(x => groupSelection(x,cName));
    clickDOM.forEach(function(x) {
        blackLayer.appendChild(x);
    });
    container.appendChild(blackLayer);
    closeBlacklayer.style.display = "block";
    closeBlacklayer.style.zIndex = "15";
    closeBlacklayer.style.fontSize = "75px";
}

const groupSelection = (x,cName) => {
    const gName = document.createElement('div');
    const list = document.createElement('div');
    gName.innerHTML = x.groupName;
    list.appendChild(gName);
    for(let i = 0; i < courseDatabase.length;i++) {
        if(courseDatabase[i].courseName === cName && courseDatabase[i].groups !== undefined) {
            for(let j = 0; j < courseDatabase[i].groups.length;j++) {
                if(courseDatabase[i].groups[j].groupName === x.groupName)
                    return list;
            }
        }

    }
    const addButton = document.createElement('button');
    addButton.innerHTML = '+';
    let i;
    for(i = 0; i < courseDatabase.length;i++) {
        if(courseDatabase[i].courseName === cName) {
            break;
        }
    }
    addButton.addEventListener('click',() => {
        if(courseDatabase[i].groups)
            courseDatabase[i].groups.push(x);
        else {
            courseDatabase[i].groups = new Array();
            courseDatabase[i].groups.push(x);
        }
        updateCourse(i,courseDatabase[i].groups);
        document.querySelector('.open-course-button').click();
    });
    list.appendChild(addButton);
    return list;
}

const appendAssignment = () => {
    courseBtn.style.display = "none";
    container.innerHTML = "";
    let courseList = loadCourseList();
    let courseDOM = courseList.map(x => courseAssignListMaker(x));
    courseDOM.forEach(function(x) {
        container.appendChild(x);
    });
}

const courseAssignListMaker = (x) => {
    const card = document.createElement('div');
    card.classList.add('info-card');
    const cName = document.createElement('div');
    cName.classList.add('info-detail');
    const cCode = document.createElement('div');
    cCode.classList.add('info-detail');
    cName.innerHTML = x.courseName;
    cCode.innerHTML = x.courseCode;
    card.appendChild(cName);
    card.appendChild(cCode);
    card.addEventListener('click',() => {
        course = x.courseName;
        importAssignments(user,course).then(() => {
            console.log(assignmentDatabase);
        courseAssignClick(x.courseName);
        });
        
    });
    return card;
}

const courseAssignClick = (cName) => {
    assignmentBtn.style.display = "block";
    const blackLayer = document.createElement('div');
    blackLayer.classList.add('listMaker');
    let assignList = loadAssignList();
    let clickDOM = assignList.map(x => groupAssignmentShow(x));
    console.log(assignList);
    clickDOM.forEach(function(x) {
        blackLayer.appendChild(x);
    });
    container.appendChild(blackLayer);
    closeBlacklayer.style.display = "block";
    closeBlacklayer.style.zIndex = "15";
    closeBlacklayer.style.fontSize = "75px";
}

const groupAssignmentShow = (x) => {
    const detail = document.createElement('div');
    const dueDate = document.createElement('div');
    detail.innerHTML = x.assignmentDetails;
    dueDate.innerHTML = x.dueDate;
    const list = document.createElement('div');
    list.appendChild(detail);
    list.appendChild(dueDate);
    return list;
}





export {loginTeacherDOM,appendCourses,appendAssignment};