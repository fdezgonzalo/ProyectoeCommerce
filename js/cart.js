let divCarrito = document.getElementById('div-carrito');
let divTitulo = document.getElementById('titulo-carrito');
let divTabla = document.getElementById('tabla-productos');
let divFormulario = document.getElementById('formulario-carrito');
let divCostos = document.getElementById('costos');
let divModal = document.getElementById("forma-pago");
let carritoParseado = JSON.parse(localStorage.carrito);


document.addEventListener('DOMContentLoaded', function () {

    let titulo = `
    <br>
    <h3 style="text-align:center">Carrito de Compras</h3>
    <h5 style="text-align:center">Articulos a comprar</h5>
    <br>`;
    divTitulo.innerHTML = titulo;


    //Creación de la tabla

    for (let producto of carritoParseado) {
        let fila = document.createElement('tr');

        let celdaImagen = document.createElement('td');
        let celdaNombre = document.createElement('td');
        let celdaCosto = document.createElement('td');
        let celdaCantidad = document.createElement('td');
        let celdaSubtotal = document.createElement('td');
        let celdaEliminar = document.createElement('td');
        celdaImagen.setAttribute("style", "padding-left:10px");
        celdaCosto.setAttribute("class", "unit-cost");
        celdaSubtotal.setAttribute("class", "subtotal");

        let contenidoImagen = document.createElement('img');
        let contenidoNombre = document.createTextNode(producto.name);
        let contenidoCosto = document.createTextNode(producto.currency + " " + producto.unitCost);
        let contenidoCantidad = document.createElement('input');
        let contenidoSubtotal = document.createTextNode(producto.currency + " " + producto.unitCost);
        let contenidoEliminar = document.createElement("button");
        contenidoImagen.setAttribute("src", producto.image);
        contenidoImagen.setAttribute("style", "width:70px");
        contenidoCantidad.setAttribute("type", "number");
        contenidoCantidad.setAttribute("onclick", "actualizarCostos()");
        contenidoCantidad.setAttribute("value", "1");
        contenidoCantidad.setAttribute("min", "1");
        contenidoCantidad.setAttribute("class", "input-cantidad");
        contenidoEliminar.setAttribute("class", "eliminar-item-carrito");
        contenidoEliminar.innerHTML = `<i class='far fa-trash-alt'></i>`;

        celdaImagen.appendChild(contenidoImagen);
        celdaNombre.appendChild(contenidoNombre);
        celdaCosto.appendChild(contenidoCosto);
        celdaCantidad.appendChild(contenidoCantidad);
        celdaSubtotal.appendChild(contenidoSubtotal);
        celdaEliminar.appendChild(contenidoEliminar);

        fila.appendChild(celdaImagen);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaCosto);
        fila.appendChild(celdaCantidad);
        fila.appendChild(celdaSubtotal);
        fila.appendChild(celdaEliminar);

        tbody.appendChild(fila);
    };


    //Sección de envíos

    let formCarrito = `
   
    <form id="formCarrito" class="row mt-3 g-3 needs-validation" novalidate>
    <h5 style="padding-top:20px; padding-bottom:5px">Tipo de envío</h5>
     <div>
      <input type="radio" id="envioPremium" name="envio" value="0.15" class="tipo-envio" required checked>
      <label for="envioPremium">Premium 2 a 5 días (15%)</label>
     </div>
     <div>
      <input type="radio" id="envioExpress" name="envio" value="0.07" class="tipo-envio" required>
      <label for="envioExpress">Express 5 a 8 días (7%)</label>
     </div>
     <div>
      <input type="radio" id="envioStandard" name="envio" value="0.05" class="tipo-envio" required> 
      <label for="envioStandard">Standard 12 a 15 días (5%)</label>
     </div>
     <h5 style="padding-top:20px; padding-bottom:5px">Dirección de envío</h5>
     <div class="col-12 position-relative">
      <input type="text" class="form-control" id="dirCalle" placeholder="Calle" style="width:100%; padding-left:10px" required>
      <div class="invalid-feedback">
      Ingresa una calle
      </div>
     </div>
     <div class="col-10 position-relative">
      <input type="text" class="form-control" id="dirEsquina" placeholder="Esquina" style="width:100%; padding-left:10px" required>
      <div class="invalid-feedback">
      Ingresa una esquina
      </div>
     </div>
     <div class="col-2 position-relative">
      <input type="text" class="form-control" id="dirNumero" placeholder="Número" style="width:100%; padding-left:10px" onkeypress="return soloNumeros(event);" maxlength="4" required>
      <div class="invalid-feedback">
      Ingresa un número
      </div>
     </div>

    <h5 style="padding-top:20px; padding-bottom:5px">Costos</h5>
    <div style="border:1px solid #cfcfcf; border-radius: 5px">
    <div class="container" style="border-bottom:1px solid #cfcfcf; padding:5px" id="costos-subtotal">
     Subtotal <span style="display:block; float:right" id="span-subtotal"></span> <br>
     Costo unitario del producto por cantidad
    </div>
    <div class="container" style="border-bottom:1px solid #cfcfcf; padding:5px" id="costos-envio">
     Costo de envío<span style="display:block; float:right" id="span-envio"></span> <br>
     Según el tipo de envío
    </div>
    <div class="container" style="padding-top:15px; padding-bottom:15px; padding-left:5px; padding-right:5px" id="costos-total">
     <b>Total($)</b> <span style="display:block; float:right" id="span-total"><b></b></span>
    </div>
    </div>

    <h5 style="padding-top:20px; padding-bottom:5px">Forma de pago</h5>
    <div>
    <button type="button" class="btn btn-link ps-0 " data-bs-toggle="modal" data-bs-target="#modalPagos" id="btn-check">Seleccionar</button>
      <div class="visually-hidden text-danger" id="div-texto-check">
        Debe seleccionar un metodo de pago
      </div>
      <div class="visually-hidden text-danger" id="div-texto-check2">
        Debe completar todos los campos
      </div>
      <div class="visually-hidden" id="div-texto-tarjeta">
        Vas a pagar con tarjeta de crédito
      </div> 
      <div class="visually-hidden" id="div-texto-transferencia">
        Vas a pagar con transferencia bancaria
      </div> 
    </div>
    
    <div class="modal fade" id="modalPagos" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Forma de pago</h1>
        </div>
        <div class="modal-body">
          <div class="needs-validation" id="formulario-pagos">
            <input type="radio" id="pago-tarjeta" name="metodo-de-pago" required form="formCarrito"> 
            <label for="pago-tarjeta">Tarjeta de credito</label><br>
            <div>
            <input type="text" placeholder="Número de tarjeta" id="input-tarjeta" style="padding:3px" onkeypress="return soloNumeros(event);" maxlength="19" disabled required> 
            <div class="visually-hidden text-danger" id="div-texto-check">
             Ingrese su numero de tarjeta
            </div>  
            </div>
            <div>
            <input type="text" placeholder="Código de seguridad" id="input-cvv" style="padding:3px" onkeypress="return soloNumeros(event);" maxlength="3" disabled required>
            </div>
            <div>
            <input type="text" onfocus="(this.type='month')" onblur="(this.type='text')" placeholder="Vencimiento" id="input-vencimiento" style="padding:3px" onkeypress="return soloNumeros(event);" disabled required>
            </div>
            <br>
            <input type="radio" id="pago-transferencia" name="metodo-de-pago" required form="formCarrito"> 
            <label for="pago-transferencia">Transferencia bancaria</label><br>
            <input type="text" placeholder="Número de cuenta" id="input-transferencia" style="padding:3px" onkeypress="return soloNumeros(event);" maxlength="12" disabled required>
          </div>
        </div>
        <div class="modal-footer">
          <div class="form-check">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br><br>
  <input type="submit" style="width:100%" class="btn btn-primary btn-lg btn-block" id="btn-finalizar-compra" value="Finalizar compra">
  </form>`;
    divFormulario.innerHTML += formCarrito;

    //Actualizar subtotal de cada producto

    let inputCantidad = document.querySelectorAll(".input-cantidad");
    let subtotalProducto = document.querySelectorAll(".subtotal");

    inputCantidad.forEach(function (item, index) {
        item.addEventListener("input", function () {
            carritoParseado[index].count = item.value;
            localStorage.setItem("carrito", JSON.stringify(carritoParseado));
            item.value = carritoParseado[index].count;
            subtotalProducto[index].innerHTML = carritoParseado[index].currency + " " + carritoParseado[index].unitCost * item.value;
        });
        item.value = carritoParseado[index].count;
        subtotalProducto[index].innerHTML = carritoParseado[index].currency + " " + Math.round(carritoParseado[index].unitCost) * item.value;
    });


    //Eliminar producto

    let botonEliminar = document.querySelectorAll(".eliminar-item-carrito");
    botonEliminar.forEach(function (boton, index) {
        boton.addEventListener("click", function () {
            let removerProducto = carritoParseado.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(carritoParseado));
            window.location.href = "cart.html";
        });
    });


    //Funcion para generar costos

    function generarCostos() {
        let subtotalProducto = document.querySelectorAll(".subtotal");
        let spanSubtotal = document.getElementById("span-subtotal");
        let spanEnvio = document.getElementById("span-envio");
        let tipoEnvio = document.querySelectorAll(".tipo-envio");
        let spanTotal = document.getElementById("span-total");
        total = 0

        subtotalProducto.forEach(function (item) {
            let subtotalProducto = item.textContent;
            subtotalProducto = subtotalProducto.replace("USD", "");
            subtotalProducto = subtotalProducto.replace(" ", "");
            subtotalProducto = JSON.parse(subtotalProducto);
            total += subtotalProducto
        })
        tipoEnvio.forEach(function (radio) {
            radio.addEventListener('change', function () {
                let tipoEnvio = document.querySelector('input[name="envio"]:checked').value;
                spanEnvio.innerHTML = `USD <span id="costo-envio">${Math.round(total * tipoEnvio)}</span>`;
                spanTotal.innerHTML = `<b>USD ${Math.round(total + JSON.parse(document.getElementById("costo-envio").textContent))}</b>`;
            })
            let tipoEnvio = document.querySelector('input[name="envio"]:checked').value;
            spanEnvio.innerHTML = `USD <span id="costo-envio">${Math.round(total * tipoEnvio)}</span>`;
            spanTotal.innerHTML = `<b>USD ${Math.round(total + JSON.parse(document.getElementById("costo-envio").textContent))}</b>`;
        })
        spanSubtotal.innerHTML = `USD ${total}`;
    };

    generarCostos();


    //Funcionalidades modal de pagos

    let pagoTarjeta = document.getElementById("pago-tarjeta");
    let pagoTransferencia = document.getElementById("pago-transferencia");
    let inputTarjeta = document.getElementById("input-tarjeta");
    let inputCvv = document.getElementById("input-cvv");
    let inputVencimiento = document.getElementById("input-vencimiento");
    let inputTransferencia = document.getElementById("input-transferencia");
    let formularioPagos = document.getElementById("formulario-pagos");

    formularioPagos.addEventListener("change", function () {

        if (pagoTarjeta.checked) {
            pagoTarjeta.setAttribute("required", "");
            pagoTransferencia.removeAttribute("required");
            inputTarjeta.removeAttribute("disabled");
            inputCvv.removeAttribute("disabled");
            inputVencimiento.removeAttribute("disabled");
            inputTransferencia.setAttribute("disabled", "");
            inputTarjeta.setAttribute("required", "");
            inputCvv.setAttribute("required", "");
            inputVencimiento.setAttribute("required", "");
            inputTransferencia.value = "";
        } else if (pagoTransferencia.checked) {
            pagoTransferencia.setAttribute("required", "");
            pagoTarjeta.removeAttribute("required");
            inputTransferencia.removeAttribute("disabled");
            inputTarjeta.setAttribute("disabled", "");
            inputCvv.setAttribute("disabled", "");
            inputVencimiento.setAttribute("disabled", "");
            inputTarjeta.removeAttribute("required");
            inputCvv.removeAttribute("required");
            inputVencimiento.removeAttribute("required");
            inputTarjeta.value = "";
            inputCvv.value = "";
            inputVencimiento.value = "";
        };

        inputTarjeta.addEventListener("input", function (e) {
            if ((e.target.value.length == 4) || (e.target.value.length == 9) || (e.target.value.length == 14)) {
                e.target.value += " ";
            };
        });
    });

    //Validacion bootstrap

    (function () {
        'use strict'

        document.getElementById("btn-finalizar-compra").addEventListener('click', function (evento) {

            if ((!pagoTarjeta.checked) && (!pagoTransferencia.checked)) {
                document.getElementById('div-texto-check').classList.remove('visually-hidden');
            } else if ((document.getElementById("dirCalle").length > 0) && (document.getElementById("dirEsquina").length > 0) && (document.getElementById("dirNumero").length > 0)) {
                alert("Compra exitosa")
            };

            pagoTarjeta.addEventListener("click", function () {
                if ((pagoTarjeta.checked) || (pagoTransferencia.checked)) {
                    document.getElementById('div-texto-check').classList.add('visually-hidden');
                    document.getElementById('div-texto-check2').classList.remove('visually-hidden');
                };
                document.getElementById('div-texto-transferencia').classList.add('visually-hidden');
            });

            pagoTransferencia.addEventListener("click", function () {
                if ((pagoTarjeta.checked) || (pagoTransferencia.checked)) {
                    document.getElementById('div-texto-check').classList.add('visually-hidden');
                    document.getElementById('div-texto-check2').classList.remove('visually-hidden');
                };
                document.getElementById('div-texto-tarjeta').classList.add('visually-hidden');
            });

        });

        inputTarjeta.addEventListener('input', validarInputsTarjeta);
        inputCvv.addEventListener('input', validarInputsTarjeta);
        inputVencimiento.addEventListener('input', validarInputsTarjeta);
        inputTransferencia.addEventListener('input', validarInputTransferencia);

        function validarInputsTarjeta() {
            if ((inputTarjeta.value.length == 19) && (inputCvv.value.length == 3) && (inputVencimiento.value.length == 7)) {
                document.getElementById('div-texto-check2').classList.add('visually-hidden')

                document.getElementById('div-texto-tarjeta').classList.remove('visually-hidden')
            };
        };

        function validarInputTransferencia() {
            if (inputTransferencia.value.length == 12) {
                document.getElementById('div-texto-check2').classList.add('visually-hidden')

                document.getElementById('div-texto-transferencia').classList.remove('visually-hidden')
            };
        };

        var forms = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
            })
    })()

    if (localStorage.carrito == "[]") {
        let carritoVacio = `
        <div class="alert alert-warning" role="alert">
        Tu carrito está vacío. <a href="categories.html" class="alert-link">Ir a lista de productos</a>
        </div>`
        divCarrito.innerHTML = carritoVacio
    }

});
//Fin DOMContentLoaded

