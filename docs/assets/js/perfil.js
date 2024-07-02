if (localStorage.getItem("token") == null) {
  alert("Você precisa estar logado para acessar essa página");
  window.location.href = "login.html";
}

function sair() {
  localStorage.removeItem("token");
  localStorage.removeItem("userLogado");
  window.location.href = "login.html";

}

let userLogado = JSON.parse(localStorage.getItem("userLogado"));

if (userLogado) {
  document.getElementById("profile-image").src = userLogado.image;
  document.getElementById("profile-name").innerText = userLogado.user;
  document.getElementById("profile-favorite").innerHTML =
    '<a href="favoritos.html"><i class="fa-solid fa-star"></i>Favoritos</a>';
} else {
  alert("Nenhum usuário logado encontrado");
  window.location.href = "index.html";
}

document.getElementById('profile-image-button').addEventListener('click', function() {
    const inputContainer = document.getElementById('profile-image-input-container');
    if (inputContainer.style.display === 'none' || inputContainer.style.display === '') {
        inputContainer.style.display = 'block';
    } else {
        inputContainer.style.display = 'none';
    }
});



document.getElementById('update-profile-image').addEventListener('click', function() {
    const newImageUrl = document.getElementById('profile-image-url').value;
    if (newImageUrl) {
        // Atualize a imagem de perfil no localStorage para o usuário logado
        userLogado.image = newImageUrl;
        localStorage.setItem('userLogado', JSON.stringify(userLogado));

        // Atualize a imagem de perfil na página
        document.getElementById('profile-image').src = newImageUrl;

        
        let listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];
        listaUser = listaUser.map(user => {
            if (user.userCad === userLogado.user) {
                user.imageCad = newImageUrl;
            }
            return user;
        });
        localStorage.setItem('listaUser', JSON.stringify(listaUser));
    } else {
        alert('Por favor, insira uma URL válida.');
    }
});
