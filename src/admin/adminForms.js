import { handleFileUploadChange, handleFileUploadSubmit, handleTeacherChange, handleTeacherSubmit, importGroups, groupDatabaseData } from "../connectToFirebase";
import { createStudent } from "../student/student";
import { importFail, importSuccess, loader, successMessage } from "../randomFeatures";
import { createTeacher } from "../teacher/teacher";
import { updatePassword } from "./adminFunctionality";
import { reject } from "lodash";
import { createGroup } from "../group";

const addStudentMenu = () => {
    const studentMenu = document.createElement('div');
    studentMenu.classList.add('blacklayer');
    const formContainer = document.createElement('div');
    formContainer.id = "studentForm";
    formContainer.classList.add("student-form-popup");
    const form = document.createElement('form');
    form.classList.add('form-container');
    form.name = "studentForm";
    const formHeading = document.createElement('h1');
    formHeading.id = 'formHeading';
    formHeading.innerHTML = "Student:";
    const enrollLabel = document.createElement('label');
    enrollLabel.htmlFor = "enrollName";
    enrollLabel.innerHTML = "<b>Enrollment Number:</b>";
    const enrollField = document.createElement('input');
    enrollField.type = "text";
    enrollField.name = "enrollName";
    enrollField.required = true;
    const firstNameLabel = document.createElement('label');
    const lastNameLabel = document.createElement('label');
    //const userName = document.createElement('label');
    firstNameLabel.htmlFor = "firstName";
    firstNameLabel.innerHTML = "<b>First Name:</b>";
    lastNameLabel.htmlFor = "lastName";
    lastNameLabel.innerHTML = "<b>Last Name:</b>";
    const firstNameField = document.createElement('input');
    const lastNameField = document.createElement('input');
    firstNameField.type = "text";
    lastNameField.type = "text";
    firstNameField.name = "firstName";
    lastNameField.name = "lastName";
    firstNameField.required = true;
    lastNameField.required = true;
    const degreeLabel = document.createElement('label');
    degreeLabel.htmlFor = "degreeName";
    degreeLabel.innerHTML = "<b>Degree:</b>";
    const degreeField = document.createElement('input');
    degreeField.type = "text";
    degreeField.name = "degreeName";
    degreeField.required = true;
    const departmentLabel = document.createElement('label');
    departmentLabel.htmlFor = "departmentName";
    departmentLabel.innerHTML = "<b>Department:</b>";
    const departmentField = document.createElement('input');
    departmentField.type = "text";
    departmentField.name = "departmentName";
    departmentField.required = true;
    const batchLabel = document.createElement('label');
    batchLabel.htmlFor = "batchName";
    batchLabel.innerHTML = "<b>Batch:</b>";
    const batchField = document.createElement('input');
    batchField.type = "text";
    batchField.name = "batchName";
    batchField.required = true;
    form.appendChild(formHeading);
    form.appendChild(enrollLabel);
    form.appendChild(enrollField);
    form.appendChild(firstNameLabel);
    form.appendChild(firstNameField);
    form.appendChild(lastNameLabel);
    form.appendChild(lastNameField);
    form.appendChild(degreeLabel);
    form.appendChild(degreeField);
    form.appendChild(departmentLabel);
    form.appendChild(departmentField);
    form.appendChild(batchLabel);
    form.appendChild(batchField);
    const btnClose = document.createElement('button');
    btnClose.type = 'button';
    btnClose.innerHTML = "Close";
    btnClose.id = "btnClose";
    btnClose.classList.add('btnClose');
    btnClose.addEventListener('click',() => {
        studentMenu.remove();
    });
    const btnAdd = document.createElement('button');
    btnAdd.type = "button";
    btnAdd.innerHTML = "Add";
    btnAdd.id = "btnAdd";
    btnAdd.classList.add('btnAdd');
    btnAdd.addEventListener('click',() => {
        console.log('Clicked');
        if(firstNameField.value && lastNameField.value) {
            Promise.resolve(33).then(() => {
                createStudent(enrollField.value,firstNameField.value,lastNameField.value,batchField.value,degreeField.value,departmentField.value);
                document.querySelector('.student-form-popup').remove();
                document.querySelector('.blacklayer').appendChild(loader());  
            }).then(() => {
                document.querySelector("#loader").remove();
                document.querySelector(".blacklayer").appendChild(importSuccess());
            });
            console.log('Here');

        }
        else {
            window.alert('Fill missing details');
        }
    });
    
    form.appendChild(btnAdd);
    form.appendChild(btnClose);
    formContainer.appendChild(form);
    studentMenu.appendChild(formContainer);
    return studentMenu;
}

