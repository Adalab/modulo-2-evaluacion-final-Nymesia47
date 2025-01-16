'use strict';

//Bonus: Borrar favoritos

function handleDeleteItem (ev) {
    const animeClicked = Number(ev.currentTarget.getAttribute('data-id'));
    const indexFavSelected = favoriteAnime.findIndex((anime) => anime.mal_id === animeClicked);

    favoriteAnime.splice(indexFavSelected, 1);
    localStorage.removeItem('favoriteAnime');
    localStorage.setItem('favoriteAnime', JSON.stringify(favoriteAnime));

    favoriteList.innerHTML = '';
    for (const anime of favoriteAnime) {
        renderFavorites(anime, favoriteList);   
    } 
    listenerListItem('.js-deleteFav-btn', handleDeleteItem);

}

listenerListItem('.js-deleteFav-btn', handleDeleteItem);

//Borrar todos los favoritos de la lista de favoritos

function handleClickDeleteall () {
    favoriteAnime = []; 
    favoriteList.innerHTML = '';
    localStorage.removeItem('favoriteAnime');
    resultList.innerHTML = '';
        for (const anime of animeList) {
            renderAnime(anime, resultList);
        };
        listenerListItem('.js-animeCard', handleClickFav); 
}

resetFavBtn.addEventListener('click', handleClickDeleteall);

//Bonus: Botón de reset

function handleResetBtn () {
    searchField.value = '';
    searchRequest = '';
    animeList = [];
    favoriteAnime = []; 
    resultList.innerHTML = '';
    favoriteList.innerHTML = '';
    localStorage.removeItem('favoriteAnime');
}

resetBtn.addEventListener('click', handleResetBtn);