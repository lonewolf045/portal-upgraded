//const { storeGroup } = require("./connectToFirebase");
import {storeGroup} from './connectToFirebase';

const group = (groupCode,groupName,groupStudents) => {
    return {groupCode,groupName,groupStudents};
}

const createGroup = (groupCode,groupName) => {
    let newGroup = group(groupCode,groupName,new Array());
    storeGroup(newGroup);
}

export {createGroup};