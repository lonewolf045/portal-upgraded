import {adminTeacherUpdate, deleteTeacher, importTeachers, teacherDatabase} from '../connectToFirebase'
import { areYouSure } from '../randomFeatures';
import {addTeacherMenu,uploadTeacherForm} from './adminForms'; 

let listOfData = [];
let operationalData = [];
let operations = [];

const addTeacherClick = () => {
    let workWindow = document.querySelector('#workWindow');
    workWindow.innerHTML = "";
    
    let teacherAdd = document.createElement('div');
    teacherAdd.id = 'add';
    let teacherAddButton = document.createElement('div');
    teacherAddButton.id = 'addButton';
    teacherAddButton.innerHTML = `<i class="fas fa-plus"></i>`;
    teacherAddButton.addEventListener('click',() => {
        let teacherMenu = addTeacherMenu();
        document.querySelector('#container').appendChild(teacherMenu);
    });
    let addSpan = document.createElement('span');
    addSpan.innerHTML = `Add an individual entry`;
    teacherAdd.appendChild(teacherAddButton)
    teacherAdd.appendChild(addSpan);
    
    let teacherUpload = document.createElement('div');
    teacherUpload.id = 'upload';
    let teacherUploadButton = document.createElement('div');
    teacherUploadButton.id = "uploadButton";
    teacherUploadButton.innerHTML = `<i class="fas fa-file-upload"></i>`;
    teacherUploadButton.addEventListener('click',() => {
        let uploadMenu = uploadTeacherForm();
        document.querySelector('#container').appendChild(uploadMenu);
    });
    let uploadSpan = document.createElement('span');
    uploadSpan.innerHTML = `Upload a csv file`;
    teacherUpload.appendChild(teacherUploadButton);
    teacherUpload.appendChild(uploadSpan);

    let buttonContainer = document.createElement('div');
    buttonContainer.id = 'buttonContainer';
    buttonContainer.appendChild(teacherAdd);
    buttonContainer.appendChild(teacherUpload);
    workWindow.appendChild(buttonContainer);
}

const viewTeacherClick = () => {
    operationalData = [];
    operations = [];
    listOfData = [...teacherDatabase];
    operationalData.push(listOfData);
    operations.push({label:'All',value:null});
    viewDOM();
}

const viewDOM = () => {
    let workWindow = document.querySelector('#workWindow');
    workWindow.innerHTML = "";
    let bar = selectBar();
    workWindow.appendChild(bar);
    let selector = selectField();
    workWindow.appendChild(selector);

    let list = listOfTeacher(listOfData);
    workWindow.appendChild(list);
}

const selectBar = () => {
    const bar = document.createElement('div');
    bar.id = 'paraBar';
    operations.forEach((x,i) => {
        let sec = makeSection(x,i);
        bar.appendChild(sec);
    })
    return bar;
}

const selectField = () => {
    const viewForm = document.createElement('form');
    viewForm.name = "viewForm";
    viewForm.id = "viewForm";
    const label1 = document.createElement('label');
    label1.for ='selector';
    label1.innerHTML = '<b>Choose a field: </b>';
    const options = [
        {
            value: 'lastName',
            label: 'By Lastname'
        },
        {
            value: 'firstName',
            label: 'By Firstname'
        },
        {
            value: 'dept',
            label: 'By Department'
        },
        {
            value: 'position',
            label: 'By Position'
        },
        {
            value: 'asCode',
            label: 'By Faculty Code'
        },
        {
            value: 'facId',
            label: 'By Faculty Id'
        }
    ];
    const dropDown = document.createElement('select');
    dropDown.name = 'selector';
    dropDown.id = 'selector';
    dropDown.innerHTML = `<option value = "" disable selected>Choose an option</option>`;
    options.forEach(x => {
        const op = document.createElement('option');
        op.value = x.value;
        op.innerHTML = x.label;
        dropDown.appendChild(op);
    });
    const paraDiv = document.createElement('div');
    paraDiv.id = 'paraDiv';
    const paraLabel = document.createElement('label');
    paraLabel.innerHTML = 'Enter the parameter:';
    paraLabel.for = 'parameter';
    const paraInput = document.createElement('input');
    paraInput.type = 'text';
    paraInput.name = 'parameter';
    paraInput.id = 'parameter';
    const goButton = document.createElement('button');
    goButton.type = 'button';
    goButton.innerHTML = 'Go';
    goButton.id = 'btnGo';
    goButton.name = "btnGo";
    goButton.addEventListener('click', () => {
        let param = {label: dropDown.value,value: paraInput.value};
        operateOnList(param);
        let workWindow = document.querySelector('#workWindow');
        workWindow.innerHTML = '';
        viewDOM();
    });
    paraInput.addEventListener('change',()=> {
        goButton.style.display = "block";
    });
    paraDiv.appendChild(paraLabel);
    paraDiv.appendChild(paraInput);
    paraDiv.appendChild(goButton);
    dropDown.addEventListener('input',() => {
        paraDiv.style.display = "block";
    })
    viewForm.appendChild(label1);
    viewForm.appendChild(dropDown);
    viewForm.appendChild(paraDiv);
    return viewForm;
}

