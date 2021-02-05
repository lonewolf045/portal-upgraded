import { formDisplay } from './loginForm';
import './openingPage.css';
const openingPage = () => {
    document.querySelector("#container").innerHTML = "";
    const header = headingOpeningPage();
    document.querySelector("#container").appendChild(header);
    const form = homePageForm();
    document.querySelector("#container").appendChild(form);
}

const headingOpeningPage = () => {
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

const homePageForm = () => {
    const formContainer = document.createElement('div');
    formContainer.id = "loginForm";
    formContainer.classList.add("login-form-popup");
    const form = document.createElement('form');
    form.classList.add('form-container');
    form.name = "loginForm";
    const formHeading = document.createElement('h1');
    formHeading.id = 'formHeading';
    formHeading.innerHTML = "Login";
    const usernameLabel = document.createElement('label');
    usernameLabel.htmlFor = "username";
    usernameLabel.innerHTML = "<b>Username</b>";
    const usernameField = document.createElement('input');
    usernameField.type = "text";
    usernameField.name = "username";
    usernameField.required = true;
    const passwordLabel = document.createElement('label');
    passwordLabel.htmlFor = "password";
    passwordLabel.innerHTML = "<b>Password</b>";
    const passwordField = document.createElement('input');
    passwordField.type = "password";
    passwordField.name = "password";
    passwordField.required = true;
    form.appendChild(formHeading);
    form.appendChild(usernameLabel);
    form.appendChild(usernameField);
    form.appendChild(passwordLabel);
    form.appendChild(passwordField);
    form.innerHTML+= `<div id = "radio">
    <b>Access Type:</b>
    <div>
        <input type="radio" id="admin" name="type" value="Admin" checked>
        <label for="admin">Admin</label><br>
    </div>
    <div>
        <input type="radio" id="teacher" name="type" value="Teacher">
        <label for="teacher">Teacher</label><br>
    </div>
    <div>
        <input type="radio" id="student" name="type" value="Student">
        <label for="student">Student</label><br>
    </div>
</div>`;
    const btnLogin = document.createElement('button');
    btnLogin.type = "submit";
    btnLogin.innerHTML = "Login";
    btnLogin.id = "btnLogin";
    btnLogin.classList.add('.btnLogin');
    btnLogin.addEventListener('click',() => {
        console.log('Clicked');
        formDisplay();
    });
    form.appendChild(btnLogin);
    formContainer.appendChild(form);
    return formContainer;
}

export {openingPage};