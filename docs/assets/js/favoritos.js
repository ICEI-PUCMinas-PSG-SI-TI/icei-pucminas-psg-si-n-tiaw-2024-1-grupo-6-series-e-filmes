const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjIxNTk1ODI0MzVjOWI2MzVjODQyMjFmMWU2N2ExOSIsIm5iZiI6MTcxOTI0MzA2Mi45MzI5MjQsInN1YiI6IjY2NzM4Y2M5MTJiZDFkMTE3YzRlYWFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-2iVRu-BctvHUKY_5Q7fJdzWYidKfL2V-JllInhO0TI'
    }
};
// Nome da chave no LocalStorage
const localStorageKey = 'meuJson';

//carrega lista de favoritos do arquivo .json
async function init(){
    
    // Recuperar o JSON do LocalStorage
    const jsonString = localStorage.getItem(localStorageKey);

    if (jsonString !== null) {
        // Convertendo a string JSON de volta para um objeto
        const dados = JSON.parse(jsonString);

        const lista = dados["001"];
        if(lista.length > 0){
            lista.forEach(id => console.log(id));
            buscarFilme(lista);
        }else{
            const filmesCards = document.getElementById('cards');
            filmesCards.innerHTML = '<h3>Não há favoritos!!!</h3>'; // Limpar conteúdo
        }
        // Aqui você pode manipular os dados conforme necessário
        console.log(dados);
    } else {
        console.log('JSON não encontrado no LocalStorage.');
    }

}

//busca dados de um filme-----------------------------------------------------
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

// cria card do filme-----------------------------------------------------
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
    cardText.textContent = `Data de lançamento: ${datePT}`;

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
let userLogado = JSON.parse(localStorage.getItem('userLogado'));
if (userLogado) {
    document.getElementById('profile-image').src = userLogado.image;
} else {
    alert('Nenhum usuário logado encontrado');
    window.location.href = 'login.html';
}
