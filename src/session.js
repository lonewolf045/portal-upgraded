import { adminLogin, studentLogin, teacherLogin } from "./login";
import { openingPage } from "./openingPage";

const setAdmin = (username,password) => {
    let user = {};
    user['username'] = username;
    user['password'] = password;
    user['type'] = 'admin';
    sessionStorage.currentUser = JSON.stringify(user);
}

const setTeach = (username,password) => {
    let user = {};
    user['username'] = username;
    user['password'] = password;
    user['type'] = 'teacher';
    sessionStorage.currentUser = JSON.stringify(user);
}

const setStudent = (username,password) => {
    let user = {};
    user['username'] = username;
    user['password'] = password;
    user['type'] = 'student';
    sessionStorage.currentUser = JSON.stringify(user);
}

const resetCurrentUser = () => {
    sessionStorage.removeItem('currentUser');
}

const updatePwd = (newPwd) => {
    let curruser = JSON.parse(sessionStorage.currentUser);
    sessionStorage.removeItem('currentUser');
    curruser.password = newPwd;
    sessionStorage.currentUser = JSON.stringify(curruser);
}

const loadCurrentSession = () => {
    if(sessionStorage.currentUser === undefined) {
        openingPage();
        return;
    }
    //reject();
    let curruser = JSON.parse(sessionStorage.currentUser);
    //console.log(curruser);
    if(curruser.type === 'admin') {
        //console.log('admin');
        adminLogin(curruser.username,curruser.password);
    } else if (curruser.type === 'teacher') {
        //user = curruser.username;
        teacherLogin(curruser.username,curruser.password);
        //importCourses(user);
    } else if (curruser.type === 'student') {
        studentLogin(curruser.username,curruser.password);
    }
}


export {updatePwd,setAdmin,setTeach,setStudent,resetCurrentUser,loadCurrentSession};
