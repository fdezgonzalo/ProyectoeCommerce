const PRODUCTOS_URL = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.catID}.json`;
let containerProductos = document.getElementById("container-productos");
let botones = document.getElementById("botones");
let contenidoProductos;
let contenidoBotones;
let productos = [];

document.addEventListener('DOMContentLoaded', function () {

  fetch(PRODUCTOS_URL).then(respuesta => respuesta.json()).then(datos => {
    console.log(datos)
    productos = datos.products;

    contenidoBotones = `<div class= "text-center p-4">
        <h2>Productos</h2>
        <p class= "lead">Veras aqui todos los productos de la categoria ${datos.catName}</p>
    </div>
    <div class="container">
      <div class="row">
        <div class="col text-end">
          <div class="btn-group btn-group-toggle mb-4" data-bs-toggle="buttons">
            <input type="radio" class="btn-check" name="options" id="sortAsc">
            <abbr title="Menor precio"><label class="btn btn-light" for="sortAsc"><i class="fas fa-sort-amount-up"></i>$</label></abbr>
            <input type="radio" class="btn-check" name="options" id="sortDesc">
            <abbr title="Mayor precio"><label class="btn btn-light" for="sortDesc"><i class="fas fa-sort-amount-down mr-1"></i>$</label></abbr>
            <input type="radio" class="btn-check" name="options" id="sortByRel" checked>
            <abbr title="Relevancia"><label class="btn btn-light" for="sortByRel"><i class="fas fa-sort-amount-down mr-1"></i>Rel.</label></abbr>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 offset-lg-6 col-md-12 mb-1 container">
          <div class="row container p-0 m-0">
            <div class="col">
              <p class="font-weight-normal text-end my-2">Precio</p>
            </div>
            <div class="col">
              <input class="form-control" type="number" placeholder="min." id="min">
            </div>
            <div class="col">
              <input class="form-control" type="number" placeholder="máx." id="max">
            </div>
            <div class="col-3 p-0">
              <div class="btn-group" role="group">
                <button class="btn btn-light btn-block" id="filter">Filtrar</button>
                <button class="btn btn-link btn-sm" id="limpiar">Limpiar</button>
              </div>
            </div>
          </div>
        </div>
      </div>`

    botones.innerHTML = contenidoBotones;

    function mostrarProductos(productos) {
      for (let producto of productos) {
        contenidoProductos +=
          `<div onclick="guardarID(this)" class="list-group-item list-group-item-action cursor-active" id="${producto.id}">
            <div class="row">
                <div class="col-3">
                    <img src="${producto.image}" alt="" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${producto.name} - ${producto.currency} ${producto.cost}</h4>
                        <small class="text-muted">${producto.soldCount} vendidos</small>
                    </div>
                    <p class="mb-1">${producto.description}</p>
                </div>
            </div>
        </div>`
      };
      containerProductos.innerHTML = contenidoProductos;
    };

    function vaciar() {
      contenidoProductos = '';
    }

    vaciar();
    mostrarProductos(productos);

    let inputMin = document.getElementById("min");
    let inputMax = document.getElementById("max");

    function filtrarProductos(productos) {
      let productosFiltrados = productos.filter(producto => {
        if (inputMin.value === '' && inputMax.value === '') {
          return true;
        }
        else if (inputMin.value === '') {
          return producto.cost <= inputMax.value;
        }
        else if (inputMax.value === '') {
          return producto.cost >= inputMin.value;
        }
        return producto.cost >= inputMin.value && producto.cost <= inputMax.value;
      })
      return productosFiltrados;
    }

    //ORDENAR

    document.getElementById("sortAsc").addEventListener('click', function () {
      productos.sort((a, b) => {
        if (a.cost < b.cost) {
          return -1;
        } else if (a.cost > b.cost) {
          return 1;
        } else {
          return 0;
        }
      });
      vaciar();
      mostrarProductos(productos);
    });

    document.getElementById("sortDesc").addEventListener('click', function () {
      productos.sort((a, b) => {
        if (a.cost > b.cost) {
          return -1;
        } else if (a.cost < b.cost) {
          return 1;
        } else {
          return 0;
        }
      });
      vaciar();
      mostrarProductos(productos);
    });

    document.getElementById("sortByRel").addEventListener('click', function () {
      productos.sort((a, b) => {
        if (a.soldCount > b.soldCount) {
          return -1;
        } else if (a.soldCount < b.soldCount) {
          return 1;
        } else {
          return 0;
        }
      });
      vaciar();
      mostrarProductos(productos);
    });

    document.getElementById("filter").addEventListener('click', function () {
      vaciar();
      mostrarProductos(filtrarProductos(productos));
    });

    document.getElementById("limpiar").addEventListener('click', function () {
      document.getElementById('min').value = '';
      document.getElementById('max').value = '';
      vaciar();
      mostrarProductos(productos);
    });

  });
  
});

if (!localStorage.Usuario) {
  window.location.href = "login.html";
}


