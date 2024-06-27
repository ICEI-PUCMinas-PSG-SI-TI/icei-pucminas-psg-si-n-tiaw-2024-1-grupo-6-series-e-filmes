// Assets/busca.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('Name');
    const queryInput = document.getElementById('name');
    const lista = document.querySelector('.lista');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que o formulário seja enviado normalmente

        const query = queryInput.value.trim();
        if (query) {
            const apiKey = 'a36ae99df9946a7423a6c72ffa87331c';
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }
                const data = await response.json();
                displayResults(data.results);
            } catch (error) {
                console.error('Erro:', error);
                lista.innerHTML = '<p>Erro ao buscar filmes. Tente novamente mais tarde.</p>';
            }
        } else {
            lista.innerHTML = '<p>Por favor, insira um termo de pesquisa.</p>';
        }
    });

    function displayResults(movies) {
        lista.innerHTML = ''; // Limpa a lista antes de adicionar novos resultados
        if (movies.length > 0) {
            movies.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('item', 'mb-4', 'col-md-3');

                const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image';
                
                const imgLink = document.createElement('a');
                imgLink.href = `detalhes.html?id=${movie.id}`;

                const img = document.createElement('img');
                img.src = posterPath;
                img.alt = `${movie.title} Poster`;
                img.classList.add('img-fluid', 'mb-2');
                imgLink.appendChild(img);

                const titleLink = document.createElement('a');
                titleLink.textContent = movie.title;
                titleLink.href = `busca.html?id=${movie.id}`;
                const title = document.createElement('h2');
                title.appendChild(titleLink);

                movieElement.appendChild(imgLink);
                movieElement.appendChild(title);

                lista.appendChild(movieElement);
            });
        } else {
            lista.innerHTML = '<p>Nenhum filme encontrado.</p>';
        }
    }
});

let userLogado = JSON.parse(localStorage.getItem('userLogado'));
if (userLogado) {
    document.getElementById('profile-image').src = userLogado.image;
} else {
    alert('Nenhum usuário logado encontrado');
    window.location.href = 'login.html';
}