const uploadStudentForm = () => {
    const uploadMenu = document.createElement('div');
    uploadMenu.classList.add('blacklayer');
    const formContainer = document.createElement('div');
    formContainer.id = "uploadForm";
    formContainer.classList.add("upload-form-popup");
    const form = document.createElement('form');
    form.classList.add('form-container');
    form.name = "uploadForm";
    const formHeading = document.createElement('h1');
    formHeading.id = 'formHeading';
    formHeading.innerHTML = "Upload Student";
    const uploadLabel = document.createElement('label');
    uploadLabel.htmlFor = "uploadInput";
    uploadLabel.innerHTML = "<b>File:</b>";
    const uploadInput = document.createElement('input');
    uploadInput.type = "file";
    uploadInput.classList.add('upload-select');
    uploadInput.accept = 'csv/*';
    uploadInput.addEventListener('change',handleFileUploadChange);
    
    const submitButton = document.createElement('button');
    submitButton.classList.add('file-submit');
    submitButton.innerHTML = "Upload";
    submitButton.classList.add('btnAdd');
    submitButton.id = "btnAdd";
    submitButton.type = "button";
    submitButton.addEventListener('click',handleFileUploadSubmit);
    const btnClose = document.createElement('button');
    btnClose.type = 'button';
    btnClose.innerHTML = "Close";
    btnClose.id = "btnClose";
    btnClose.classList.add('btnClose');
    btnClose.addEventListener('click',() => {
        uploadMenu.remove();
    });
    form.appendChild(formHeading);
    form.appendChild(uploadLabel);
    form.appendChild(uploadInput);
    form.appendChild(submitButton);
    form.appendChild(btnClose);
    formContainer.appendChild(form);
    uploadMenu.appendChild(formContainer);
    return uploadMenu;
}

const addTeacherMenu = () => {
    const teacherMenu = document.createElement('div');
    teacherMenu.classList.add('blacklayer');
    const formContainer = document.createElement('div');
    formContainer.id = "teacherForm";
    formContainer.classList.add("teacher-form-popup");
    const form = document.createElement('form');
    form.classList.add('form-container');
    form.name = "teacherForm";
    const formHeading = document.createElement('h1');
    formHeading.id = 'formHeading';
    formHeading.innerHTML = "Teacher:";
    const facIdLabel = document.createElement('label');
    facIdLabel.htmlFor = "facId";
    facIdLabel.innerHTML = "<b>Faculty Id:</b>";
    const facIdField = document.createElement('input');
    facIdField.type = "text";
    facIdField.name = "facId";
    facIdField.required = true;
    const firstNameLabel = document.createElement('label');
    const lastNameLabel = document.createElement('label');
    firstNameLabel.htmlFor = "firstName";
    firstNameLabel.innerHTML = "<b>First Name:</b>";
    lastNameLabel.htmlFor = "lastName";
    lastNameLabel.innerHTML = "<b>Last Name:</b>";
    const firstNameField = document.createElement('input');
    const lastNameField = document.createElement('input');
    firstNameField.type = "text";
    lastNameField.type = "text";
    firstNameField.name = "firstName";
    lastNameField.name = "lastName";
    firstNameField.required = true;
    lastNameField.required = true;
    const asCodeLabel = document.createElement('label');
    asCodeLabel.htmlFor = "asCode";
    asCodeLabel.innerHTML = "<b>Faculty Code:</b>";
    const asCodeField = document.createElement('input');
    asCodeField.type = "text";
    asCodeField.name = "degreeName";
    asCodeField.required = true;
    const departmentLabel = document.createElement('label');
    departmentLabel.htmlFor = "departmentName";
    departmentLabel.innerHTML = "<b>Department:</b>";
    const departmentField = document.createElement('input');
    departmentField.type = "text";
    departmentField.name = "departmentName";
    departmentField.required = true;
    const positionLabel = document.createElement('label');
    positionLabel.htmlFor = "position";
    positionLabel.innerHTML = "<b>Teacher's Post:</b>";
    const positionField = document.createElement('input');
    positionField.type = "text";
    positionField.name = "position";
    positionField.required = true;
    form.appendChild(formHeading);
    form.appendChild(facIdLabel);
    form.appendChild(facIdField);
    form.appendChild(firstNameLabel);
    form.appendChild(firstNameField);
    form.appendChild(lastNameLabel);
    form.appendChild(lastNameField);
    form.appendChild(asCodeLabel);
    form.appendChild(asCodeField);
    form.appendChild(positionLabel);
    form.appendChild(positionField);
    form.appendChild(departmentLabel);
    form.appendChild(departmentField);
    const btnClose = document.createElement('button');
    btnClose.type = 'button';
    btnClose.innerHTML = "Close";
    btnClose.id = "btnClose";
    btnClose.classList.add('btnClose');
    btnClose.addEventListener('click',() => {
        teacherMenu.remove();
    });
    const btnAdd = document.createElement('button');
    btnAdd.type = "button";
    btnAdd.innerHTML = "Add";
    btnAdd.id = "btnAdd";
    btnAdd.classList.add('btnAdd');
    btnAdd.addEventListener('click',() => {
        console.log('Clicked');
        if(firstNameField.value && lastNameField.value) {
            Promise.resolve(33).then(() => {
                createTeacher(firstNameField.value,lastNameField.value,asCodeField.value,facIdField.value,positionField.value,departmentField.value);
                document.querySelector('.teacher-form-popup').remove();
                document.querySelector('.blacklayer').appendChild(loader());  
            }).then(() => {
                document.querySelector("#loader").remove();
                document.querySelector(".blacklayer").appendChild(importSuccess());
            });
            console.log('Here');

        }
        else {
            window.alert('Fill missing details');
        }
    });
    
    form.appendChild(btnAdd);
    form.appendChild(btnClose);
    formContainer.appendChild(form);
    teacherMenu.appendChild(formContainer);
    return teacherMenu;
}

