import { groupDatabase, particularGroupDatabase,importGroups, importParticularGroups, studentDatabase, importStudents, addStudentToGroup, deleteGroup, deleteStudentFromGroup } from '../connectToFirebase';
import { backArrow } from '../randomFeatures';
import { addGroupForm } from './adminForms';

let group;

const clickF = (() => {
    let listOfData = [];

    const addGroupClick = () => {
        let workWindow = document.querySelector('#workWindow');
        workWindow.innerHTML = "";
        
        let groupAdd = document.createElement('div');
        groupAdd.id = 'add';
        let groupAddButton = document.createElement('div');
        groupAddButton.id = 'addButton';
        groupAddButton.innerHTML = `<i class="fas fa-plus"></i>`;
        groupAddButton.addEventListener('click',() => {
            let groupMenu = addGroupForm();
            document.querySelector('#container').appendChild(groupMenu);
        });
        let addSpan = document.createElement('span');
        addSpan.innerHTML = `Add an individual entry`;
        groupAdd.appendChild(groupAddButton)
        groupAdd.appendChild(addSpan);
        
        // let teacherUpload = document.createElement('div');
        // teacherUpload.id = 'upload';
        // let teacherUploadButton = document.createElement('div');
        // teacherUploadButton.id = "uploadButton";
        // teacherUploadButton.innerHTML = `<i class="fas fa-file-upload"></i>`;
        // teacherUploadButton.addEventListener('click',() => {
        //     let uploadMenu = uploadTeacherForm();
        //     document.querySelector('#container').appendChild(uploadMenu);
        // });
        // let uploadSpan = document.createElement('span');
        // uploadSpan.innerHTML = `Upload a csv file`;
        // teacherUpload.appendChild(teacherUploadButton);
        // teacherUpload.appendChild(uploadSpan);

        let buttonContainer = document.createElement('div');
        buttonContainer.id = 'buttonContainer';
        buttonContainer.appendChild(groupAdd);
        // buttonContainer.appendChild(teacherUpload);
        workWindow.appendChild(buttonContainer);
    }

    const viewGroupClick = () => {
        //operationalData = [];
        listOfData = [...groupDatabase];
        //operationalData = [...listOfData];
        //operations.push({label:'All',value:null});
        viewDOM();
    }

    const viewDOM = () => {
        let workWindow = document.querySelector('#workWindow');
        workWindow.innerHTML = "";
        //let bar = selectBar();
        //workWindow.appendChild(bar);
        //let selector = selectField();
        //workWindow.appendChild(selector);

        let list = listOfGroup(listOfData);
        workWindow.appendChild(list);
    }

    const listOfGroup = (listOfGroups) => {
        let list = document.createElement('div');
        list.id = 'list';
        let listTitle = makeListHeader();
        list.appendChild(listTitle);
        listOfGroups.forEach(x => {
            let element = makeListRow(x);
            list.appendChild(element);
        });
        return list;
    }

    const makeListHeader = () =>{
        const groupCode = document.createElement('div');
        const groupName = document.createElement('div');
        const options = document.createElement('div');
        
        groupCode.classList.add('title');
        groupName.classList.add('title');
        options.classList.add('title');
        
        groupCode.classList.add('groupCode');  
        groupName.classList.add('groupName');
        options.classList.add('options');

        groupCode.innerHTML = 'Group Code';
        groupName.innerHTML = 'Group Name';
        options.innerHTML = 'Options';

        const title = document.createElement('div');
        title.id = 'titleRow';
        title.appendChild(groupCode);
        title.appendChild(groupName);
        title.appendChild(options);
        
        return title;
    }

    const makeListRow = (x) => {
        const groupCode = document.createElement('div');
        const groupName = document.createElement('div');
        const options = optionSetup(x);
        
        groupCode.classList.add('element');
        groupName.classList.add('element');
        options.classList.add('element');
        
        groupCode.classList.add('groupCode');  
        groupName.classList.add('groupName');
        options.classList.add('options');

        groupCode.innerHTML = x.groupCode;
        groupName.innerHTML = x.groupName;
        //options.innerHTML = 'Options';

        const title = document.createElement('div');
        title.id = 'elementRow';
        title.appendChild(groupCode);
        title.appendChild(groupName);
        title.appendChild(options);
        
        return title;
    }

    const optionSetup = (x) => {
        const options = document.createElement('div');
        options.classList.add('options');
        //options.innerHTML = `<button></button><button></button>`;
        options.classList.add('element');
        const deleteButton = document.createElement('button');
        const addButton = document.createElement('button');
        const viewButton = document.createElement('button');
        const trashButton = document.createElement('button');

        deleteButton.innerHTML = `<i class="fas fa-user-minus"></i>`;
        addButton.innerHTML = `<i class="fas fa-user-plus"></i>`;
        viewButton.innerHTML = `<i class="far fa-eye"></i>`;
        trashButton.innerHTML = `<i class="fas fa-trash-alt"></i>`;
        
        deleteButton.addEventListener('click',() => {
            //executeDeleteStudent(x);
            group = x;
            viewRemove.viewClick(group);
        });
        addButton.addEventListener('click',() => {
            //console.log(editButton.parentElement.parentElement);
            //editableMaker(editButton.parentElement.parentElement,x);
            group = x;
            viewAdd.viewClick(group);
        });

        viewButton.addEventListener('click',() => {
            group = x;
            viewView.viewClick(group);
        })

        trashButton.addEventListener('click',() => {viewDelete.deleteButtonClick(x)});

        options.appendChild(addButton);
        options.appendChild(trashButton);
        options.appendChild(deleteButton);
        options.appendChild(viewButton);
        return options;
    }

    return {addGroupClick,viewGroupClick,viewDOM};
})();

