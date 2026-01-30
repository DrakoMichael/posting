function showModal(boolean, modal) {
    if (boolean) {
        modal.classList.remove('invisible');
        modal.classList.add('visible');
    } else {
        modal.classList.remove('visible');
        modal.classList.add('invisible');
    }
}

function loaderShow(boolean, loader, overlay) {
    if (boolean === true) {
        loader.classList.remove('invisible');
        loader.classList.add('visible');
        overlay.classList.add('overlay');

    } else {
        loader.classList.remove('visible');
        loader.classList.add('invisible');
        overlay.classList.remove('overlay');
    }
}

function showBounceAuth(bounceLogin, bounceProfile) {
    const token = getToken();
    if (token) {
        console.log(token);
        bounceLogin.classList.remove('display-visible');
        bounceLogin.classList.add('display-invisible');
        bounceProfile.classList.remove('display-invisible');
        bounceProfile.classList.add('display-visible');
    } else {
        bounceLogin.classList.remove('display-invisible');
        bounceLogin.classList.add('display-visible');
        bounceProfile.classList.remove('display-visible');
        bounceProfile.classList.add('display-invisible');
    }
}

function showTextException(message, element) {
    element.innerText = message;
    element.classList.remove('invisible');
    element.classList.add('visible');
}
