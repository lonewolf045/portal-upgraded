import { userId } from '..';
import { addCourseForm } from './teacherForm';
import {profileMenu} from './teacherProfileMenu';
import {courseDatabase,importCourses} from '../connectToFirebase';
import {courseCard} from './teacherCourse';
import './teacherPage.css';

const teacherPage = (user) => {
    let header = teacherHeader(user);
    let profilePic = profileTeacher(user);
    let addButton = addCourseButton(user);
    header.appendChild(profilePic);
    document.querySelector('#container').innerHTML = "";
    document.querySelector("#container").appendChild(header);
    document.querySelector("#container").appendChild(addButton);
    let profilePicMenu = profileMenu(); 
    document.querySelector("#container").appendChild(profilePicMenu);
    
    importCourses().then(() => {
        let cards = displayCourses();
        document.querySelector("#container").appendChild(cards);
    });
    
}

const loadAgainCourses = () => {
    document.querySelector('#courses').remove();
    importCourses().then(() => {
        let cards = displayCourses();
        document.querySelector("#container").appendChild(cards);
    });
}

const teacherHeader = (user) => {
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
    omegaLine.innerHTML += ",the new Alpha,right now in Beta";
    omegaLine.id = "omegaLine";
    headingContainer.id = "headingContainer";
    header.id = "header";
    headingContainer.appendChild(omegaIcon);
    headingContainer.appendChild(omegaHeading);
    headingContainer.appendChild(omegaLine);
    
    header.appendChild(headingContainer);
    
    return header;
}

const profileTeacher = (user) => {
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

const addCourseButton = (user) => {
    const addButton = document.createElement('button');
    addButton.id = "addCourse";
    addButton.innerHTML = `<i class="fas fa-plus"></i>`
    addButton.addEventListener('click',() => {
        document.querySelector('#container').appendChild(addCourseForm(userId));
    })
    return addButton;
}

const displayCourses = () => {
   let takenCourses = courseDatabase.filter(x => x['facultyAssigned'] === userId);
   console.log(takenCourses);
   let courses = document.createElement('div');
   courses.id = 'courses';
   let takenCourseDOM = takenCourses.forEach(element => {
        let card = courseCard(element);
        courses.appendChild(card);
   }); 
   return courses;
}

export {teacherPage,loadAgainCourses};