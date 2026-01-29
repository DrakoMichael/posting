function showModal(boolean, modal) {
    if (boolean) {
        modal.classList.remove('modal-overlay-hidden');
        modal.classList.add('modal-overlay-visible');
    } else {
        modal.classList.remove('modal-overlay-visible');
        modal.classList.add('modal-overlay-hidden');
    }
}

function loaderShow(boolean, loader, overlay) {
    if (boolean === true) {
        loader.classList.remove('load-overlay');
        loader.classList.add('loader-overlay-active');
        overlay.classList.add('overlay');

    } else {
        loader.classList.remove('loader-overlay-active');
        loader.classList.add('load-overlay');
        overlay.classList.remove('overlay');
    }
}

function showBounceAuth(bounceLogin, bounceProfile) {
    const token = getToken();
    if (token) {
        console.log(token);
        bounceLogin.classList.remove('bounce-overlay-active');
        bounceLogin.classList.add('bounce-overlay');
        bounceProfile.classList.remove('bounce-overlay');
        bounceProfile.classList.add('bounce-overlay-active');
    } else {
        bounceLogin.classList.remove('bounce-overlay');
        bounceLogin.classList.add('bounce-overlay-active');
        bounceProfile.classList.remove('bounce-overlay-active');
        bounceProfile.classList.add('bounce-overlay');
    }
}

function showTextException(message, element) {
    element.innerText = message;
    element.classList.remove('invisible');
    element.classList.add('visible');
}
