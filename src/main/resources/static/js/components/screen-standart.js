function alertAuthentication(validate, modalPosition, modal, textAlert) {
    if (validate) {
        showModal(true, modalPosition);
        showModal(true, modal);
        showTextException("Login Necessário", textAlert);
    } else {
        if (!authenticated()) {
            showModal(true, modalPosition);
            showModal(true, modal);
            showTextException("Login Necessário", textAlert);
        }
    }

}

function showModal(boolean, modal) {
    if (boolean) {
        modal.classList.remove('invisible');
        modal.classList.remove('modal-animation-close');
        modal.classList.add('visible');
        modal.classList.add('modal-animation-open');
    } else {
        modal.classList.remove('visible');
        modal.classList.remove('modal-animation-open');
        modal.classList.add('modal-animation-close');
        modal.classList.add('invisible');
    }
}

function activeExitModal(boolean, modal) {
    if (boolean) {
        modal.addEventListener('click', () => {
            showModal(false, modal);
        })
    } else {
        modal.addEventListener('click', () => {
            showModal(true, modal);
        })
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

function replaceImage(element, directory) {
    element.src = directory;
}

function showTextException(message, element) {
    element.innerText = message;
    element.classList.remove('invisible');
    element.classList.add('visible');
}
