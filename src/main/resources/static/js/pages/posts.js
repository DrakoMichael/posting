document.addEventListener('DOMContentLoaded', function () {

    // Screen Default
    const asideButtonSearch = document.getElementById('aside-button-search');
    const asideButtonHome = document.getElementById('aside-button-home');
    const asideButtonHomeImg = document.getElementById('aside-button-home-img');

    const bounceLogin = document.getElementById('bounce-login');
    const bounceProfile = document.getElementById('bounce-profile');

    const overlay = document.getElementById('overlay');
    const loader = document.getElementById('loader');

    // Document
    const containerPosts = document.getElementById('container-posts');
    const buttonLinkCreatePost = document.getElementById('button-link-create-post');
    const textPostNotFound = document.getElementById('text-post-notfound');

    // Components
    showBounceAuth(bounceLogin, bounceProfile);
    loaderShow(true, loader, overlay);
    asideButtonsSelected();

    function asideButtonsSelected() {
        asideButtonHome.classList.add('aside-links-selected');
        asideButtonHomeImg.src = "img/house-bold.svg";
    }

    buttonLinkCreatePost.addEventListener('click', () => {
        if (!authenticated()) {
            alert('Você precisa estar autenticado para acessar este recurso!');
            window.location.href = 'auth.html'
        } else {
            window.location.href = 'posts-hub.html';
        }

    })

    // API
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

                info.classList.add('info', 'selection', 'invisible');
                info.title = "Informações"
                if (isOwner) {
                    info.classList.remove('invisible');
                    info.classList.add('visible');
                }
                //modalInformations(info);
                infoImage.src = "img/ellipsis-vertical.svg";
                hr.classList.add('hr');
                hrName.classList.add('hr-name');

                info.append(infoImage);
                card.append(profile, authorName, hrName, title, description, createdAt, category, info);
                containerPosts.append(card, hr);
                setTimeout(() => {
                    loaderShow(false, loader, overlay);
                }, 1000);

                card.addEventListener('click', () => {
                    console.log(card.dataset.id)
                })
            });
        } catch (e) {
            throw new Error("Error");

        }

    }

})
