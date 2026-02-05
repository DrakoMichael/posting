document.addEventListener('DOMContentLoaded', function () {

    // Screen Default
    const asideButtonSearch = document.getElementById('aside-button-search');
    const asideButtonHome = document.getElementById('aside-button-home');
    const asideButtonHomeImg = document.getElementById('aside-button-home-img');

    const bounceLogin = document.getElementById('bounce-login');
    const bounceProfile = document.getElementById('bounce-profile');

    const overlay = document.getElementById('overlay');
    const loader = document.getElementById('loader');
    const modalPositionCenter = document.getElementById('modal-position-center');
    const modalPostInformations = document.getElementById('modal-post-informations');
    const modalAlert = document.getElementById('modal-alert');
    const textAlert = document.getElementById('text-alert');
    const modalAlertConfirm = document.getElementById('modal-alert-confirm');

    // Document
    const containerPosts = document.getElementById('container-posts');
    const buttonLinkCreatePost = document.getElementById('button-link-create-post');
    const textPostNotFound = document.getElementById('text-post-notfound');

    const buttonProfilePost = document.getElementById('button-profile-post');
    const imgButtonProfilePost = document.getElementById('img-button-profile-post');
    const buttonEditPost = document.getElementById('button-edit-post');
    const imgButtonEditPost = document.getElementById('img-button-edit-post');
    const buttonDeletePost = document.getElementById('button-delete-post');
    const imgButtonDeletePost = document.getElementById('img-button-delete-post');

    const buttonDeletePostConfirm = document.getElementById('button-delete-post-confirm');
    const buttonDeletePostNot = document.getElementById('button-delete-post-not');

    // Components
    sessionStorage.clear();
    showBounceAuth(bounceLogin, bounceProfile);
    loaderShow(true, loader, overlay);
    asideButtonsSelected();
    activeExitModal(true, modalPositionCenter);

    function asideButtonsSelected() {
        asideButtonHome.classList.add('aside-links-selected');
        asideButtonHomeImg.src = "img/house-bold.svg";
    }

    buttonLinkCreatePost.addEventListener('click', () => {
        if (!authenticated()) {
            alertAuthentication(true, modalPositionCenter, modalAlert, textAlert);
        } else {
            setUiMode('post-create-view');
            window.location.href = "posts-hub.html";
        }

    })

    function infoButtonActions(info) {
        info.addEventListener('click', () => {
            showModal(true, modalPostInformations);
            showModal(true, modalPositionCenter);
        });
    }

    function infoPostPermission(canEdit, canDelete) {
        if (canEdit === 'true') {
            buttonEditPost.classList.remove('display-invisible');
            buttonEditPost.classList.add('display-visible');
        } else {
            buttonEditPost.classList.remove('display-visible');
            buttonEditPost.classList.add('display-invisible');
        }
        if (canDelete === 'true') {
            buttonDeletePost.classList.remove('display-invisible');
            buttonDeletePost.classList.add('display-visible');
        } else {
            buttonDeletePost.classList.remove('display-visible');
            buttonDeletePost.classList.add('display-invisible');
        }
    }

    buttonDeletePost.addEventListener('click', () => {
        activeExitModal(false, modalPositionCenter);
        showModal(false, modalPostInformations);
        showModal(true, modalAlertConfirm);
    })

    buttonDeletePostNot.addEventListener('click', () => {
        activeExitModal(true, modalPositionCenter);
        showModal(false, modalAlertConfirm);
    })

    buttonProfilePost.addEventListener('mouseenter', () => {
        replaceImage(imgButtonProfilePost, "img/user-round-black.svg");
    })
    buttonProfilePost.addEventListener('mouseleave', () => {
        replaceImage(imgButtonProfilePost, "img/user-round.svg");
    })
    buttonEditPost.addEventListener('mouseenter', () => {
        replaceImage(imgButtonEditPost, "img/pencil-black.svg");
    })
    buttonEditPost.addEventListener('mouseleave', () => {
        replaceImage(imgButtonEditPost, "img/pencil.svg");
    })
    buttonDeletePost.addEventListener('mouseenter', () => {
        replaceImage(imgButtonDeletePost, "img/trash-2-black.svg");
    })
    buttonDeletePost.addEventListener('mouseleave', () => {
        replaceImage(imgButtonDeletePost, "img/trash-2.svg");
    })

    // API
    // Delete by Id
    async function deletePost(postId) {
        try {
            const url = `/posts/${postId}`
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setTimeout(() => {
                loaderShow(false, loader, overlay);
            }, 3000);
            setTimeout(() => {
                const responseMessage = postExceptionStatus(response);
                showModal(false, modalAlertConfirm);
                showModal(true, modalAlert);
                showTextException(responseMessage, textAlert);
            }, 3000);
        } catch (o) {
            throw new Error("Erro ao Deletar");

        }
    }

    // GET ALL
    const token = getToken();
    loadAPI();
    async function loadAPI() {
        const url = '/posts?page=0&size=10';
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const apiData = await response.json();
            const responseMessage = postExceptionStatus(response);
            if (!response.ok) {
                showTextException(responseMessage, textPostNotFound);
                loaderShow(false, loader, overlay);
            }

            apiData.content.forEach(post => {
                const card = document.createElement('div');
                const title = document.createElement('h2');
                const authorName = document.createElement("h1");
                const description = document.createElement('p');
                const createdAt = document.createElement('p');
                const category = document.createElement('p');
                const info = document.createElement('a');
                const infoImage = document.createElement('img');
                const hr = document.createElement('hr');
                const hrName = document.createElement('hr');
                const profile = document.createElement('img')

                const date = new Date(post.date);
                const dateFormatted = new Intl.DateTimeFormat("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short"
                }).format(date);
                console.log('Horario Original: ', date);

                authorName.textContent = post.author.name;
                title.textContent = post.title;
                description.textContent = post.description;
                createdAt.textContent = dateFormatted;
                category.textContent = post.category;

                const id = post.id;
                const authorId = post.authorId;
                const canEdit = post.permissions.canEdit;
                const canDelete = post.permissions.canDelete;
                const isOwner = post.permissions.isOwner;

                card.dataset.id = id;
                card.dataset.authorId = authorId;
                card.dataset.canEdit = canEdit;
                card.dataset.canDelete = canDelete;
                card.dataset.isOwner = isOwner;

                card.classList.add('card');
                card.classList.add('selection');
                profile.src = "img/circle-user-round.svg";
                profile.classList.add('profile');
                authorName.classList.add('author');
                title.classList.add('title');
                description.classList.add('description');
                createdAt.classList.add('date');
                category.classList.add('category');

                info.classList.add('info', 'selection');
                info.title = "Informações"
                infoButtonActions(info);
                infoImage.src = "img/ellipsis-vertical.svg";

                hr.classList.add('hr');
                hrName.classList.add('hr-name');

                info.append(infoImage);
                card.append(profile, authorName, hrName, title, description, createdAt, category, info);
                containerPosts.append(card, hr);
                setTimeout(() => {
                    loaderShow(false, loader, overlay);
                }, 1000);

                info.addEventListener('click', () => {

                    buttonEditPost.addEventListener('click', () => {
                        setUiMode('post-update-view');
                        sessionStorage.setItem("post", JSON.stringify(post));
                        window.location.href = 'posts-hub.html';
                    })

                    const postId = card.dataset.id;
                    const canEdit = card.dataset.canEdit;
                    const canDelete = card.dataset.canDelete;
                    infoPostPermission(canEdit, canDelete);
                    buttonDeletePostConfirm.addEventListener('click', () => {
                        loaderShow(true, loader, overlay);
                        deletePost(postId);
                    })
                })
            });

        } catch (e) {
            throw new Error("Error");

        }

    }

})
