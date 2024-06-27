const API_KEY = 'api_key=a36ae99df9946a7423a6c72ffa87331c';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + 'discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById('main');
const carouselInner = document.querySelector('.carousel-inner');
const carouselIndicators = document.getElementById('carousel-indicators');

getMovies(API_URL);

function getMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const movies = data.results;
            const carouselMovies = movies.slice(0, 4);
            const otherMovies = movies.slice(4);

            showMovies(carouselMovies);
            showOtherMovies(otherMovies);
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
}

function showMovies(data) {
    carouselInner.innerHTML = '';
    carouselIndicators.innerHTML = '';

    data.forEach((movie, index) => {
        const { id, title, poster_path } = movie;

        //carrocel indicador
        const indicator = document.createElement("button");
        indicator.type = "button";
        indicator.setAttribute("data-bs-target", "#carouselExampleCaptions");
        indicator.setAttribute("data-bs-slide-to", index);
        if (index === 0) indicator.classList.add("active");
        indicator.setAttribute("aria-current", index === 0 ? "true" : "false");
        indicator.setAttribute("aria-label", `Slide ${index + 1}`);
        carouselIndicators.appendChild(indicator);

        //preenche item carrocel
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (index === 0) carouselItem.classList.add("active");

        carouselItem.innerHTML = `
            <a href="detalhes.html?id=${id}">
                <img src="${IMG_URL + poster_path}" class="d-block w-100" alt="${title}">
                <div class="carousel-caption d-none d-md-block">
                    <h5>${title}</h5>
                </div>
            </a>
        `;
        carouselInner.appendChild(carouselItem);
    });
}

function showOtherMovies(data) {
    main.innerHTML = '';

    data.forEach((movie) => {
        const { id, title, poster_path } = movie;

        // preenche os filmes
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <a href="detalhes.html?id=${id}"><img src="${IMG_URL + poster_path}" alt="${title}"></a>
            <div class="title"><a href="busca.html?id=${id}"><h3>${title}</h3></a></div>
        `;
        main.appendChild(movieEl);
    });
}
let userLogado = JSON.parse(localStorage.getItem('userLogado'));
if (userLogado) {
    document.getElementById('profile-image').src = userLogado.image;
} else {
    alert('Nenhum usuário logado encontrado');
    window.location.href = 'login.html';
}
