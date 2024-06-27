const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjIxNTk1ODI0MzVjOWI2MzVjODQyMjFmMWU2N2ExOSIsIm5iZiI6MTcxOTI0MzA2Mi45MzI5MjQsInN1YiI6IjY2NzM4Y2M5MTJiZDFkMTE3YzRlYWFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-2iVRu-BctvHUKY_5Q7fJdzWYidKfL2V-JllInhO0TI'
    }
};

//carrega lista de favoritos do arquivo .json
async function init(){

    fetch('favoritos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar o arquivo JSON: ' + response.statusText);
            }
            return response.json();  // Converte a resposta para JSON
        })
        .then(data => {
            const imdbIDs = data["001"];
            buscarFilme(imdbIDs);
            //console.log(data);  // Exibe os dados no console
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

//busca dados de um filme
function buscarFilme(imdbIDs) {
    const filmesCards = document.getElementById('cards');
    filmesCards.innerHTML = ''; // Limpar conteúdo
    imdbIDs.forEach(imdbID => {
        fetch("https://api.themoviedb.org/3/movie/"+imdbID+"?language=pt-BR", options)
            .then(response => response.json())
            .then(movie => {
                if (movie != null) {

                    filmesCards.appendChild(criarCard(movie));
                } else {
                    console.error(`Erro ao buscar filme: ${movie.Error}`);
                }
            })
            .catch(error => console.error('Erro ao buscar filme:', error));
    });
}

// cria card do filme
function criarCard(movie) {
    const col = document.createElement('div');
    col.className = 'col';

    const card = document.createElement('div');
    card.className = 'card h-100';

    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    img.alt = movie.title;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = movie.title;

    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    const date = new Date(movie.release_date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const datePT = date.toLocaleDateString('pt-BR', options);
    cardText.textContent = `Year: ${datePT}`;

    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer';

    const small = document.createElement('small');
    small.className = 'text-body-secondary';

    const cardLink = document.createElement('a');
    cardLink.href = `detalhes.html?id=${movie.imdb_id}`;
    cardLink.className = 'btn btn-primary';
    cardLink.textContent = 'Ver detalhes';

    cardFooter.appendChild(small);
    cardFooter.appendChild(cardLink);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    card.appendChild(img);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    col.appendChild(card);

    return col;
}

window.onload = init();