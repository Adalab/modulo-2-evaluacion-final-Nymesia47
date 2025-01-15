'use strict';

const searchField = document.querySelector('.js-search-input');
const searchBtn = document.querySelector('.js-search-btn');
const resultList = document.querySelector('.js-result-list');
const favoriteList = document.querySelector('.js-favorite-list');
let searchRequest = '';
let animeList = [];

//Pintar los reultado

function renderAnime(anime, list){
    const newListItem = document.createElement('li');
    newListItem.setAttribute('id', anime.mal_id);
    newListItem.classList.add('js-animeCard');
    list.appendChild(newListItem);

    const newArticle = document.createElement('article');
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

//Función de favoritos

let favoriteAnime = []; 

const handleClickFav = (ev) => {
    const animeClicked = Number(ev.currentTarget.id);
    
    const animeSelect = animeList.find((eachAnime) => eachAnime.mal_id === animeClicked);
    const indexFavSelected = favoriteAnime.findIndex((anime) => anime.mal_id === animeClicked);
    if (indexFavSelected === -1) {
        favoriteAnime.push(animeSelect);
    } else {
        console.log ('fa');
        
    }

    localStorage.setItem('favoriteAnime', JSON.stringify(favoriteAnime));

    favoriteList.innerHTML = '';
    for (const anime of favoriteAnime) {
        renderAnime(anime, favoriteList);   
    } 
    
}


//Escuchar evento sobre lo LI

const listenerListItem = () => {
    const allAnimeLi = document.querySelectorAll('.js-animeCard');
    for (const listItem of allAnimeLi) {
        listItem.addEventListener('click', handleClickFav);
    }
    
}

//Petición al servidor

function getDataApi() {
    fetch(`https://api.jikan.moe/v4/anime?q=${searchRequest}`)
    .then(resp => resp.json())
    .then(result => {
        animeList = result.data;
        for (const anime of animeList) {
            renderAnime(anime, resultList);
        }  
        
        listenerListItem();  
    })

}

//Función de Busqueda

function handleSearch(ev) {
    ev.preventDefault();
    searchRequest = searchField.value;
    getDataApi();
}

searchBtn.addEventListener('click', handleSearch);

