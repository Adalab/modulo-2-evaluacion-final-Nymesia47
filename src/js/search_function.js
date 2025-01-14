'use strict';

const searchField = document.querySelector('.js-search-input');
const searchBtn = document.querySelector('.js-search-btn');
const resultList = document.querySelector('.js-result-list');
let searchRequest = '';
let animeList = [];

function getDataApi() {
    fetch(`https://api.jikan.moe/v4/anime?q=${searchRequest}`)
    .then(resp => resp.json())
    .then(result => {
        animeList = result.data;
        console.log(animeList);
    })
}

function handleSearch(ev) {
    ev.preventDefault();
    searchRequest = searchField.value;
    getDataApi();
}

searchBtn.addEventListener('click', handleSearch);

