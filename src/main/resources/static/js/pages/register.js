document.addEventListener('DOMContentLoaded', function () {

    // Screen Default
    const overlay = document.getElementById('overlay');
    const loader = document.getElementById('loader');

    // Document
    const modalLogin = document.getElementById('modal-login');
    const modalRegister = document.getElementById('modal-register');
    const form = document.getElementById('form-register');
    const inputName = document.getElementById('register-name');
    const inputEmail = document.getElementById('register-email');
    const inputPassword = document.getElementById('register-password');
    const btnSubmit = document.getElementById('register-submit');
    const message = document.getElementById('register-message');
    const buttonLoginRedirect = document.getElementById('button-login-redirect');

    // Components
    buttonLoginRedirect.addEventListener('click', () => {
        showModal(false, modalRegister);
        showModal(true, modalLogin);
    })

    // API
    form.addEventListener('submit', function (evento) {
        evento.preventDefault();
        console.log('Formulário enviado!');
        loaderShow(true, loader, overlay);
        processarRegistro();
    });

    function coletarDados() {

        // Criar um objeto JavaScript
        const user = {
            name: inputName.value.trim(),
            email: inputEmail.value.trim(),
            password: inputPassword.value
        }
        return user;
    }

    function processarRegistro() {
        console.log('Iniciando processo de registro...');
        const user = coletarDados();
        btnSubmit.disabled = true;
        btnSubmit.value = 'Cadastrando...';
        enviarParaAPI(user);
    }

    async function enviarParaAPI(user) {
        const url = '/auth/register';
        try {
            // await "espera" a Promise resolver (similar a um bloqueio)
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user) // Transforma objeto JS em JSON
            });

            if (!response.ok) {
                throw new Error('Erro HTTP:' + response.status);
            }

            form.reset();
            setTimeout(() => {
                window.location.href = '/auth.html';
            }, 2000);
            setTimeout(() => {
                loaderShow(false, loader, overlay);
            }, 3000);
        } catch (error) {
            console.error('Erro', error);
            mostrarMensagem('Erro ao realizar o cadastro. Tente novamente.', 'erro');
            loaderShow(false, loader, overlay);
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.value = 'Cadastrar';
        }
    }

});
