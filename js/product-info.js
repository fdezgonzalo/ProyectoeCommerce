const PRODUCTOS_INFO = `https://japceibal.github.io/emercado-api/products/${localStorage.idProducto}.json`;
const COMENTARIOS = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.idProducto}.json`;
let divInfo = document.getElementById("divInfo");
let divComentarios = document.getElementById("comentarios");
let agregarComentario = document.getElementById("agregarComentario");
let prodRelacionados = document.getElementById("prodRelacionados");
let comentarios = [];
let score = ''


function agregarCarrito() {
  let id = JSON.parse(localStorage.getItem("idProducto"))
  let nombre = JSON.parse(localStorage.getItem("ultimoAgregado")).name
  let costo = JSON.parse(localStorage.getItem("ultimoAgregado")).unitCost
  let moneda = JSON.parse(localStorage.getItem("ultimoAgregado")).currency
  let imagen = JSON.parse(localStorage.getItem("ultimoAgregado")).image
  if (moneda === "UYU") {
    costo = costo / 40;
    moneda = "USD";
  }
  if (!localStorage.carrito.includes(localStorage.idProducto)) {
    let carritoParseado = JSON.parse(localStorage.carrito)
    let agregar = { "id": id, "name": nombre, "count": 1, "unitCost": Math.round(costo), "currency": moneda, "image": imagen };
    carritoParseado.push(agregar);
    localStorage.setItem("carrito", JSON.stringify(carritoParseado))
  }
  window.location.href = "cart.html"
};

document.addEventListener('DOMContentLoaded', function () {

  fetch(PRODUCTOS_INFO).then(respuesta => respuesta.json()).then(datos => {

    let agregar = { "id": localStorage.idProducto, "name": datos.name, "count": 1, "unitCost": datos.cost, "currency": datos.currency, "image": datos.images[0] };
    localStorage.setItem("ultimoAgregado", JSON.stringify(agregar))

    let htmlContentToAppend =
      `
            <br><h4 id="input-nombre">${datos.name}</h4>
           <hr>

          <div class="containerCarrusel">
            <div id="containerCarrusel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="${datos.images[0]}" class="d-block w-100" id="img-carrusel">
              </div>
              <div class="carousel-item">
                <img src="${datos.images[1]}" class="d-block w-100">
              </div>
              <div class="carousel-item">
                <img src="${datos.images[2]}" class="d-block w-100">
              </div>
              <div class="carousel-item">
                <img src="${datos.images[3]}" class="d-block w-100">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#containerCarrusel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#containerCarrusel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
                      
        <div class="containerInformacion">
            <div id="infoProducto">
           <b>Precio</b><br>
           <span id="input-currency">${datos.currency}</span> <span id="input-precio">${datos.cost}</span><br><br>
           <b>Descripción</b><br>
           ${datos.description}<br><br>
           <b>Categoría</b><br>
           ${datos.category}<br><br>
           <b>Cantidad de vendidos</b><br>
           ${datos.soldCount}<br><br>
           <input onclick="agregarCarrito();" type="submit" value="Agregar al carrito" id="btnComprar">
          </div>
        </div>
        `
    divInfo.innerHTML = htmlContentToAppend;

    //Mostrar comentarios

    fetch(COMENTARIOS).then(respuesta => respuesta.json()).then(datos => {
      comentarios = datos;

      let htmlContentToAppend =
        `<br><h4>Comentarios</h4>`
      divComentarios.innerHTML = htmlContentToAppend;

      for (let comentario of comentarios) {

        function estrellas() {
          let contador = 1
          while (contador <= comentario.score) {
            score += `<span class="fa fa-star checked"></span>`
            contador += 1;
          } while (contador < 6) {
            score += `<span class="fa fa-star"></span>`
            contador += 1;
          };
        };

        function vaciarEstrellas() {
          score = '';
        }

        vaciarEstrellas();
        estrellas();

        htmlContentToAppend =
          `<div class="comentario"><b>${comentario.user}</b> ${comentario.dateTime} ${score}<br>
                 <i>${comentario.description}</i>
                 </div>
                `

        divComentarios.innerHTML += htmlContentToAppend;
      };

      //Agregar comentario nuevo

      htmlContentToAppend =
        `<br><h4>Comentar</h4>
             <form action="" id="formComentarios">
              <label>Tu opinión:</label>
              <br>
              <textarea id="nuevoComentario"></textarea>
              <br>
              <label>Tu puntuación:</label>
              <br>
              <select name="puntuacion" id="puntuacion" placeholder="Tu puntuacion">
               <option value="1">1</option>
               <option value="2">2</option>
               <option value="3">3</option>
               <option value="4">4</option>
               <option value="5">5</option>
              </select>
              <br>
              <input type="submit" id="btnEnviar">
              <hr>
             </form>`
      agregarComentario.innerHTML = htmlContentToAppend

      document.getElementById("btnEnviar").addEventListener('click', function (event) {
        event.preventDefault();

        let puntuacion = document.getElementById("puntuacion").value;
        let contenidoComentario = document.getElementById("nuevoComentario").value;

        let fecha = new Date();
        const fechaFormateada = (current_datetime) => {
          let fecha_formateada = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " +
            current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
          return fecha_formateada;
        };


        function estrellas() {
          let contador = 1
          while (contador <= puntuacion) {
            score += `<span class="fa fa-star checked"></span>`
            contador += 1;
          } while (contador < 6) {
            score += `<span class="fa fa-star"></span>`
            contador += 1;
          };
        };

        function vaciarEstrellas() {
          score = '';
        }

        vaciarEstrellas();
        estrellas();

        htmlContentToAppend =
          `<div class="comentario"><b>${localStorage.Usuario}</b> ${fechaFormateada(fecha)} ${score}<br>
                      <i> ${contenidoComentario}</i>
                     </div>`

        localStorage.setItem("nuevoComentario", htmlContentToAppend);
        divComentarios.innerHTML += localStorage.getItem("nuevoComentario");

      });

      if (localStorage.nuevoComentario) {
        divComentarios.innerHTML += localStorage.getItem("nuevoComentario");
      };

    });

    //Productos Relacionados

    htmlContentToAppend = ` 
        <br> <h4>Productos relacionados</h4>
        <div class ="containerImagenes2">
          <div onclick="guardarID(this)" class="divImg2" id="${datos.relatedProducts[0].id}">
            <img src="${datos.relatedProducts[0].image}" alt="" class="imagen">
            <h4>${datos.relatedProducts[0].name}<h4>
          </div>
          <div onclick="guardarID(this)" class="divImg2" id="${datos.relatedProducts[1].id}">
            <img src="${datos.relatedProducts[1].image}" alt="" class="imagen">
            <h4>${datos.relatedProducts[1].name}<h4>
          </div>
        </div>
        <br><hr>`

    prodRelacionados.innerHTML = htmlContentToAppend;

  });

});

if (!localStorage.Usuario) {
  window.location.href = "login.html";
}