//Función para actualizar los costos

function actualizarCostos() {
    let subtotalProducto = document.querySelectorAll(".subtotal");
    let spanSubtotal = document.getElementById("span-subtotal");
    let spanEnvio = document.getElementById("span-envio");
    let tipoEnvio = document.querySelectorAll(".tipo-envio");
    let spanTotal = document.getElementById("span-total");
    total = 0

    subtotalProducto.forEach(function (item) {
        let subtotalProducto = item.textContent;
        subtotalProducto = subtotalProducto.replace("USD", "");
        subtotalProducto = subtotalProducto.replace(" ", "");
        subtotalProducto = JSON.parse(subtotalProducto);
        total += subtotalProducto;
    })
    tipoEnvio.forEach(function (radio) {
        radio.addEventListener('change', function () {
            let tipoEnvio = document.querySelector('input[name="envio"]:checked').value;
            spanEnvio.innerHTML = `USD <span id="costo-envio">${Math.round(total * tipoEnvio)}</span>`;
            spanTotal.innerHTML = `<b>USD ${Math.round(total + JSON.parse(document.getElementById("costo-envio").textContent))}</b>`;
        });
        let tipoEnvio = document.querySelector('input[name="envio"]:checked').value;
        spanEnvio.innerHTML = `USD <span id="costo-envio">${Math.round(total * tipoEnvio)}</span>`;
        spanTotal.innerHTML = `<b>USD ${Math.round(total + JSON.parse(document.getElementById("costo-envio").textContent))}</b>`;
    });
    spanSubtotal.innerHTML = `USD ${total}`;
};

//Función para aceptar solo números 

function soloNumeros(e) {
    let keynum = window.event ? window.event.keyCode : e.which;
    if (keynum == 8) return true;
    return /\d/.test(String.fromCharCode(keynum));
};


if (!localStorage.Usuario) {
    window.location.href = "login.html";
};

