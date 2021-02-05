const storeStudentToTable = (newStudent) => {
    const URL = 'http://localhost:3000/students';
    var xhr = new XMLHttpRequest();
    xhr.open("POST",URL,true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(newStudent));
}

export {storeStudentToTable}