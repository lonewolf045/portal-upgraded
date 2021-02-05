import {importCourses, userDatabase, userDatabaseData} from './connectToFirebase';
import {loginStudentDOM} from './student/studentLoginPage';
import {user,course,userId} from './index';
import { setAdmin, setStudent, setTeach } from './session';
import { adminPage } from './admin/adminPage';
import { teacherPage } from './teacher/teacherPage';


const adminLogin = (username,password) => {
    for(let i = 0; i < userDatabase.length; i++) {
        //console.log(userDatabase[i].Type,userDatabase[i].username,username, userDatabase[i].password,password);
        if(userDatabase[i].Type === 'Admin') {
            if(userDatabase[i].username === username && userDatabase[i].password === password) {
                //console.log('Success');
                user = userDatabase[i];
                userId = Object.keys(userDatabaseData)[i];
                setAdmin(username,password);
                //loginAdminDOM(username);
                adminPage(userDatabase[i]);
                return;
            }
        }
    }
    console.log('Wrong Login Credentials');
    window.alert('Wrong Login Credentials');
}

const teacherLogin = (username,password) => {
    for(let i = 0; i < userDatabase.length; i++) {
        console.log(userDatabase[i].Type,userDatabase[i].username,username, userDatabase[i].password,password);
        if(userDatabase[i].Type === 'Teacher') {
            if(userDatabase[i].username === username && userDatabase[i].password === password) {
                console.log('Success');
                user = userDatabase[i];
                userId = Object.keys(userDatabaseData)[i];
                console.log(user);
                setTeach(username,password);
                //loginTeacherDOM(username);
                //importCourses(user);
                teacherPage(userDatabase[i]);
                return;
            }
        }
    }
    console.log('Wrong Login Credentials');
}

const studentLogin = (username,password) => {
    for(let i = 0; i < userDatabase.length; i++) {
        console.log(userDatabase[i].Type,userDatabase[i].username,username, userDatabase[i].password,password);
        if(userDatabase[i].Type === 'Student') {
            if(userDatabase[i].username === username && userDatabase[i].password === password) {
                console.log('Success');
                setStudent(username,password);
                loginStudentDOM(username);
                return;
            }
        }
    }
    console.log('Wrong Login Credentials');
}

export {adminLogin,teacherLogin,studentLogin};