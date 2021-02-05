import {storeTeacher} from '../connectToFirebase';

const teacher = (firstName,lastName,asCode,facId,position,dept,username,password) => {
    return {firstName,lastName,asCode,facId,position,dept,username,password};
}

const createTeacher = (firstName,lastName,asCode,facId,position,dept) => {
    let username = firstName.toLowerCase().split(' ').join('') + lastName + facId;
    let password = 'teacher123';
    let newTeacher = teacher(firstName,lastName,asCode,facId,position,dept,username,password);
    storeTeacher(newTeacher);
}

const loadCSVToDataTeacher = (csvData) => {
    let csvObject = csvData.map(x => {
        let password = "teacher123";
        let username = x[1].toLowerCase().split(' ').join('')+x[2]+x[0];
        let newTeacher = teacher(x[1],x[2],x[3],x[0],x[4],x[5],username,password);
        return newTeacher;
    });
    csvObject.forEach(x => {storeTeacher(x)});    
}

export {createTeacher,loadCSVToDataTeacher};