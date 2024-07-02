let movieId = "";
let imdbIDs = [];
// chaves no LocalStorage
const localStorageKey = "meuJson";
const localStorageKeyComent = "listaComentarios";

//função principal para carregar os dados---------------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  movieId = urlParams.get("id");
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjIxNTk1ODI0MzVjOWI2MzVjODQyMjFmMWU2N2ExOSIsIm5iZiI6MTcxOTI0MzA2Mi45MzI5MjQsInN1YiI6IjY2NzM4Y2M5MTJiZDFkMTE3YzRlYWFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-2iVRu-BctvHUKY_5Q7fJdzWYidKfL2V-JllInhO0TI",
    },
  };
  // verifica se o JSON já existe no LocalStorage
  if (localStorage.getItem(localStorageKey) === null) {
    // JSON não existe, então cria
    const listaFavoritos = {
      "001": ["tt0848228", "tt0816692", "tt1245526"]
    };

    // converte o objeto para string JSON e salva no LocalStorage
    localStorage.setItem(localStorageKey, JSON.stringify(listaFavoritos));
    console.log('JSON criado e salvo no LocalStorage.');
  } else {
    // JSON já existe
    console.log('JSON já existe no LocalStorage.');
  }
  if (movieId) {
    //preencher icone favorito-----------------------------------------------------
    const favoritosButton = document.getElementById("favoriteButton");

    // Obter JSON do LocalStorage
    const jsonStr = localStorage.getItem(localStorageKey);
    const filmes = JSON.parse(jsonStr);

    // Verificar se o código do filme existe no JSON
    const lista = filmes["001"] || [];
    const ehFavorito = lista.includes(movieId);

    // Adicionar o ícone apropriado ao botão
    if (ehFavorito) {
      favoritosButton.innerHTML =
        '<i class="fa-solid fa-bookmark fa-2xl" style="color: #ED4A02;"></i>';
    } else {
      favoritosButton.innerHTML =
        '<i class="fa-regular fa-bookmark fa-2xl" style="color: #ED4A02;"></i>';
    }

    //chamada para detalhes gerais dos filmes-----------------------------------------------------
    fetch(
      "https://api.themoviedb.org/3/movie/" + movieId + "?language=pt-BR",
      options
    )
      .then((response) => response.json())
      .then((newFilme) => {
        document.getElementById("poster").src =
          "https://image.tmdb.org/t/p/w500" + newFilme.poster_path;
        document.getElementById("titulo").textContent = newFilme.title;

        const date = new Date(newFilme.release_date);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const datePT = date.toLocaleDateString("pt-BR", options);
        document.getElementById("dataLanc").textContent = datePT;

        document.getElementById("tituloOri").textContent =
          newFilme.original_title;
        document.getElementById("duracao").textContent =
          newFilme.runtime + " min";
        document.getElementById("sinopse").textContent = newFilme.overview;
        document.getElementById("nota").textContent =
          newFilme.vote_average.toFixed(1);

        let generos = "";
        newFilme.genres.forEach((genre, index) => {
          if (index > 0) {
            generos += ", ";
          }
          generos += genre.name;
        });
        document.getElementById("genero").textContent = generos;

        document.getElementById("linguagem").textContent =
          newFilme.original_language.toUpperCase();

        console.log(newFilme.imdb_id);
      })
      .catch((error) => console.error("Erro ao buscar dados do filme:", error));

    //chamada para atores do filme-----------------------------------------------------
    // chamada para atores do filme-----------------------------------------------------
    fetch(
      "https://api.themoviedb.org/3/movie/" +
      movieId +
      "/credits?language=pt-BR",
      options
    )
      .then((response) => response.json())
      .then((newAtores) => {
        let atores = "";
        newAtores.cast.slice(0, 6).forEach((actor, index) => {
          // Usando slice(0, 6) para pegar apenas os primeiros 6 atores
          if (index > 0) {
            atores += ", ";
          }
          atores += actor.name + "(" + actor.character + ")";
        });
        document.getElementById("atores").textContent = atores;
      })
      .catch((error) =>
        console.error("Erro ao buscar atores do filme:", error)
      );

    //preencher meu comentário do filme-----------------------------------------------------
    if (localStorage.getItem(localStorageKeyComent) === null) {
      // JSON não existe, então cria
      localStorage.setItem(
        localStorageKeyComent,
        JSON.stringify({
          tt0848228: "Gostei do filme",
          tt0816692: "Não gostei deste filme",
          tt1245526: "Este filme é bom",
        })
      );
      console.log("JSON criado e salvo no LocalStorage.");
    } else {
      // JSON já existe
      console.log("JSON de comentários já existe no LocalStorage.");
    }
    carregarComent();

    //preencher comentarios do filme-----------------------------------------------------
    const comentSection = document.getElementById("ultimosComentarios");
    comentSection.innerHTML = ""; // Limpar conteúdo
    //fetch("https://api.themoviedb.org/3/movie/"+movieId+"/reviews?language=en-US&page=1", options)
    fetch(
      "https://api.themoviedb.org/3/movie/" +
      movieId +
      "/reviews?language=pt-BR&page=1",
      options
    )
      .then((response) => response.json())
      .then((comentarios) => {
        if (comentarios.total_results > 0) {
          console.log("Comentarios encontrados");
          console.log(comentarios.total_results);
          console.log(comentarios);
          comentarios.results.forEach((coment) =>
            comentSection.appendChild(criarComent(coment))
          );
        } else {
          const msg = document.createElement("h5");
          msg.className = "msgComent";
          msg.textContent = "Nenhum comentário encontrado para este filme!";
          comentSection.appendChild(msg);
          console.log("Nenhum comentario encontrado");
        }
      })
      .catch((error) => console.error("Erro ao buscar comentarios:", error));
  } else {
    alert("ID do filme não encontrado.");
  }
});
//funcoes auxiliares---------------------------------------------------------------------------------------------------------------------------------------------------------------
//funcao para criar card de comentario-----------------------------------------------------
function criarComent(coment) {
  const row = document.createElement("div");
  row.className = "row";

  const card = document.createElement("div");
  card.className = "card";

  const cardHeader = document.createElement("h5");
  cardHeader.className = "card-header";
  cardHeader.textContent = "Criado por: " + coment.author;

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent = coment.content;

  const cardTitle = document.createElement("h6");
  cardTitle.className = "card-title";
  // converter data no formato ISO 8601 para pt-BR
  const isoDate = coment.created_at;
  const date = new Date(isoDate);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    //second: '2-digit',
    hour12: false,
  };
  const formattedDate = date.toLocaleDateString("pt-BR", options);
  const dateTimePtBr = `${formattedDate}`;
  cardTitle.textContent = "Criado em: " + dateTimePtBr;

  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer text-body-secondary";

  cardFooter.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  card.appendChild(cardHeader);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);
  row.appendChild(card);

  return row;
}

