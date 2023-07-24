let divPerfil = document.getElementById("div-perfil");

document.addEventListener('DOMContentLoaded', function () {

  let contenidoPerfil = `
    <br>
    <div class="row mt-3 g-3">
     <div class="col-6">
      <h4>Perfil</h4>
     </div>
     <div class="col-6" style="text-align:right">
      <img src="img/img_perfil.png" id="img-perfil" style="width:8%">
     </div>
    </div>
    <form id="formulario-perfil" class="row mt-3 g-3 needs-validation" novalidate>
     <hr> 
     <div class="col-6">
      <label for="perfil-nombre1" class="form-label">Primer nombre*</label>
      <input type="text" class="form-control" id="perfil-nombre1" style="width:100%;" required>
     </div>
     <div class="col-6">
      <label for="perfil-nombre2" class="form-label">Segundo nombre</label>
      <input type="text" class="form-control" id="perfil-nombre2" style="width:100%;">
     </div>
     <div class="col-6">
      <label for="perfil-apellido1" class="form-label">Primer apellido*</label>
      <input type="text" class="form-control" id="perfil-apellido1" style="width:100%;" required>  
     </div>
     <div class="col-6">    
      <label for="perfil-apellido2" class="form-label">Segundo apellido</label>   
      <input type="text" class="form-control" id="perfil-apellido2" style="width:100%;">
     </div>
     <div class="col-6">
      <label for="perfil-email" class="form-label">Email*</label>
      <input type="email" class="form-control" id="perfil-email" style="width:100%;" required>
     </div>
     <div class="col-6">
      <label for="perfil-telefono" class="form-label">Teléfono de contacto*</label>
      <input type="text" class="form-control" id="perfil-telefono" style="width:100%;" required>
     </div> 
     <div class="col-12" id="div-selector">
      <label for="selector-foto" class="form-label">Imagen de perfil</label>
      <input class="col-6 form-control" type="file" id="selector-foto">
     </div>   
     <hr>
     <div class="col-12" id="div-botones">
     <button class="btn btn-primary" type="submit" id="btn-guardar-perfil" style="width:80%">Guardar cambios</button>
     <button type="button" class="btn btn-danger" style="width:19.5%" id="btn-eliminar-foto" disabled>Eliminar foto</button>
    </form>   
    `
  divPerfil.innerHTML = contenidoPerfil;

  let inputEmail = document.getElementById("perfil-email");
  let btnGuardarPeril = document.getElementById("btn-guardar-perfil");
  let selectorImagen = document.getElementById("selector-foto");
  let imagen = document.getElementById("img-perfil");

  //Funcion para pasar la imagen a Base64
  async function encodeFileAsBase64URL(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        resolve(reader.result);
      });
      reader.readAsDataURL(file);
    });
  };

  selectorImagen.addEventListener('input', async (event) => {
    //Paso la imagen a Base64
    const base64URL = await encodeFileAsBase64URL(selectorImagen.files[0]);
    //Reemplazo la imagen
    imagen.setAttribute('src', base64URL);
  });

  inputEmail.value = document.getElementById("nombreEsquina").textContent;

  btnGuardarPeril.addEventListener("click", function (evento) {

    let nombrePerfil1 = document.getElementById("perfil-nombre1").value;
    let nombrePerfil2 = document.getElementById("perfil-nombre2").value;
    let apellidoPerfil1 = document.getElementById("perfil-apellido1").value;
    let apellidoPerfil2 = document.getElementById("perfil-apellido2").value;
    let emailPerfil = document.getElementById("perfil-email").value;
    let telefonoPerfil = document.getElementById("perfil-telefono").value;
    let validarEmail = /\S+@\S+\.\S+/;

    let infoUsuario = {
      "Nombre": nombrePerfil1,
      "SegundoNombre": nombrePerfil2,
      "PrimerApellido": apellidoPerfil1,
      "SegundoApellido": apellidoPerfil2,
      "Email": emailPerfil,
      "Telefono": telefonoPerfil
    };

    if ((nombrePerfil1.length > 0) && (apellidoPerfil1.length > 0) && (validarEmail.test(emailPerfil)) && (telefonoPerfil.length > 0)) {
      localStorage.setItem("infoUsuario", JSON.stringify(infoUsuario));
      localStorage.setItem("Usuario", emailPerfil)
      document.getElementById("nombreEsquina").innerHTML = localStorage.Usuario;
    };

    localStorage.setItem("imagenPerfil", imagen.src)
  });

  if (localStorage.imagenPerfil) {
    let botonEliminarFoto = document.getElementById("btn-eliminar-foto");

    imagen.src = localStorage.imagenPerfil;
    botonEliminarFoto.removeAttribute("disabled");

    botonEliminarFoto.addEventListener("click", function () {
      localStorage.removeItem("imagenPerfil");
      imagen.setAttribute('src', "img/img_perfil.png");
      botonEliminarFoto.setAttribute("disabled", "");
    });
  };


  let nombrePerfil1 = document.getElementById("perfil-nombre1");
  let nombrePerfil2 = document.getElementById("perfil-nombre2");
  let apellidoPerfil1 = document.getElementById("perfil-apellido1");
  let apellidoPerfil2 = document.getElementById("perfil-apellido2");
  let emailPerfil = document.getElementById("perfil-email");
  let telefonoPerfil = document.getElementById("perfil-telefono");
  let infoUsuarioParseada = JSON.parse(localStorage.infoUsuario)

  nombrePerfil1.value = infoUsuarioParseada.Nombre;
  nombrePerfil2.value = infoUsuarioParseada.SegundoNombre;
  apellidoPerfil1.value = infoUsuarioParseada.PrimerApellido;
  apellidoPerfil2.value = infoUsuarioParseada.SegundoApellido;
  emailPerfil.value = infoUsuarioParseada.Email;
  telefonoPerfil.value = infoUsuarioParseada.Telefono;

});

if (!localStorage.Usuario) {
  window.location.href = "login.html";
}