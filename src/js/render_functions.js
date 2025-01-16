console.log(favoriteAnime);

//Pintar los animes guardado en favoritos

function renderFavorites (anime, list) {
    const newListItem = document.createElement('li');
    newListItem.setAttribute('id', anime.mal_id);
    newListItem.classList.add('js-favAnimeCard');
    newListItem.classList.add('favorite-section-card');
    list.appendChild(newListItem);

    const newArticle = document.createElement('article');
    newArticle.classList.add('favCard');

    const newDeleteBtn = document.createElement('button');
    newDeleteBtn.textContent = 'X';
    newDeleteBtn.classList.add('js-deleteFav-btn');
    newDeleteBtn.classList.add('favCard-delete');
    newDeleteBtn.setAttribute('data-id', anime.mal_id);

    newListItem.append(newArticle, newDeleteBtn);

    const newAnimeImg = document.createElement('img');
    if(!anime.images.jpg.image_url) {
        newAnimeImg.setAttribute('src', "https://placehold.co/60x86");
        newAnimeImg.setAttribute('alt', "placeholder image");
    } else {
        newAnimeImg.setAttribute('src', anime.images.jpg.image_url);
        newAnimeImg.setAttribute('alt', anime.title);
    }

    const newAnimeTitle = document.createElement('h3');
    const textH3 = document.createTextNode(anime.title);
    newAnimeTitle.appendChild(textH3);  

    newArticle.append(newAnimeImg, newAnimeTitle,);

}

//Pintar los reultado de la busqueda

function renderAnime(anime, list){
    const newListItem = document.createElement('li');
    newListItem.setAttribute('id', anime.mal_id);
    newListItem.classList.add('js-animeCard');
    list.appendChild(newListItem);

    const newArticle = document.createElement('article');

    //verificar si el anime está en el array de favorito

    const findFav = favoriteAnime.find(animeFav => animeFav.mal_id === anime.mal_id);
    if (findFav) {
        newArticle.classList.add('favorite');
    }
    newArticle.classList.add('card');
    newListItem.appendChild(newArticle);

    const newAnimeImg = document.createElement('img');
    if(!anime.images.jpg.image_url) {
        newAnimeImg.setAttribute('src', "https://placehold.co/210x295");
        newAnimeImg.setAttribute('alt', "placeholder image");
    } else {
        newAnimeImg.setAttribute('src', anime.images.jpg.image_url);
        newAnimeImg.setAttribute('alt', anime.title);
    }

    const newAnimeTitle = document.createElement('h3');
    const textH3 = document.createTextNode(anime.title);
    newAnimeTitle.appendChild(textH3);  

    newArticle.append(newAnimeImg, newAnimeTitle);
    
}