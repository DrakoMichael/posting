document.addEventListener('DOMContentLoaded', function () {

    // Screen Default
    const bounceLogin = document.getElementById('bounce-login');
    const bounceProfile = document.getElementById('bounce-profile');
    const overlay = document.getElementById('overlay');
    const loader = document.getElementById('loader');
    const modalPosition = document.getElementById('modal-position-center');

    // Document
    const modalAlertPost = document.getElementById('modal-alert-post');
    const textAlertPost = document.getElementById('text-alert-post');
    const formPostCreate = document.getElementById('post-create');
    const formPostTitleCreate = document.getElementById('post-title-create');
    const formPostDescriptionCreate = document.getElementById('post-description-create');
    const formPostCategoryCreate = document.getElementById('post-category-create');
    const formPostSubmitCreate = document.getElementById('post-submit-create');

    // Components
    alertAuthentication(false, modalPosition, modalAlertPost, textAlertPost);
    showBounceAuth(bounceLogin, bounceProfile);
    loaderShow(true, loader, overlay);

    setTimeout(() => {
        loaderShow(false, loader, overlay);
    }, 1000);

    // Generate HTML
    formPostCategoryCreate.addEventListener('click', () => {
        loadCategorys();
        async function loadCategorys() {
            const categoryData = await fetchGetCategorys();
            console.log(categoryData.content);
            categoryData.content.forEach(categorys => {
                const formPostCategoryOption = document.createElement('option');
                formPostCategoryOption.textContent = categorys.name;
                formPostCategoryCreate.append(formPostCategoryOption);
            })
        }
    }, { once: true });

    //API
    // CREATE
    const token = getToken();
    createPost();
    function createPost() {

        formPostCreate.addEventListener('submit', function (event) {
            event.preventDefault();
            loaderShow(true, loader, overlay);
            processRecord();

        })

        function collectData() {
            const post = {
                name: formPostTitleCreate.value.trim(),
                description: formPostDescriptionCreate.value.trim(),
                category: formPostCategoryCreate.value.trim()
            }
            return post;
        }

        function processRecord() {
            const post = collectData();
            formPostSubmitCreate.disabled = true;
            formPostSubmitCreate.value = 'Carregando...';
            fetchCreate(post);

        }

        async function fetchCreate(post) {
            const url = '/posts';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            });
            console.log('Sent Data');
            console.log(response);
            formPostCreate.reset();

            setTimeout(() => {
                formPostSubmitCreate.value = 'Publicar';
            }, 3000);
            setTimeout(() => {
                loaderShow(false, loader, overlay);
            }, 3000);

            setTimeout(() => {
                const responseMessage = postExceptionStatus(response);
                showModal(true, modalPosition);
                showModal(true, modalAlertPost);
                showTextException(responseMessage, textAlertPost);
            }, 3000);
        }
    }
})
