const contenedorCards = document.getElementById("cards");
const carritoCompras = document.getElementById("carritoCompras");
const contCarrito = document.getElementById("contCarrito");
const gAlta = document.getElementById("gAlta");
const gMedia = document.getElementById("gMedia");
const gBaja = document.getElementById("gBaja");

let teclados = [];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

//AGREGAR PRODUCTOS A LA PAGINA
cargaTeclados = () => {

  // baja()

  // media()

  // gAlta.addEventListener("click", ()=>{
  //   alta()
  // })

  teclados.forEach((teclado) => {
    const { id, img, nombre, precio } = teclado;
    let card = document.createElement("div");
    card.classList.add("margenCards");
    card.innerHTML = `
    <div>
          <img src="${img}" alt="Teclaro número: ${id}">
          <p>${nombre}</p>
          <p>$ ${precio}</p>
      </div>
      `;
    contenedorCards.append(card);

    let añadirCarrito = document.createElement("button");
    añadirCarrito.innerText = "Añadir Carrito";
    card.append(añadirCarrito);
    

    //AGREGAR PRODUCTOS AL CARRITO
    añadirCarrito.addEventListener("click", () => {
      carrito.push({
        id: id,
        img: img,
        nombre: nombre,
        precio: precio,
      });
      guardarEnLocal()
      Toastify({
        text: "Añadido al carrito! :)",
        duration: 3000,
        gravity: 'bottom',
        position: 'left',
        style:{
          background:"rgba(52, 205, 52, 0.558)",
        }
        }).showToast();
    });
  })
};

  gAlta.addEventListener("click", ()=>{
    alta()
  })

const verCarrito = () => {
  //CONTENEDOR DEL CARRITO
  contCarrito.innerHTML = "";
  contCarrito.style.display = "flex";

  //CARRITO HEADER boton y total.
  const carritoCargadoHeader = document.createElement("div");
  carritoCargadoHeader.classList.add("showCarrito");

  //BOTON CERRAR CARRITO
  const botonCerrar = document.createElement("button");
  botonCerrar.innerText = `Cerrar`;
  carritoCargadoHeader.append(botonCerrar);
  botonCerrar.addEventListener("click", () => {
    contCarrito.style.display = "none";
  });

  //TOTAL
  const total = carrito.reduce((acc, el) => acc + el.precio, 0);
  const precioTotal = document.createElement("div");
  precioTotal.classList.add("pTotal");
  precioTotal.innerHTML = `
      <h4>Total: $ ${total}</h4>
    `;
  precioTotal.style.textAlign = "center";
  carritoCargadoHeader.append(precioTotal);

  //AGREGAR HEADER AL CONTENEDOR
  contCarrito.append(carritoCargadoHeader);

  //CARGA DE LOS PRODUCTOS

  carrito.forEach((teclado) => {
    const { id, img, nombre, precio } = teclado;
    let carritoTeclados = document.createElement("div");
    carritoTeclados.classList.add("tecladosCargados");
    carritoTeclados.innerHTML = `
    <div>
      <hr>
      <img src="${img}" alt="Teclado número:${id}">
      <p>${nombre}</p>
      <p> $ ${precio}</p>
      <p class="quitar" >Quitar</p>
      <hr>
    </div>
    `;

    //QUITAR TECLADO DEL CARRITO
    let quitar = carritoTeclados.querySelector(".quitar");
    quitar.addEventListener("click", ()=>{
      eliminarProducto(id)
      Toastify({
        text: "Eliminado del carrito! :(",
        duration: 3000,
        gravity: 'bottom',
        position: 'left',
        style:{
          background:"rgba(205, 52, 52, 0.558)",
        }
        }).showToast();
    });

    //AGREGAR PRODUCTOS AL CONTENEDOR
    contCarrito.append(carritoTeclados);

  });

  //TOTAL DEBAJO
  const totalAbajo = carrito.reduce((acc, el) => acc + el.precio, 0);
  const precioTotalAbajo = document.createElement("div");
  precioTotalAbajo.classList.add("pTotal");
  precioTotalAbajo.innerHTML = `
      <h4>Total: $ ${totalAbajo}</h4>
    `;
  contCarrito.append(precioTotalAbajo);

  //Vaciar carrito
  const vaciar = document.createElement("p");
  vaciar.classList.add("vaciarCarrito");
  vaciar.innerText = "Vaciar carrito";
  vaciar.addEventListener("click", ()=>{
    Swal.fire({
      title: '¿Quieres vaciar el carrito?',
      text: "Perderas todos los productos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4e3d61',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Acpetar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Operacion cancelada.',
          '¡Caritto vacio!',
          'success',
        )
        vaciarCarrito()
        contCarrito.style.display = "none";
      }
    })
    // vaciarCarrito()
    // contCarrito.style.display = "none";
  });
  contCarrito.append(vaciar);
};

carritoCompras.addEventListener("click", verCarrito);

const eliminarProducto = (id) => {
  const eProducto = carrito.find((teclado) => teclado.id === id);

  carrito = carrito.filter((carritoFiltrado) => {
    return carritoFiltrado !== eProducto;
  });
  guardarEnLocal();
  verCarrito();
};

const vaciarCarrito = () => {
  carrito.splice(0, carrito.length);
  localStorage.removeItem('carrito')
  verCarrito();
};

const alta = () => {
  teclados = teclados.filter((teclados) => {
    return teclados.gama === "alta"
  });
}
const media = () => {
  teclados = teclados.filter((teclados) => {
    return teclados.gama === "media"
  });
}
const baja = () => {
  teclados = teclados.filter((teclados) => {
    return teclados.gama === "baja"
  });
}


//LocalStorage
const guardarEnLocal = () =>{
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

//FETCH
fetch('./data/index.json')
.then((res) => res.json())
.then((jsonResponse) => {
    teclados = jsonResponse.teclados
    cargaTeclados();
})

