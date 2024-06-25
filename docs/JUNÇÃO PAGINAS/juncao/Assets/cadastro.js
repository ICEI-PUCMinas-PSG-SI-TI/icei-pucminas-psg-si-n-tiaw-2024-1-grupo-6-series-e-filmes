let btnconfirm = document.querySelector("#verConfirmSenha");
let btn = document.querySelector("#verSenha");
let msgError = document.querySelector("#msgError");
let msgSuccess = document.querySelector("#msgSuccess");

//validação
let nome = document.querySelector("#nome");
let labelNome = document.querySelector("#labelNome");
let validNome = false;

let usuario = document.querySelector("#usuario");
let labelUsuario = document.querySelector("#labelUsuario");
let validUsuario = false;

let senha = document.querySelector("#senha");
let labelSenha = document.querySelector("#labelSenha");
let validSenha = false;

let confirmSenha = document.querySelector("#confirmSenha");
let labelConfirmSenha = document.querySelector("#labelConfirmSenha");
let validConfirmSenha = false;

let image = document.querySelector("#image");
let labelImage = document.querySelector("#labelImage");

nome.addEventListener("keyup", () => {
  if (nome.value.length <= 2) {
    labelNome.innerHTML =
      "<strong>Nome (*Insira no mínimo 3 caracteres)</strong>";
  } else {
    labelNome.innerHTML = "<strong>Nome</strong>";
    validNome = true;
  }
});
usuario.addEventListener("keyup", () => {
  if (usuario.value.length <= 5) {
    labelUsuario.innerHTML =
      "<strong>usuario (*Insira no mínimo 6 caracteres)</strong>";
  } else {
    labelUsuario.innerHTML = "<strong>Usuario</strong>";
    validUsuario = true;
  }
});
senha.addEventListener("keyup", () => {
  if (senha.value.length <= 5) {
    labelSenha.innerHTML =
      "<strong>Senha (*Insira no mínimo 6 caracteres)</strong>";
  } else {
    labelSenha.innerHTML = "<strong>Senha</strong>";
    validSenha = true;
  }
});
confirmSenha.addEventListener("keyup", () => {
  if (confirmSenha.value != senha.value) {
    labelConfirmSenha.innerHTML =
      "<strong>Confirmar Senha(*as senhas estão diferentes)</strong>";
  } else {
    labelConfirmSenha.innerHTML = "<strong>Confirmar Senha</strong>";
    validConfirmSenha = true;
  }
});

//Cadastro
function cadastrar() {
  if (validConfirmSenha && validNome && validSenha && validUsuario) {
    let listaUser = JSON.parse(localStorage.getItem("listaUser") || "[]");
    listaUser.push({
      nomeCad: nome.value,
      userCad: usuario.value,
      senhaCad: senha.value,
      imageCad: image.value,
    });
    localStorage.setItem("listaUser", JSON.stringify(listaUser));

    msgSuccess.setAttribute("style", "display: block");
    msgError.setAttribute("style", "display: none");
    msgSuccess.innerHTML = "<strong>Usuario Cadastrado</strong>";
    setTimeout(() => {}, 3000);
    window.location.href = "login.html";
  } else {
    msgError.setAttribute("style", "display: block");
    msgSuccess.setAttribute("style", "display: none");
    msgError.innerHTML = "<strong>Usuario Não cadastrado</strong>";
  }
}

//botão pra senha
btn.addEventListener("click", () => {
  let inputSenha = document.querySelector("#senha");

  if (inputSenha.getAttribute("type") == "password") {
    inputSenha.setAttribute("type", "text");
  } else {
    inputSenha.setAttribute("type", "password");
  }
});

btnconfirm.addEventListener("click", () => {
  let inputConfirmSenha = document.querySelector("#confirmSenha");

  if (inputConfirmSenha.getAttribute("type") == "password") {
    inputConfirmSenha.setAttribute("type", "text");
  } else {
    inputConfirmSenha.setAttribute("type", "password");
  }
});
