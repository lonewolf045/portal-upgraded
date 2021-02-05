const btnLogout = document.querySelector("#logout-button-student");
const loginBtn = document.querySelector(".open-login-button");


const welcomeMessage = function (user) {
    const use = document.querySelector(".welcome-message");
    use.innerHTML = "Welcome, " + user;
}

const loginStudentDOM = (username) => {
    welcomeMessage(username);
    changeButton();
}

const changeButton = () => {
    loginBtn.style.display = "none";
    btnLogout.style.display = "block";
}


export {loginStudentDOM};