//adiciona ou remove filmes da lista de favoritos-----------------------------------------------------
function addRmvFilme(movieIds, movieID) {
  //atualizar icone favorito-----------------------------------------------------
  const favoritosButton = document.getElementById("favoriteButton");

  if (!movieIds.includes(movieID)) {
    movieIds.push(movieID);
    //alert(`ID de filme ${movieID} adicionado à lista.`);
    favoritosButton.innerHTML =
      '<i class="fa-solid fa-bookmark fa-2xl" style="color: #ED4A02;"></i>';
    alert(`Filme adicionado à lista de favoritos.`);
  } else {
    const index = movieIds.indexOf(movieID);
    if (index !== -1) {
      movieIds.splice(index, 1);
      //alert(`ID de filme ${movieID} removido da lista.`);
      favoritosButton.innerHTML =
        '<i class="fa-regular fa-bookmark fa-2xl" style="color: #ED4A02;"></i>';
      alert(`Filme removido da lista de favoritos.`);
    }
  }
}

//função principal para o botão de favoritos-----------------------------------------------------
function favoritos() {
  // verifica se o JSON já existe no LocalStorage
  if (localStorage.getItem(localStorageKey) === null) {
    // JSON não existe, então cria
    const listaFavoritos = {
      "001": ["tt0848228", "tt0816692", "tt1245526"],
    };

    // converte o objeto para string JSON e salva no LocalStorage
    localStorage.setItem(localStorageKey, JSON.stringify(listaFavoritos));
    console.log("JSON criado e salvo no LocalStorage.");
  } else {
    // JSON já existe
    console.log("JSON já existe no LocalStorage.");
  }

  // recupera a string JSON do LocalStorage
  const jsonString = localStorage.getItem("meuJson");

  // converte a string JSON para um objeto
  const dados = JSON.parse(jsonString);

  imdbIDs = dados["001"];
  filme = movieId;
  //imdbIDs.forEach(id => console.log(id));
  addRmvFilme(imdbIDs, filme);
  //imdbIDs.forEach(id => console.log(id));
  dados["001"] = imdbIDs;
  // salva a lista atualizada no LocalStorage
  localStorage.setItem("meuJson", JSON.stringify(dados));
}

//funcoes referentes aos meus comentarios---------------------------------------------------------------------------------------------------------------------------------------------------------------
//função para carregar comentário do filme-----------------------------------------------------
function carregarComent() {
  const comentDiv = document.getElementById("coment");
  comentDiv.innerHTML = ""; // Limpar conteúdo atual

  // obter comentário do LocalStorage
  const comentsJson = localStorage.getItem(localStorageKeyComent);
  const coments = JSON.parse(comentsJson) || {};

  const coment = coments[movieId] || "Nenhum comentário disponível.";

  // exibir comentário
  const comentNewDiv = document.createElement("div");
  comentNewDiv.innerHTML = `
        <p>${coment}</p>
    `;
  comentDiv.appendChild(comentNewDiv);
}
//função para adicionar ou editar comentário de filme-----------------------------------------------------
function editComent() {
  const comentsJson = localStorage.getItem(localStorageKeyComent);
  const coments = JSON.parse(comentsJson) || {};
  const coment = coments[movieId] || "";

  // mostrar modal de edição
  document.getElementById("edit-comment").value = coment;
  document.getElementById("edit-modal").style.display = "block";
}
//função para salvar novo comentário(botão Salvar do Modal)-----------------------------------------------------
function salvarComent() {
  const newComent = document.getElementById("edit-comment").value;

  // obter comentários do LocalStorage
  const comentsJson = localStorage.getItem(localStorageKeyComent);
  const coments = JSON.parse(comentsJson) || {};

  // atualizar ou adicionar comentário
  coments[movieId] = newComent;

  // salvar no LocalStorage
  localStorage.setItem(localStorageKeyComent, JSON.stringify(coments));

  // fechar modal e recarregar comentário
  fecharModal();
  carregarComent();
}
//fechar Modal do comentário
function fecharModal() {
  document.getElementById("edit-modal").style.display = "none";
}
let userLogado = JSON.parse(localStorage.getItem('userLogado'));
if (userLogado) {
  document.getElementById('profile-image').src = userLogado.image;
} else {
  alert('Nenhum usuário logado encontrado');
  window.location.href = 'index.html';
}
