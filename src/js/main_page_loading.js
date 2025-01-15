
const searchField = document.querySelector('.js-search-input');
const searchBtn = document.querySelector('.js-search-btn');
const resetBtn = document.querySelector('.js-reset-btn');
const resultList = document.querySelector('.js-result-list');
const favoriteList = document.querySelector('.js-favorite-list');
let searchRequest = '';
let animeList = [];
let favoriteAnime = []; 

//Pintar los animes guardado en favoritos

function renderFavorites (anime, list) {
    const newListItem = document.createElement('li');
    newListItem.setAttribute('id', anime.mal_id);
    newListItem.classList.add('js-favAnimeCard');
    list.appendChild(newListItem);

    const newArticle = document.createElement('article');
    newArticle.classList.add('favCard');
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

    const newDeleteBtn = document.createElement('button');
    newDeleteBtn.textContent = 'X';
    newDeleteBtn.classList.add('js-deleteFav-btn');
    newDeleteBtn.setAttribute('data-id', anime.mal_id);

    newArticle.append(newAnimeImg, newAnimeTitle, newDeleteBtn);

}

//obtengo los datos del LS para saber si pintar favoritos en la lista de favoritos.

const dataFavAnimesLS = localStorage.getItem('favoriteAnime');
if(dataFavAnimesLS) {
    favoriteAnime = JSON.parse(dataFavAnimesLS);    
}

for (const anime of favoriteAnime) {
    renderFavorites(anime, favoriteList);   
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


//Escuchar evento sobre lo LI

const listenerListItem = ( className, handleFunction) => {
    const allAnime = document.querySelectorAll(className);
    for (const Item of allAnime) {
        Item.addEventListener('click', handleFunction);
    }
    
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

//Función de Busqueda

function handleSearch(ev) {
    ev.preventDefault();
    searchRequest = searchField.value;
    getDataApi();
}
searchBtn.addEventListener('click', handleSearch);


//Función de favoritos

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
    
}

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

//Bonus: Botón de reset

function handleResetBtn () {
    searchRequest = '';
    animeList = [];
    favoriteAnime = []; 
    resultList.innerHTML = '';
    favoriteList.innerHTML = '';
    localStorage.removeItem('favoriteAnime');
}

resetBtn.addEventListener('click', handleResetBtn);




