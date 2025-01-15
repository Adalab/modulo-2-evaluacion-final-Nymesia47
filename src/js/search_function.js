'use strict';

const searchField = document.querySelector('.js-search-input');
const searchBtn = document.querySelector('.js-search-btn');
const resultList = document.querySelector('.js-result-list');
let searchRequest = '';
let animeList = [];

function renderAnime(anime){
    const newListItem = document.createElement('li');
    newListItem.setAttribute('id', anime.mal_id);
    resultList.appendChild(newListItem);

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

function getDataApi() {
    fetch(`https://api.jikan.moe/v4/anime?q=${searchRequest}`)
    .then(resp => resp.json())
    .then(result => {
        animeList = result.data;
        for (const anime of animeList) {
            renderAnime(anime);
        }
        console.log(animeList);
    })
}

function handleSearch(ev) {
    ev.preventDefault();
    searchRequest = searchField.value;
    getDataApi();
}

searchBtn.addEventListener('click', handleSearch);