const viewAdd = (() => {
    let listOfData = [];
    let operationalData = [];
    let operations = [];
    const viewClick = (x) => {
        Promise.resolve(importParticularGroups(x.groupCode)).then(importStudents).then(toAddStudentList);
    }

    const toAddStudentList = () => {
        let totalStudents = [...studentDatabase];
        console.log(particularGroupDatabase);
        let alreadyStudent = [...particularGroupDatabase];
        console.log(alreadyStudent);
        let filteredList = [];
        let f = 0;
        for(let i = 0; i < totalStudents.length; i++) {
            f = 0;
            for(let j = 0; j < alreadyStudent.length; j++) {
                if(alreadyStudent[j].enroll === totalStudents[i].enroll)
                {   
                    f = 1 
                    break;
                }
            }
            if(f === 0)
                filteredList.push(totalStudents[i]);
        }
        operationalData = [];
        operations = [];
        listOfData = [...filteredList];
        operationalData.push(listOfData);
        operations.push({label:'All',value:null});
        console.log(filteredList);
        viewDOM();
    }

    const viewDOM = () => {
        let workWindow = document.querySelector('#workWindow');
        workWindow.innerHTML = "";
        let bar = selectBar();
        workWindow.appendChild(bar);
        let listBack = backArrow(clickF.viewDOM);
        workWindow.appendChild(listBack);
        let selector = selectField();
        workWindow.appendChild(selector);
        let list = viewStudent(listOfData);
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
                value: 'degree',
                label: 'By Degree'
            },
            {
                value: 'batch',
                label: 'By Batch'
            },
            {
                value: 'enroll',
                label: 'By Enrollment Number'
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

    const operateOnList = (parameter) => {
        listOfData = listOfData.filter(x => x[parameter.label] == parameter.value);
        operations.push(parameter);
        operationalData.push(listOfData);
        //console.log(listOfData,parameter,operations);
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

    const barClick = (e) => {
        let workWindow = document.querySelector('#workWindow');
        workWindow.innerHTML = '';
        let index = e.target.indexOfOperation;
        listOfData = operationalData[index];
        operationalData = operationalData.slice(0,index+1);
        operations = operations.slice(0,index+1);
        viewDOM();
    }

    const viewStudent = (listOfStudents) => {
        let list = document.createElement('div');
        list.id = 'list';
        let listTitle = makeListHeader();
        list.appendChild(listTitle);
        listOfStudents.forEach(x => {
            let element = makeListRow(x);
            list.appendChild(element);
        });
        return list;
    }

    const makeListHeader = () =>{
        const enroll = document.createElement('div');
        const firstName = document.createElement('div');
        const lastName = document.createElement('div');
        const batch = document.createElement('div');
        const dept = document.createElement('div');
        const degree = document.createElement('div');
        const options = document.createElement('div');
        enroll.classList.add('title');
        firstName.classList.add('title');
        lastName.classList.add('title');
        batch.classList.add('title');
        dept.classList.add('title');
        degree.classList.add('title');
        options.classList.add('title');
        enroll.classList.add('enroll');
        firstName.classList.add('firstName');
        lastName.classList.add('lastName');
        batch.classList.add('batch');
        dept.classList.add('dept');
        degree.classList.add('degree');
        options.classList.add('options');
        enroll.innerHTML = 'Enroll No.';
        firstName.innerHTML = 'First Name';
        lastName.innerHTML = 'Last Name';
        batch.innerHTML = 'Batch';
        dept.innerHTML = 'Department';
        degree.innerHTML = 'Degree';
        options.innerHTML = 'Options';
        const title = document.createElement('div');
        title.id = 'titleRow';
        title.appendChild(enroll);
        title.appendChild(firstName);
        title.appendChild(lastName);
        title.appendChild(batch);
        title.appendChild(dept);
        title.appendChild(degree);
        title.appendChild(options);
        return title;
    }

    const makeListRow = (x) => {
        const enroll = document.createElement('div');
        const firstName = document.createElement('div');
        const lastName = document.createElement('div');
        const batch = document.createElement('div');
        const dept = document.createElement('div');
        const degree = document.createElement('div');
        const options = optionSetup(x);
        
        enroll.classList.add('element');
        firstName.classList.add('element');
        lastName.classList.add('element');
        batch.classList.add('element');
        dept.classList.add('element');
        degree.classList.add('element');

        enroll.classList.add('enroll');
        firstName.classList.add('firstName');
        lastName.classList.add('lastName');
        batch.classList.add('batch');
        dept.classList.add('dept');
        degree.classList.add('degree');
        
        enroll.innerHTML = x.enroll;
        firstName.innerHTML = x.firstName;
        lastName.innerHTML = x.lastName;
        batch.innerHTML = x.batch;
        dept.innerHTML = x.dept;
        degree.innerHTML = x.degree;
        
        const element = document.createElement('div');
        element.id = 'elementRow';
        element.appendChild(enroll);
        element.appendChild(firstName);
        element.appendChild(lastName);
        element.appendChild(batch);
        element.appendChild(dept);
        element.appendChild(degree);
        element.appendChild(options);

        return element;
    }

    const optionSetup = (x) => {
        const options = document.createElement('div');
        options.classList.add('options');
        options.classList.add('element');
        const addButton = document.createElement('button');
        addButton.innerHTML = `<i class="fas fa-plus"></i>`;
        addButton.addEventListener('click',() => {
            console.log('Click');
            Promise.resolve(addStudentToGroup(group.groupCode,x)).then(viewClick(group));
        });
        options.appendChild(addButton);
        return options;
    }
    return {viewClick}
})();

const viewView = (() => {
    let listOfData = [];
    let operationalData = [];
    let operations = [];
    
    const viewClick = (x) => {
        Promise.resolve(importParticularGroups(x.groupCode)).then(importStudents).then(toViewStudentList);
    }

    const toViewStudentList = () => {
        let alreadyStudent = [...particularGroupDatabase];
        let student = [...studentDatabase];
        let filteredList = [];
        for(let i =0; i < alreadyStudent.length;i++) {
            for(let j = 0; j < student.length; j++) {
                if(alreadyStudent[i].enroll === student[j].enroll) {
                    filteredList.push(student[j]);
                    break;
                }
            }
        }
        operationalData = [];
        operations = [];
        listOfData = [...filteredList];
        operationalData.push(listOfData);
        operations.push({label:'All',value:null});
        console.log(filteredList);
        viewDOM();
    }

    const viewDOM = () => {
        let workWindow = document.querySelector('#workWindow');
        workWindow.innerHTML = "";
        let bar = selectBar();
        workWindow.appendChild(bar);
        let listBack = backArrow(clickF.viewDOM);
        workWindow.appendChild(listBack);
        let selector = selectField();
        workWindow.appendChild(selector);
        let list = viewStudent(listOfData);
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
                value: 'degree',
                label: 'By Degree'
            },
            {
                value: 'batch',
                label: 'By Batch'
            },
            {
                value: 'enroll',
                label: 'By Enrollment Number'
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

    const operateOnList = (parameter) => {
        listOfData = listOfData.filter(x => x[parameter.label] == parameter.value);
        operations.push(parameter);
        operationalData.push(listOfData);
        //console.log(listOfData,parameter,operations);
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

    const barClick = (e) => {
        let workWindow = document.querySelector('#workWindow');
        workWindow.innerHTML = '';
        let index = e.target.indexOfOperation;
        listOfData = operationalData[index];
        operationalData = operationalData.slice(0,index+1);
        operations = operations.slice(0,index+1);
        viewDOM();
    }

    const viewStudent = (listOfStudents) => {
        let list = document.createElement('div');
        list.id = 'list';
        let listTitle = makeListHeader();
        list.appendChild(listTitle);
        listOfStudents.forEach(x => {
            let element = makeListRow(x);
            list.appendChild(element);
        });
        return list;
    }

    const makeListHeader = () =>{
        const enroll = document.createElement('div');
        const firstName = document.createElement('div');
        const lastName = document.createElement('div');
        const batch = document.createElement('div');
        const dept = document.createElement('div');
        const degree = document.createElement('div');
        
        enroll.classList.add('title');
        firstName.classList.add('title');
        lastName.classList.add('title');
        batch.classList.add('title');
        dept.classList.add('title');
        degree.classList.add('title');
        
        enroll.classList.add('enroll');
        firstName.classList.add('firstName');
        lastName.classList.add('lastName');
        batch.classList.add('batch');
        dept.classList.add('dept');
        degree.classList.add('degree');
        
        enroll.innerHTML = 'Enroll No.';
        firstName.innerHTML = 'First Name';
        lastName.innerHTML = 'Last Name';
        batch.innerHTML = 'Batch';
        dept.innerHTML = 'Department';
        degree.innerHTML = 'Degree';
        
        const title = document.createElement('div');
        title.id = 'titleRow';
        title.appendChild(enroll);
        title.appendChild(firstName);
        title.appendChild(lastName);
        title.appendChild(batch);
        title.appendChild(dept);
        title.appendChild(degree);
        
        return title;
    }

    const makeListRow = (x) => {
        const enroll = document.createElement('div');
        const firstName = document.createElement('div');
        const lastName = document.createElement('div');
        const batch = document.createElement('div');
        const dept = document.createElement('div');
        const degree = document.createElement('div');
        
        enroll.classList.add('element');
        firstName.classList.add('element');
        lastName.classList.add('element');
        batch.classList.add('element');
        dept.classList.add('element');
        degree.classList.add('element');

        enroll.classList.add('enroll');
        firstName.classList.add('firstName');
        lastName.classList.add('lastName');
        batch.classList.add('batch');
        dept.classList.add('dept');
        degree.classList.add('degree');
        
        enroll.innerHTML = x.enroll;
        firstName.innerHTML = x.firstName;
        lastName.innerHTML = x.lastName;
        batch.innerHTML = x.batch;
        dept.innerHTML = x.dept;
        degree.innerHTML = x.degree;
        
        const element = document.createElement('div');
        element.id = 'elementRow';
        element.appendChild(enroll);
        element.appendChild(firstName);
        element.appendChild(lastName);
        element.appendChild(batch);
        element.appendChild(dept);
        element.appendChild(degree);

        return element;
    }

    return {viewClick}

})();

const viewDelete = (() => {
    const deleteButtonClick = (x) => {
        Promise.resolve(deleteGroup(x)).then(() => {importGroups().then(clickF.viewGroupClick)});   
    }
    return {deleteButtonClick};
})();

const viewRemove = (() => {
    let listOfData = [];
    let operationalData = [];
    let operations = [];
    
    const viewClick = (x) => {
        Promise.resolve(importParticularGroups(x.groupCode)).then(importStudents).then(toViewStudentList);
    }

    const toViewStudentList = () => {
        let alreadyStudent = [...particularGroupDatabase];
        let student = [...studentDatabase];
        let filteredList = [];
        for(let i =0; i < alreadyStudent.length;i++) {
            for(let j = 0; j < student.length; j++) {
                if(alreadyStudent[i].enroll === student[j].enroll) {
                    filteredList.push(student[j]);
                    break;
                }
            }
        }
        operationalData = [];
        operations = [];
        listOfData = [...filteredList];
        operationalData.push(listOfData);
        operations.push({label:'All',value:null});
        console.log(filteredList);
        viewDOM();
    }

    const viewDOM = () => {
        let workWindow = document.querySelector('#workWindow');
        workWindow.innerHTML = "";
        let bar = selectBar();
        workWindow.appendChild(bar);
        let listBack = backArrow(clickF.viewDOM);
        workWindow.appendChild(listBack);
        let selector = selectField();
        workWindow.appendChild(selector);
        let list = viewStudent(listOfData);
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
                value: 'degree',
                label: 'By Degree'
            },
            {
                value: 'batch',
                label: 'By Batch'
            },
            {
                value: 'enroll',
                label: 'By Enrollment Number'
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

    const operateOnList = (parameter) => {
        listOfData = listOfData.filter(x => x[parameter.label] == parameter.value);
        operations.push(parameter);
        operationalData.push(listOfData);
        //console.log(listOfData,parameter,operations);
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

    const barClick = (e) => {
        let workWindow = document.querySelector('#workWindow');
        workWindow.innerHTML = '';
        let index = e.target.indexOfOperation;
        listOfData = operationalData[index];
        operationalData = operationalData.slice(0,index+1);
        operations = operations.slice(0,index+1);
        viewDOM();
    }

    const viewStudent = (listOfStudents) => {
        let list = document.createElement('div');
        list.id = 'list';
        let listTitle = makeListHeader();
        list.appendChild(listTitle);
        listOfStudents.forEach(x => {
            let element = makeListRow(x);
            list.appendChild(element);
        });
        return list;
    }

    const makeListHeader = () =>{
        const enroll = document.createElement('div');
        const firstName = document.createElement('div');
        const lastName = document.createElement('div');
        const batch = document.createElement('div');
        const dept = document.createElement('div');
        const degree = document.createElement('div');
        const options = document.createElement('div');
        enroll.classList.add('title');
        firstName.classList.add('title');
        lastName.classList.add('title');
        batch.classList.add('title');
        dept.classList.add('title');
        degree.classList.add('title');
        options.classList.add('title');
        enroll.classList.add('enroll');
        firstName.classList.add('firstName');
        lastName.classList.add('lastName');
        batch.classList.add('batch');
        dept.classList.add('dept');
        degree.classList.add('degree');
        options.classList.add('options');        
        enroll.innerHTML = 'Enroll No.';
        firstName.innerHTML = 'First Name';
        lastName.innerHTML = 'Last Name';
        batch.innerHTML = 'Batch';
        dept.innerHTML = 'Department';
        degree.innerHTML = 'Degree';
        options.innerHTML = 'Options';
        const title = document.createElement('div');
        title.id = 'titleRow';
        title.appendChild(enroll);
        title.appendChild(firstName);
        title.appendChild(lastName);
        title.appendChild(batch);
        title.appendChild(dept);
        title.appendChild(degree);
        title.appendChild(options);
        return title;
    }

    const makeListRow = (x) => {
        const enroll = document.createElement('div');
        const firstName = document.createElement('div');
        const lastName = document.createElement('div');
        const batch = document.createElement('div');
        const dept = document.createElement('div');
        const degree = document.createElement('div');
        const options = optionSetup(x);
        
        enroll.classList.add('element');
        firstName.classList.add('element');
        lastName.classList.add('element');
        batch.classList.add('element');
        dept.classList.add('element');
        degree.classList.add('element');

        enroll.classList.add('enroll');
        firstName.classList.add('firstName');
        lastName.classList.add('lastName');
        batch.classList.add('batch');
        dept.classList.add('dept');
        degree.classList.add('degree');
        
        enroll.innerHTML = x.enroll;
        firstName.innerHTML = x.firstName;
        lastName.innerHTML = x.lastName;
        batch.innerHTML = x.batch;
        dept.innerHTML = x.dept;
        degree.innerHTML = x.degree;
        
        const element = document.createElement('div');
        element.id = 'elementRow';
        element.appendChild(enroll);
        element.appendChild(firstName);
        element.appendChild(lastName);
        element.appendChild(batch);
        element.appendChild(dept);
        element.appendChild(degree);
        element.appendChild(options);

        return element;
    }

    const optionSetup = (x) => {
        const options = document.createElement('div');
        options.classList.add('options');
        options.classList.add('element');
        const removeButton = document.createElement('button');
        removeButton.innerHTML = `<i class="fas fa-minus-circle"></i>`;
        removeButton.addEventListener('click',() => {
            console.log('Click');
            //executeDeleteStudent(x);
            // Promise.resolve(() => {addStudentToGroup(group.groupCode,x)
            //     console.log('DOne 2');
            // }).then(() => {viewClick(group);});
            Promise.resolve(deleteStudentFromGroup(group.groupCode,x.enroll)).then(viewClick(group));
        });
        options.appendChild(removeButton);
        return options;
    }

    return {viewClick}

})();

export {clickF};