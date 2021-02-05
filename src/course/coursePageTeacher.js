import {user} from '../index';
import {teacherPage} from '../teacher/teacherPage';
import {backArrow} from '../randomFeatures';
import {profileMenu} from '../teacher/teacherProfileMenu'

const coursePageTeacher = (user,course) => {
    let header = courseHeader(course);
    let profilePic = profileTeacher(user);
    let backArrowButton = backArrow(caller);
    header.appendChild(profilePic);
    document.querySelector('#container').innerHTML = "";
    document.querySelector("#container").appendChild(header);
    document.querySelector("#container").appendChild(backArrowButton);
    let profilePicMenu = profileMenu(); 
    document.querySelector("#container").appendChild(profilePicMenu);
}

const caller = () => {
    teacherPage(user);
}

let courseHeader = (course) => {
    
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
    omegaHeading.innerHTML = course.courseCode;
    omegaHeading.id = "omegaHeading";
    omegaLine.innerHTML += course.courseName;
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

export {coursePageTeacher};