const listOfTeacher = (listOfTeachers) => {
    let list = document.createElement('div');
    list .id = 'list';
    let listTitle = makeListHeader();
    list.appendChild(listTitle);
    listOfTeachers.forEach(x => {
        let element = makeListRow(x);
        list.appendChild(element);
    });
    return list;
}

const makeListHeader = () =>{
    const facId = document.createElement('div');
    const firstName = document.createElement('div');
    const lastName = document.createElement('div');
    const asCode = document.createElement('div');
    const dept = document.createElement('div');
    const position = document.createElement('div');
    const options = document.createElement('div');
    facId.classList.add('title');
    firstName.classList.add('title');
    lastName.classList.add('title');
    asCode.classList.add('title');
    dept.classList.add('title');
    position.classList.add('title');
    options.classList.add('title');
    facId.classList.add('facId');
    firstName.classList.add('firstName');
    lastName.classList.add('lastName');
    asCode.classList.add('asCode');
    dept.classList.add('dept');
    position.classList.add('position');
    options.classList.add('options');
    facId.innerHTML = 'Faculty Id.';
    firstName.innerHTML = 'First Name';
    lastName.innerHTML = 'Last Name';
    asCode.innerHTML = 'Faculty Code';
    dept.innerHTML = 'Department';
    position.innerHTML = 'Faculty Post';
    options.innerHTML = 'Options';
    const title = document.createElement('div');
    title.id = 'titleRow';
    title.appendChild(facId);
    title.appendChild(firstName);
    title.appendChild(lastName);
    title.appendChild(asCode);
    title.appendChild(position);
    title.appendChild(dept);
    title.appendChild(options);
    return title;
}

const makeListRow = (x) => {
    const facId = document.createElement('div');
    const firstName = document.createElement('div');
    const lastName = document.createElement('div');
    const asCode = document.createElement('div');
    const dept = document.createElement('div');
    const position = document.createElement('div');
    const options = optionSetup(x);
    
    facId.classList.add('element');
    firstName.classList.add('element');
    lastName.classList.add('element');
    asCode.classList.add('element');
    dept.classList.add('element');
    position.classList.add('element');
    
    facId.classList.add('facId');
    firstName.classList.add('firstName');
    lastName.classList.add('lastName');
    asCode.classList.add('asCode');
    dept.classList.add('dept');
    position.classList.add('position');
    
    facId.innerHTML = x.facId;
    firstName.innerHTML = x.firstName;
    lastName.innerHTML = x.lastName;
    asCode.innerHTML = x.asCode;
    dept.innerHTML = x.dept;
    position.innerHTML = x.position;
    const element = document.createElement('div');
    element.id = 'elementRow';
    element.appendChild(facId);
    element.appendChild(firstName);
    element.appendChild(lastName);
    element.appendChild(asCode);
    element.appendChild(position);
    element.appendChild(dept);
    element.appendChild(options);
    return element;
}

