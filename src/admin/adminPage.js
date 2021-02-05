import { user } from '../index';
import './adminPage.css';
import { profileMenu } from './adminProfileMenu';
import { addStudentClick, viewStudentClick } from './adminStudent';
import { importGroups, importStudents,importTeachers } from '../connectToFirebase';
import { addTeacherClick, viewTeacherClick } from './adminTeacher';
import { clickF } from './adminGroup';

let addGroupClick = clickF.addGroupClick;
let viewGroupClick = clickF.viewGroupClick;

const adminPage = () => {
    
    let header = headingAdminPage(user);
    let profilePic = profileAdmin(user);
    header.appendChild(profilePic);
    document.querySelector('#container').innerHTML = "";
    document.querySelector("#container").appendChild(header);
    
    let profilePicMenu = profileMenu(); 
    document.querySelector("#container").appendChild(profilePicMenu);

    let subContainer = document.createElement('div');
    subContainer.classList.add('sub-container');

    let sideMenuDiv = sideMenu();
    subContainer.appendChild(sideMenuDiv);

    let workWindow = document.createElement('div');
    workWindow.id = "workWindow";
    subContainer.appendChild(workWindow);
    
    document.querySelector("#container").appendChild(subContainer);
}

const headingAdminPage = (user) => {
    const header = document.createElement('header');
    const headingContainer = document.createElement('div');
    const omegaIcon = document.createElement('div');
    const iconImage = document.createElement('img');
    //const omegaHead = document.createElement('div');
    const omegaHeading = document.createElement('p');
    const omegaLine = document.createElement('p');
    iconImage.src = "https://www.flaticon.com/svg/static/icons/svg/2052/2052198.svg";
    iconImage.id = "iconImage";
    omegaIcon.id = "omegaIcon";
    omegaIcon.appendChild(iconImage);
    omegaHeading.innerHTML = "Omega";
    omegaHeading.id = "omegaHeading";
    omegaHeading.classList.add('none');
    omegaLine.innerHTML += ",the new Alpha,right now in Beta";
    omegaLine.id = "omegaLine";
    omegaLine.classList.add('none');
    headingContainer.id = "headingContainer";
    header.id = "header";
    headingContainer.appendChild(omegaIcon);
    headingContainer.appendChild(omegaHeading);
    headingContainer.appendChild(omegaLine);
    
    header.appendChild(headingContainer);
    
    return header;
}

const profileAdmin = (user) => {
    const profilePicDiv = document.createElement('div');
    profilePicDiv.id = "profilePicDiv";
    const profilePic = document.createElement('div');
    profilePic.innerHTML = user.username.toUpperCase().charAt(0);
    console.log(profilePic.innerHTML);
    profilePic.id = "profilePic";
    
    profilePicDiv.appendChild(profilePic);
    profilePicDiv.addEventListener('click',() => {
        document.querySelector('.default').classList.toggle('visible');
    });
    return profilePicDiv;
}

const sideMenu = () => {
    const sideMenuDiv = document.createElement('div');
    sideMenuDiv.id= "sideMenu";
    const student = studentMenu();
    sideMenuDiv.appendChild(student);
    const teacher = teacherMenu();
    sideMenuDiv.appendChild(teacher);
    const group = groupMenu();
    sideMenuDiv.appendChild(group);
    return sideMenuDiv;
}

const studentMenu = () => {
    const sideMenuDiv = document.createElement('div');
    const studentMenu = document.createElement('div');
    //studentMenu.innerHTML = 'Student';
    const studentMenuTab = document.createElement('div');
    studentMenuTab.innerHTML = 'Student';
    const addStudent = document.createElement('div');
    const viewStudent = document.createElement('div');
    addStudent.innerHTML = "Add Student";
    viewStudent.innerHTML= "View Students";
    addStudent.classList.add('option');
    viewStudent.classList.add('option');
    addStudent.addEventListener('click',addStudentClick);
    viewStudent.addEventListener('click',() => {importStudents().then(viewStudentClick)});
    studentMenu.appendChild(addStudent);
    studentMenu.appendChild(viewStudent);
    studentMenu.classList.add('content');
    studentMenuTab.classList.add('collapsible');
    studentMenuTab.addEventListener('click', (e) => {
            e.target.classList.toggle("active");
            var content = e.target.nextElementSibling;
            if (content.style.maxHeight){
              content.style.maxHeight = null;
            } else {
              content.style.maxHeight = content.scrollHeight + "px";
            } 
    });
    sideMenuDiv.appendChild(studentMenuTab);
    sideMenuDiv.appendChild(studentMenu);
    return sideMenuDiv;
}

const teacherMenu = () => {
    const sideMenuDiv = document.createElement('div');
    const teacherMenu = document.createElement('div');
    const teacherMenuTab = document.createElement('div');
    teacherMenuTab.innerHTML = 'Teacher';
    const addTeacher = document.createElement('div');
    const viewTeacher = document.createElement('div');
    addTeacher.innerHTML = "Add Teacher";
    viewTeacher.innerHTML= "View Teachers";
    addTeacher.classList.add('option');
    viewTeacher.classList.add('option');
    addTeacher.addEventListener('click',addTeacherClick);
    viewTeacher.addEventListener('click',() => {importTeachers().then(viewTeacherClick)});
    teacherMenu.appendChild(addTeacher);
    teacherMenu.appendChild(viewTeacher);
    teacherMenu.classList.add('content');
    teacherMenuTab.classList.add('collapsible');
    teacherMenuTab.addEventListener('click', (e) => {
            e.target.classList.toggle("active");
            var content = e.target.nextElementSibling;
            if (content.style.maxHeight){
              content.style.maxHeight = null;
            } else {
              content.style.maxHeight = content.scrollHeight + "px";
            } 
    });
    sideMenuDiv.appendChild(teacherMenuTab);
    sideMenuDiv.appendChild(teacherMenu);
    return sideMenuDiv;
}

const groupMenu = () => {
  console.log(clickF);
    const sideMenuDiv = document.createElement('div');
    const groupMenu = document.createElement('div');
    const groupMenuTab = document.createElement('div');
    groupMenuTab.innerHTML = 'Group';
    const addGroup = document.createElement('div');
    const viewGroup = document.createElement('div');
    addGroup.innerHTML = "Add Group";
    viewGroup.innerHTML= "View Group";
    addGroup.classList.add('option');
    viewGroup.classList.add('option');
    addGroup.addEventListener('click',() => {addGroupClick();});
    viewGroup.addEventListener('click',() => {importGroups().then(viewGroupClick)});
    groupMenu.appendChild(addGroup);
    groupMenu.appendChild(viewGroup);
    groupMenu.classList.add('content');
    groupMenuTab.classList.add('collapsible');
    groupMenuTab.addEventListener('click', (e) => {
            e.target.classList.toggle("active");
            var content = e.target.nextElementSibling;
            if (content.style.maxHeight){
              content.style.maxHeight = null;
            } else {
              content.style.maxHeight = content.scrollHeight + "px";
            } 
    });
    sideMenuDiv.appendChild(groupMenuTab);
    sideMenuDiv.appendChild(groupMenu);
    return sideMenuDiv;
}

export {adminPage};