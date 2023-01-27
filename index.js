const contenedorCards = document.getElementById("cards");
const carritoCompras = document.getElementById("carritoCompras");
const contCarrito= document.getElementById("contCarrito")


const teclados = [
  {
    id: "1",
    img: "images/imgProductos/redDragonKamura.jpg",
    nombre: "RedDragon Kamura",
    precio: "18.000",
  },
  {
    id: "2",
    img: "images/imgProductos/logitetchGPro.webp",
    nombre: "Logitech GPRO",
    precio: "27.000",
  },
  {
    id: "3",
    img: "images/imgProductos/nisutaKBGZ61.jpg",
    nombre: "Nisuta KBGZ",
    precio: "18.000",
  },
  {
    id: "4",
    img: "images/imgProductos/senteyGS.jpg",
    nombre: "Sentey GS",
    precio: "12.000",
  },
  {
    id: "5",
    img: "images/imgProductos/tDagger.jpg",
    nombre: "T-Dragger",
    precio: "15.000",
  },
  {
    id: "6",
    img: "images/imgProductos/geniusGXScorpion.jpg",
    nombre: "Genius GXScorpion",
    precio: "7.500",
  },
  {
    id: "7",
    img: "images/imgProductos/hyperexAlloy.jpg",
    nombre: "Hyperex Alloy",
    precio: "22.000",
  },
  {
    id: "8",
    img: "images/imgProductos/marvoKg.jpg",
    nombre: "Marvo KG",
    precio: "9.000",
  }, 
  {
    id: "9",
    img: "images/imgProductos/NogaNoganet.jpg",
    nombre: "Noga NogaNet",
    precio: "8.500",
  },
];

let carrito = [];

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

  añadirCarrito.addEventListener("click", ()=>{
    carrito.push({
      id: id,
      img:img,
      nombre: nombre,
      precio: precio,
    })
    console.log(carrito)
  });
});

carritoCompras.addEventListener("click",()=>{

  const carritoCargadoHeader = document.createElement("div");
  carritoCargadoHeader.classList.add('showCarrito');
  carritoCargadoHeader.innerHTML= `
    <button>Cerrar</button>
    `;

  contCarrito.append(carritoCargadoHeader);

  carrito.forEach((teclado)=> {
    const {id, img, nombre, precio } = teclado;
    let carritoTeclados = document.createElement("div");
    carritoTeclados.classList.add('tecladosCargados');
    carritoTeclados.innerHTML = `
    <div>
      <img src="${img}" alt="Teclaro número: ${id}">
      <p>${nombre}</p>
      <p>${precio}</p>
      <p>Quitar</p>
    </div>
    `
    contCarrito.append(carritoTeclados);
  })



})