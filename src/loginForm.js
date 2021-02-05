import { adminLogin,teacherLogin,studentLogin } from "./login";


const formDisplay = () => {
    const loginForm = document.forms['loginForm'];
    console.log("Trying");
    console.log(loginForm);
    let username = loginForm["username"].value;
    let password = loginForm["password"].value;
    let type = loginForm["type"].value;
    document.querySelector('#container').innerHTML = "";
    if(type === "Admin") {
        adminLogin(username,password);
    } else if(type === "Teacher") {
        teacherLogin(username,password);   
    } else if(type === "Student") {
        studentLogin(username,password);
    }

    //closeLogin.click();
}
export {formDisplay};