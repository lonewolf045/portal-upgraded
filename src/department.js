import { importDepartment,db } from "./connectToFirebase";

const department = (deptName,deptCode,degrees) => {
    return {deptName,deptCode,degrees};
}

const createDepartment = (departmentName,code) => {
    let newDepartment = department(departmentName,code,[]);
    let dataRef = db.ref().child('Departments/'+code);
    dataRef.set(newDepartment);
    importDepartment();
}

export {createDepartment};