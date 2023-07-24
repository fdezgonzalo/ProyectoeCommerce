let formulario = document.getElementById("form-login");
let email = document.getElementById("email");
let contra = document.getElementById("contra");
let nombreEsquina = document.getElementById("nombreEsquina");

if(localStorage.Usuario) {
    localStorage.removeItem("Usuario");
    localStorage.removeItem("infoUsuario")
    localStorage.removeItem("imagenPerfil")
}

formulario.addEventListener('submit', function validar(evento) {
    evento.preventDefault();
    let validarEmail = /\S+@\S+\.\S+/
    if ((contra.value.length >= 6) && (email.value.length > 0) && (validarEmail.test(email.value) === true)) {
        window.location.href = "index.html"
    } else if ((contra.value.length === 0) || (email.value.length === 0)) {
        alert("Debes completar ambos campos")
    } else if (contra.value.length<6) {
        alert("La contraseña debe tener al menos 6 caracteres")
    } else if (email != validarEmail) {
        alert("Debes ingresar un email válido")
    }
    localStorage.setItem("Usuario", email.value);
});



