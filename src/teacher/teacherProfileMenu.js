import {logOutTeacher} from './teacherLogout';

const profileMenu = () => {
    const menu = document.createElement('div');
    const logOut = logOutButton();
    //const changePassword = changePasswordButton();
    //const updateDP = updateDPButton();
    menu.classList.add('default');
    menu.appendChild(logOut);
    //menu.appendChild(changePassword);
    //menu.appendChild(updateDP);
    return menu;
}

const logOutButton = () => {
    const logOut = document.createElement('a');
    logOut.innerHTML = "Log Out";
    logOut.addEventListener('click',() => {
        logOutTeacher();
    });
    logOut.classList.add('profileButton');
    return logOut;
}

export {profileMenu};