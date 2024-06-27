let movieId = "";
let imdbIDs = [];
//carrega lista de favoritos do .json
fetch('favoritos.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar o arquivo JSON: ' + response.statusText);
        }
        return response.json();  // Converte a resposta para JSON
    })
    .then(data => {
        imdbIDs = data["001"];
        //alert('Filmes lidos!');
    })
    .catch(error => {
        console.error('Erro:', error);
    });

//chama a API e carrega os dados
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    movieId = urlParams.get('id');
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjIxNTk1ODI0MzVjOWI2MzVjODQyMjFmMWU2N2ExOSIsIm5iZiI6MTcxOTI0MzA2Mi45MzI5MjQsInN1YiI6IjY2NzM4Y2M5MTJiZDFkMTE3YzRlYWFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-2iVRu-BctvHUKY_5Q7fJdzWYidKfL2V-JllInhO0TI'
        }
    };

    if(movieId){
        //chamada para detalhes gerais dos filmes
        fetch("https://api.themoviedb.org/3/movie/"+movieId+"?language=pt-BR", options)
            .then(response => response.json())
            .then(newFilme => {
                document.getElementById('poster').src = "https://image.tmdb.org/t/p/w500" + newFilme.poster_path;
                document.getElementById('titulo').textContent = newFilme.title;

                const date = new Date(newFilme.release_date);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const datePT = date.toLocaleDateString('pt-BR', options);
                document.getElementById('dataLanc').textContent = datePT;

                document.getElementById('tituloOri').textContent = newFilme.original_title;
                document.getElementById('duracao').textContent = newFilme.runtime + " min";
                document.getElementById('sinopse').textContent = newFilme.overview;
                document.getElementById('nota').textContent = newFilme.vote_average.toFixed(1);

                let generos = "";
                newFilme.genres.forEach((genre, index) => {
                if (index > 0) {
                    generos += ", ";
                }
                generos += genre.name;
                });
                document.getElementById('genero').textContent = generos;

                document.getElementById('linguagem').textContent = newFilme.original_language.toUpperCase();

                console.log(newFilme.imdb_id);
            })
            .catch(error => console.error('Erro ao buscar dados do filme:', error));
        
        //chamada para atores dos filmes
        fetch("https://api.themoviedb.org/3/movie/"+movieId+"/credits?language=pt-BR", options)
        .then(response => response.json())
        .then(newAtores => {
            let atores = "";
            const maxAtores = 6; // Define o número máximo de atores a serem exibidos
            newAtores.cast.slice(0, maxAtores).forEach((actor, index) => { // Utiliza slice para limitar o número de atores
                if (index > 0) {
                    atores += ", ";
                }
                atores += actor.name + " ("+ actor.character +")";
            });
            document.getElementById('atores').textContent = atores;
        })
        .catch(error => console.error('Erro ao buscar dados do filme:', error));
    }else{
        alert('ID do filme não encontrado.');
    }
});

//adiciona e remove filmes da lista de favoritos
function addRmvFilme(movieIds, movieID) {
    if (!movieIds.includes(movieID)) {
        movieIds.push(movieID);
        alert(`ID de filme ${movieID} adicionado à lista.`);
    } else {
        const index = movieIds.indexOf(movieID);
        if (index !== -1) {
            movieIds.splice(index, 1);
            alert(`ID de filme ${movieID} removido da lista.`);
        }
    }
}

//função para ler o arquivo JSON e converter a lista de IDs de filmes
function favoritos() {
    imdbIDs.forEach(id => console.log(id));
    console.log("----");
    filme = movieId;
    addRmvFilme(imdbIDs, filme);
    imdbIDs.forEach(id => console.log(id));
    console.log("----FIM");
    
    //alert('Botão clicado!');
}
let userLogado = JSON.parse(localStorage.getItem('userLogado'));
if (userLogado) {
    document.getElementById('profile-image').src = userLogado.image;
} else {
    alert('Nenhum usuário logado encontrado');
    window.location.href = 'login.html';
}

/*function lerArquivo(filePath) {
    
    fetch('favoritos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar o arquivo JSON: ' + response.statusText);
            }
            return response.json();  // Converte a resposta para JSON
        })
        .then(data => {
            imdbIDs = data["001"];
            imdbIDs.forEach(id => console.log(id));
            console.log("----");
            filme = movieId;
            addRmvFilme(imdbIDs, filme);
            imdbIDs.forEach(id => console.log(id));
            console.log("----FIM");
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    
    alert('Botão clicado!');
}*/