import { changePasswordForm } from "./adminForms";
import { logOutAdmin } from "./adminLogout";

const profileMenu = () => {
    const menu = document.createElement('div');
    const logOut = logOutButton();
    const changePassword = changePasswordButton();
    const updateDP = updateDPButton();
    menu.classList.add('default');
    menu.appendChild(logOut);
    menu.appendChild(changePassword);
    menu.appendChild(updateDP);
    return menu;
}

const logOutButton = () => {
    const logOut = document.createElement('a');
    logOut.innerHTML = "Log Out";
    logOut.addEventListener('click',() => {
        logOutAdmin();
    });
    logOut.classList.add('profileButton');
    return logOut;
}

const changePasswordButton = () => {
    const changePassword = document.createElement('a');
    changePassword.innerHTML = "Change Password";
    changePassword.addEventListener('click', () => {
        document.querySelector('#container').appendChild(changePasswordForm());
    });
    changePassword.classList.add('profileButton');
    return changePassword; 
}

const updateDPButton = () => {
    const updateDP = document.createElement('a');
    updateDP.innerHTML = "Update Profile Picture";
    updateDP.addEventListener('click',() => {

    });
    updateDP.classList.add('profileButton');
    return updateDP;
}



export {profileMenu};