const uploadTeacherForm = () => {
    const uploadMenu = document.createElement('div');
    uploadMenu.classList.add('blacklayer');
    const formContainer = document.createElement('div');
    formContainer.id = "uploadForm";
    formContainer.classList.add("upload-form-popup");
    const form = document.createElement('form');
    form.classList.add('form-container');
    form.name = "uploadForm";
    const formHeading = document.createElement('h1');
    formHeading.id = 'formHeading';
    formHeading.innerHTML = "Upload Teacher";
    
    const uploadLabel = document.createElement('label');
    uploadLabel.htmlFor = "uploadInput";
    uploadLabel.innerHTML = "<b>File:</b>";
    const uploadInput = document.createElement('input');
    uploadInput.type = "file";
    uploadInput.classList.add('upload-select');
    uploadInput.accept = 'csv/*';
    uploadInput.addEventListener('change',handleTeacherChange);
    
    const submitButton = document.createElement('button');
    submitButton.classList.add('file-submit');
    submitButton.innerHTML = "Upload";
    submitButton.classList.add('btnAdd');
    submitButton.id = "btnAdd";
    submitButton.type = "button";
    submitButton.addEventListener('click',handleTeacherSubmit);
    const btnClose = document.createElement('button');
    btnClose.type = 'button';
    btnClose.innerHTML = "Close";
    btnClose.id = "btnClose";
    btnClose.classList.add('btnClose');
    btnClose.addEventListener('click',() => {
        uploadMenu.remove();
    });
    form.appendChild(formHeading);
    form.appendChild(uploadLabel);
    form.appendChild(uploadInput);
    form.appendChild(submitButton);
    form.appendChild(btnClose);
    formContainer.appendChild(form);
    uploadMenu.appendChild(formContainer);
    return uploadMenu;
}

