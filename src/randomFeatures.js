import './randomFeatures.css';

const loader = () => {
    const loaderDiv = document.createElement('div');
    loaderDiv.innerHTML = `<i class="fas fa-spinner fa-pulse"></i>`;
    loaderDiv.id = "loader";
    return loaderDiv;
}

const importFail = () => {
    const failDiv = document.createElement('div');
    failDiv.innerHTML = `Import Failed!!!!!!!`;
    const btnClose = document.createElement('button');
    btnClose.type = 'button';
    btnClose.innerHTML = "Close";
    btnClose.id = "btnClose";
    btnClose.classList.add('btnClose');
    btnClose.addEventListener('click',() => {
        document.querySelector('.blacklayer').remove();
    });
    const failedContainer = document.createElement('div');
    failedContainer.classList.add('form-container');
    failedContainer.id = 'fail';
    failedContainer.appendChild(failDiv);
    failedContainer.appendChild(btnClose);
    return failedContainer;
}

const importSuccess = () => {
    const failDiv = document.createElement('div');
    failDiv.innerHTML = `Import Successful!!!!!!!`;
    const btnClose = document.createElement('button');
    btnClose.type = 'button';
    btnClose.innerHTML = "Close";
    btnClose.id = "btnClose";
    btnClose.classList.add('btnClose');
    btnClose.addEventListener('click',() => {
        document.querySelector('.blacklayer').remove();
    });
    const failedContainer = document.createElement('div');
    failedContainer.classList.add('form-container');
    failedContainer.id = 'success';
    failedContainer.appendChild(failDiv);
    failedContainer.appendChild(btnClose);
    return failedContainer;
}

const failureMessage = () => {
    const failDiv = document.createElement('div');
    failDiv.innerHTML = `Process Failed!!!!!!!`;
    const btnClose = document.createElement('button');
    btnClose.type = 'button';
    btnClose.innerHTML = "Close";
    btnClose.id = "btnClose";
    btnClose.classList.add('btnClose');
    btnClose.addEventListener('click',() => {
        document.querySelector('.blacklayer').remove();
    });
    const failedContainer = document.createElement('div');
    failedContainer.classList.add('form-container');
    failedContainer.id = 'fail';
    failedContainer.appendChild(failDiv);
    failedContainer.appendChild(btnClose);
    return failedContainer;
}
const successMessage = () => {
    const failDiv = document.createElement('div');
    failDiv.innerHTML = `Process Successful!!!!!!!`;
    const btnClose = document.createElement('button');
    btnClose.type = 'button';
    btnClose.innerHTML = "Close";
    btnClose.id = "btnClose";
    btnClose.classList.add('btnClose');
    btnClose.addEventListener('click',() => {
        document.querySelector('.blacklayer').remove();
    });
    const failedContainer = document.createElement('div');
    failedContainer.classList.add('form-container');
    failedContainer.id = 'success';
    failedContainer.appendChild(failDiv);
    failedContainer.appendChild(btnClose);
    return failedContainer; 
}

const backArrow = (menuFunction) => {
    const backArrowDiv = document.createElement('button');
    const backArrowImage = document.createElement('img');
    backArrowDiv.id = "backArrow";
    backArrowImage.id = "backArrowImage";
    backArrowImage.src = "https://www.pinclipart.com/picdir/big/130-1304091_left-svg-icon-free-icon-back-arrow-png.png";
    backArrowImage.width = "60";
    backArrowImage.height = "40";
    backArrowDiv.appendChild(backArrowImage);
    backArrowDiv.addEventListener('click',() => {
        
        menuFunction();
        console.log('Clicked back');
    });
    return backArrowDiv;
}

const areYouSure = () => {
    const sureMenu = document.createElement('div');
    sureMenu.classList.add('blacklayer');
    const formContainer = document.createElement('div');
    formContainer.id = "sureForm";
    formContainer.classList.add("sure-form-popup");
    const form = document.createElement('form');
    form.classList.add('form-container');
    form.name = "sureForm";
    const formHeading = document.createElement('h1');
    formHeading.id = 'formHeading';
    formHeading.innerHTML = "Are you sure??";
    form.appendChild(formHeading);
    const btnClose = document.createElement('button');
    btnClose.type = 'button';
    btnClose.innerHTML = "Close";
    btnClose.id = "btnClose";
    btnClose.classList.add('btnClose');
    btnClose.addEventListener('click',() => {
        sureMenu.remove();
    });
    const btnAdd = document.createElement('button');
    btnAdd.type = "button";
    btnAdd.innerHTML = "Sure";
    btnAdd.id = "btnAdd";
    btnAdd.classList.add('btnAdd');
    btnAdd.addEventListener('click',() => {
        btnClose.click();
        return 'sure';
    });

    form.appendChild(btnAdd);
    form.appendChild(btnClose);
    formContainer.appendChild(form);
    sureMenu.appendChild(formContainer);
    document.querySelector('#workWindow').appendChild(sureMenu);
}

export {backArrow,loader,importFail,importSuccess,areYouSure,successMessage,failureMessage};