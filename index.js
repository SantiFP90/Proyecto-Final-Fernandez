const contenedorCards = document.getElementById("cards");
const carritoCompras = document.getElementById("carritoCompras");
const contCarrito = document.getElementById("contCarrito");

const teclados = [
  {
    id: "1",
    img: "images/imgProductos/redDragonKamura.jpg",
    nombre: "RedDragon Kamura",
    precio: 18000,
  },
  {
    id: "2",
    img: "images/imgProductos/logitetchGPro.webp",
    nombre: "Logitech GPRO",
    precio: 27000,
  },
  {
    id: "3",
    img: "images/imgProductos/nisutaKBGZ61.jpg",
    nombre: "Nisuta KBGZ",
    precio: 18000,
  },
  {
    id: "4",
    img: "images/imgProductos/senteyGS.jpg",
    nombre: "Sentey GS",
    precio: 12000,
  },
  {
    id: "5",
    img: "images/imgProductos/tDagger.jpg",
    nombre: "T-Dragger",
    precio: 15000,
  },
  {
    id: "6",
    img: "images/imgProductos/geniusGXScorpion.jpg",
    nombre: "Genius GXScorpion",
    precio: 7500,
  },
  {
    id: "7",
    img: "images/imgProductos/hyperexAlloy.jpg",
    nombre: "Hyperex Alloy",
    precio: 22000,
  },
  {
    id: "8",
    img: "images/imgProductos/marvoKg.jpg",
    nombre: "Marvo KG",
    precio: 9000,
  },
  {
    id: "9",
    img: "images/imgProductos/NogaNoganet.jpg",
    nombre: "Noga NogaNet",
    precio: 8500,
  },
];

let carrito = [];

//AGREGAR PRODUCTOS A LA PAGINA
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
    console.log(carrito);
  });
});

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
  vaciar.addEventListener("click", vaciarCarrito);
  contCarrito.append(vaciar);
};

carritoCompras.addEventListener("click", verCarrito);

const eliminarProducto = (id) => {
  const eProducto = carrito.find((teclado) => teclado.id === id);
  console.log(eProducto)
  carrito = carrito.filter((carritoFiltrado) => {
    return carritoFiltrado !== eProducto;
  });
  verCarrito();
};

const vaciarCarrito = () => {
  carrito.splice(0, carrito.length);
  verCarrito();
};
