import { updateAdminPassword } from '../connectToFirebase';
import {user} from '../index';
import { successMessage, failureMessage } from '../randomFeatures';

const updatePassword = (currPassword,newPassword) => {
    console.log(user);
    if(currPassword === user.password) {
        updateAdminPassword(newPassword);
        //successMessage();
        document.querySelector("#loader").remove();
        document.querySelector(".blacklayer").appendChild(successMessage());
    } else {
        document.querySelector("#loader").remove();
        document.querySelector(".blacklayer").appendChild(failureMessage());
    }
}

export {updatePassword};