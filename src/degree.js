import { adminDept } from "./index";
import { importDegree,db } from "./connectToFirebase";

const degree = (degName,degShort,batches) => {
    //let batches;
    return {degName,degShort,batches};
};

const createDegree = (degName,degShort) => {
    let newDegree = degree(degName,degShort,[]);
    let degCode = degShort.split('.').join("");
    let dataRef = db.ref().child('Departments/'+adminDept.deptCode+'/Degrees/'+degCode);
    dataRef.set(newDegree);
    importDegree(adminDept.deptCode);
};

export {createDegree};