const makeSection = (x,i) => {
   const sec = document.createElement('div');
   sec.classList.add('sectionElement');
   let label = x.label;
   label = label.toLowerCase();
   label = label.charAt(0).toUpperCase() + label.slice(1);
   let write;
   if(x.value === null) {
       write = `${label}>`;
   } else {
       write = `${label}(${x.value})>`;
   }
   sec.innerHTML = write;
   sec.indexOfOperation = i;
   sec.addEventListener('click',(e) => {barClick(e)});
   return sec;
}

const operateOnList = (parameter) => {
    listOfData = listOfData.filter(x => x[parameter.label] == parameter.value);
    operations.push(parameter);
    operationalData.push(listOfData);
    console.log(listOfData,parameter,operations);
}

const barClick = (e) => {
    let workWindow = document.querySelector('#workWindow');
    workWindow.innerHTML = '';
    let index = e.target.indexOfOperation;
    listOfData = operationalData[index];
    operationalData = operationalData.slice(0,index+1);
    operations = operations.slice(0,index+1);
    viewDOM();
}

const optionSetup = (x) => {
    const options = document.createElement('div');
    options.classList.add('options');
    //options.innerHTML = `<button></button><button></button>`;
    options.classList.add('element');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
    deleteButton.innerHTML = `<i class="fas fa-trash-alt"></i>`;
    editButton.innerHTML = `<i class="fas fa-edit"></i>`;
    deleteButton.addEventListener('click',() => {
        executeDeleteTeacher(x);
    });
    editButton.addEventListener('click',() => {
        console.log(editButton.parentElement.parentElement);
        editableMaker(editButton.parentElement.parentElement,x);
    });
    options.appendChild(editButton);
    options.appendChild(deleteButton);
    return options;
}

const executeDeleteTeacher = (x) => {
    Promise.resolve(deleteTeacher(x)).then(importTeachers).then(viewTeacherClick);
}

const editableMaker = (ele,x) => {
    ele.innerHTML = "";
    ele.appendChild(editableRow(x));
}

const editableRow = (x) => {
    const facId = document.createElement('input');
    const firstName = document.createElement('input');
    const lastName = document.createElement('input');
    const asCode = document.createElement('input');
    const dept = document.createElement('input');
    const position = document.createElement('input');
    const options = editableOptions();
    
    facId.classList.add('element');
    firstName.classList.add('element');
    lastName.classList.add('element');
    asCode.classList.add('element');
    dept.classList.add('element');
    position.classList.add('element');
    
    facId.classList.add('facId');
    firstName.classList.add('firstName');
    lastName.classList.add('lastName');
    asCode.classList.add('asCode');
    dept.classList.add('dept');
    position.classList.add('position');
    
    facId.value = x.facId;
    facId.disabled = true;
    firstName.value = x.firstName;
    lastName.value = x.lastName;
    asCode.value = x.asCode;
    dept.value = x.dept;
    position.value = x.position;
    const element = document.createElement('div');
    element.id = 'elementRow';
    element.appendChild(facId);
    element.appendChild(firstName);
    element.appendChild(lastName);
    element.appendChild(asCode);
    element.appendChild(position);
    element.appendChild(dept);
    element.appendChild(options);
    return element;
}

const editableOptions = () => {
    const options = document.createElement('div');
    options.classList.add('options');
    //options.innerHTML = `<button></button><button></button>`;
    options.classList.add('element');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
    deleteButton.innerHTML = `<i class="fas fa-times"></i>`;
    editButton.innerHTML = `<i class="fas fa-check"></i>`;
    deleteButton.addEventListener('click',() => {
        viewTeacherClick();
    });
    editButton.addEventListener('click',() => {
        let ele = editButton.parentNode.parentNode;
        let x = {
            'facId': ele.querySelector('.facId').value,
            'firstName': ele.querySelector('.firstName').value,
            'lastName': ele.querySelector('.lastName').value,
            'asCode': ele.querySelector('.asCode').value,
            'position': ele.querySelector('.position').value,
            'dept': ele.querySelector('.dept').value 
        }
        Promise.resolve(adminTeacherUpdate(x)).then(importTeachers).then(viewTeacherClick);
    });
    options.appendChild(editButton);
    options.appendChild(deleteButton);
    return options;
}

export {addTeacherClick,viewTeacherClick};


