let btn = document.querySelector("#verSenha");
btn.addEventListener("click", () => {
  let inputSenha = document.querySelector("#senha");

  if (inputSenha.getAttribute("type") == "password") {
    inputSenha.setAttribute("type", "text");
  } else {
    inputSenha.setAttribute("type", "password");
  }
});

function entrar() {
  let usuario = document.querySelector("#usuario");
  let senha = document.querySelector("#senha");
  let msgError = document.querySelector("#msgError");
  let listaUser = [];
  let userValid = {
    nome: "",
    user: "",
    senha: "",
    image: "",
  };
  if (usuario.value === "" || senha.value === "") {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = "Por favor, preencha todos os campos";
    return;
  }

  listaUser = JSON.parse(localStorage.getItem("listaUser")) || [];

  listaUser.forEach((item) => {
    if (usuario.value === item.userCad && senha.value === item.senhaCad) {
      userValid = {
        image: item.imageCad,
        nome: item.nomeCad,
        senha: item.senhaCad,
        user: item.userCad,
      };
    }
  });

  if (usuario.value === userValid.user && senha.value === userValid.senha) {
    window.location.href = "perfil.html";
    let token =
      Math.random().toString(16).substr(2) +
      Math.random().toString(16).substr(2);
    localStorage.setItem("token", token);
    localStorage.setItem("userLogado", JSON.stringify(userValid));
  } else {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = "Senha ou Usuário errado";
  }
}
