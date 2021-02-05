import { db, importDegreeBatches } from './connectToFirebase';
import {adminDeg, adminDept} from './index';

const batch = (batchName,batchCode,students) => {
    return {batchName,batchCode,students};
}

const createBatch = (batchName,batchCode) => {
    let newBatch = batch(batchName,batchCode,[]);
    let degCode = adminDeg.degShort.split(".").join("");
    let dataRef = db.ref().child('Departments/'+adminDept.deptCode+'/Degrees/'+degCode+'/Batches/'+batchCode);
    dataRef.set(newBatch);
    importDegreeBatches(adminDept.deptCode,adminDeg.degShort);

}

export {createBatch};