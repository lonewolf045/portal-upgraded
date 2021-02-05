import {coursePageTeacher} from '../course/coursePageTeacher';
import {user} from '../index';

const courseCard = (x) => {
    const card = document.createElement('div');
    const courseCode = document.createElement('div');
    const courseName = document.createElement('div');
    const courseStudents = document.createElement('div');
    const courseSelect = document.createElement('button');
    card.classList.add('courseCard');
    courseCode.classList.add('courseCode');
    courseName.classList.add('courseName');
    courseStudents.classList.add('courseStudents');
    courseSelect.classList.add('selectButton');
    courseCode.innerHTML = x.courseCode;
    courseName.innerHTML = x.courseName;
    let i = (x.groupStudents || 0).length || 0;
    courseStudents.innerHTML = i;
    courseSelect.innerHTML = 'Select>';
    courseSelect.addEventListener('click',() => {
        console.log(user);
        coursePageTeacher(user,x);
    });
    card.appendChild(courseCode);
    card.appendChild(courseName);
    card.appendChild(courseStudents);
    card.appendChild(courseSelect);
    return card;
}

export {courseCard};