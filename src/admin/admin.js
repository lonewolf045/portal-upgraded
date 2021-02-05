const admin = (username,password) => {
    return {username,password};
};

const newAdmin = (username,password) => {
    let adminGod = admin(username,password);
}

export {newAdmin};