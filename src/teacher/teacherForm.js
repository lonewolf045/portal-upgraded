import { importCourses } from '../connectToFirebase';
import {createCourse} from '../course/course';
import {loadAgainCourses} from './teacherPage';
import {user} from '../index';

const addCourseForm = (x) => {
    const courseMenu = document.createElement('div');
    courseMenu.classList.add('blacklayer');

    const formContainer = document.createElement('div');
    formContainer.id = "courseForm";
    formContainer.classList.add("course-form-popup");
    const form = document.createElement('form');
    form.classList.add('form-container');
    form.name = "courseForm";
    const formHeading = document.createElement('h1');
    formHeading.id = 'formHeading';
    formHeading.innerHTML = "Course:";

    const courseCodeLabel = document.createElement('label');
    courseCodeLabel.htmlFor = "courseCode";
    courseCodeLabel.innerHTML = "<b>Course Code:</b>";
    const courseCodeField = document.createElement('input');
    courseCodeField.type = "text";
    courseCodeField.name = "courseCode";
    courseCodeField.required = true;

    const courseNameLabel = document.createElement('label');
    courseNameLabel.htmlFor = "courseName";
    courseNameLabel.innerHTML = "<b>Course Name:</b>";
    const courseNameField = document.createElement('input');
    courseNameField.type = "text";
    courseNameField.name = "courseName";
    courseNameField.required = true;

    form.appendChild(formHeading);
    form.appendChild(courseCodeLabel);
    form.appendChild(courseCodeField);
    form.appendChild(courseNameLabel);
    form.appendChild(courseNameField);

    const btnClose = document.createElement('button');
    btnClose.type = 'button';
    btnClose.innerHTML = "Close";
    btnClose.id = "btnClose";
    btnClose.classList.add('btnClose');
    btnClose.addEventListener('click',() => {
        courseMenu.remove();
    });

    const btnAdd = document.createElement('button');
    btnAdd.type = "button";
    btnAdd.innerHTML = "Add";
    btnAdd.id = "btnAdd";
    btnAdd.classList.add('btnAdd');
    btnAdd.addEventListener('click',() => {
        console.log('Clicked');
        if(courseCodeField.value && courseNameField.value) {
            Promise.resolve(importCourses).then(() => {
                    createCourse(courseCodeField.value ,courseNameField.value,x);
                    courseMenu.remove();
            }).then(loadAgainCourses);
            console.log('Here');
            
        }
        else {
            window.alert('Fill missing details');
        }
    });

    form.appendChild(btnAdd);
    form.appendChild(btnClose);
    formContainer.appendChild(form);

    courseMenu.appendChild(formContainer);
    return courseMenu;
}

export {addCourseForm}