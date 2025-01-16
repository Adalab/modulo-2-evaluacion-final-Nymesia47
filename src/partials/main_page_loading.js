'use strict';

const searchField = document.querySelector('.js-search-input');
const searchBtn = document.querySelector('.js-search-btn');
const resetBtn = document.querySelector('.js-reset-btn');
const resetFavBtn = document.querySelector('.js-reset-favorite-btn');
const resultList = document.querySelector('.js-result-list');
const favoriteList = document.querySelector('.js-favorite-list');
let searchRequest = '';
let animeList = [];
let favoriteAnime = []; 

//obtener los datos del LS para saber si pintar favoritos en la lista de favoritos.

const dataFavAnimesLS = localStorage.getItem('favoriteAnime');
if(dataFavAnimesLS) {
    favoriteAnime = JSON.parse(dataFavAnimesLS);    
}

for (const anime of favoriteAnime) {
    renderFavorites(anime, favoriteList);   
} 

//Petición al servidor

function getDataApi() {
    resultList.innerHTML = '';
    fetch(`https://api.jikan.moe/v4/anime?q=${searchRequest}`)
    .then(resp => resp.json())
    .then(result => {
        animeList = result.data;
        for (const anime of animeList) {
            renderAnime(anime, resultList);
        }  
        listenerListItem('.js-animeCard', handleClickFav);  
    })

}

//Busqueda anime

function handleSearch(ev) {
    ev.preventDefault();
    searchRequest = searchField.value;
    getDataApi();
}
searchBtn.addEventListener('click', handleSearch);

//Escuchar evento sobre lo LI

const listenerListItem = ( className, handleFunction) => {
    const allAnime = document.querySelectorAll(className);
    for (const Item of allAnime) {
        Item.addEventListener('click', handleFunction);
    }
    
}

//Guardar/quitar anime favoritos en la lista de favoritos

const handleClickFav = (ev) => {
    const animeClicked = Number(ev.currentTarget.id);
    const animeSelect = animeList.find((eachAnime) => eachAnime.mal_id === animeClicked);
    const indexFavSelected = favoriteAnime.findIndex((anime) => anime.mal_id === animeClicked);

    if (indexFavSelected === -1) {
        favoriteAnime.push(animeSelect);
        
    } else {
        favoriteAnime.splice(indexFavSelected, 1);  
    }

    localStorage.setItem('favoriteAnime', JSON.stringify(favoriteAnime));

    favoriteList.innerHTML = '';
    for (const anime of favoriteAnime) {
        renderFavorites(anime, favoriteList);   
    } 

    resultList.innerHTML = '';
        for (const anime of animeList) {
            renderAnime(anime, resultList);
        };

    listenerListItem('.js-animeCard', handleClickFav); 
    listenerListItem('.js-deleteFav-btn', handleDeleteItem); 
    
}