const changePasswordForm = () => {
    const changeMenu = document.createElement('div');
    changeMenu.classList.add('blacklayer');
    const formContainer = document.createElement('div');
    formContainer.id = "changeForm";
    formContainer.classList.add("change-form-popup");
    const form = document.createElement('form');
    form.classList.add('form-container');
    form.name = "changeForm";
    const formHeading = document.createElement('h1');
    formHeading.id = 'formHeading';
    formHeading.innerHTML = "Change Password";

    const currentPwdLabel = document.createElement('label');
    currentPwdLabel.htmlFor = "currentPassword";
    currentPwdLabel.innerHTML = "Current Password:";
    const currentPwdField = document.createElement('input');
    currentPwdField.type = "password";
    currentPwdField.name = "currentPassword";
    currentPwdField.id = "currentPwd";

    const newPwdLabel = document.createElement('label');
    newPwdLabel.htmlFor = "newPassword";
    newPwdLabel.innerHTML = "New Password:";
    const newPwdField = document.createElement('input');
    newPwdField.type = "password";
    newPwdField.name = "newPassword";
    newPwdField.id = "newPwd";

    form.appendChild(currentPwdLabel);
    form.appendChild(currentPwdField);
    form.appendChild(newPwdLabel);
    form.appendChild(newPwdField);

    const btnClose = document.createElement('button');
    btnClose.type = 'button';
    btnClose.innerHTML = "Close";
    btnClose.id = "btnClose";
    btnClose.classList.add('btnClose');
    btnClose.addEventListener('click',() => {
        changeMenu.remove();
    });

    const btnAdd = document.createElement('button');
    btnAdd.type = "button";
    btnAdd.innerHTML = "Add";
    btnAdd.id = "btnAdd";
    btnAdd.classList.add('btnAdd');
    btnAdd.addEventListener('click',() => {
        //console.log('Clicked');
        if(currentPwdField.value && newPwdField.value) {
            Promise.resolve(33).then(() => {
                document.querySelector('.change-form-popup').remove();
                document.querySelector('.blacklayer').appendChild(loader());
                updatePassword(currentPwdField.value,newPwdField.value);  
            });
            console.log('Here');

        }
        else {
            window.alert('Fill missing details');
        }
    });
    
    form.appendChild(btnAdd);
    form.appendChild(btnClose);
    formContainer.appendChild(form);
    changeMenu.appendChild(formContainer);
    return changeMenu;
}

const addGroupForm = () => {

    
    const groupMenu = document.createElement('div');
    groupMenu.classList.add('blacklayer');
    

    const formContainer = document.createElement('div');
    formContainer.id = "groupForm";
    formContainer.classList.add("group-form-popup");
    const form = document.createElement('form');
    form.classList.add('form-container');
    form.name = "groupForm";
    const formHeading = document.createElement('h1');
    formHeading.id = 'formHeading';
    formHeading.innerHTML = "Group:";
    
    const groupCodeLabel = document.createElement('label');
    groupCodeLabel.htmlFor = "groupCode";
    groupCodeLabel.innerHTML = "<b>Group Code:</b>";
    const groupCodeField = document.createElement('input');
    groupCodeField.type = "text";
    groupCodeField.name = "groupCode";
    groupCodeField.required = true;

    const groupNameLabel = document.createElement('label');
    groupNameLabel.htmlFor = "groupName";
    groupNameLabel.innerHTML = "<b>Group Name:</b>";
    const groupNameField = document.createElement('input');
    groupNameField.type = "text";
    groupNameField.name = "groupName";
    groupNameField.required = true;
   

    form.appendChild(formHeading);
    form.appendChild(groupCodeLabel);
    form.appendChild(groupCodeField);
    form.appendChild(groupNameLabel);
    form.appendChild(groupNameField);


    const btnClose = document.createElement('button');
    btnClose.type = 'button';
    btnClose.innerHTML = "Close";
    btnClose.id = "btnClose";
    btnClose.classList.add('btnClose');
    btnClose.addEventListener('click',() => {
        groupMenu.remove();
    });

    const btnAdd = document.createElement('button');
    btnAdd.type = "button";
    btnAdd.innerHTML = "Add";
    btnAdd.id = "btnAdd";
    btnAdd.classList.add('btnAdd');
    btnAdd.addEventListener('click',() => {
        console.log('Clicked');
        if(groupCodeField.value && groupNameField.value) {
            Promise.resolve(importGroups).then(() => {
                if(Object.keys(groupDatabaseData).includes(groupCodeField.value)) {
                    window.alert('Group Code Taken');
                    reject();
                } else {
                    createGroup(groupCodeField.value ,groupNameField.value);
                    groupMenu.remove();
                }
            });
            console.log('Here');

        }
        else {
            window.alert('Fill missing details');
        }
    });
    
    form.appendChild(btnAdd);
    form.appendChild(btnClose);
    formContainer.appendChild(form);

    groupMenu.appendChild(formContainer);
    return groupMenu;
}

export {addGroupForm,changePasswordForm,addStudentMenu,uploadStudentForm,addTeacherMenu,uploadTeacherForm};

