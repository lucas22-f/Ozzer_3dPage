
// ---------------------INDEX------------------------


//Query de elementos
const contenedorCard = document.querySelector("#contenedorCards"); // Contenedor de Productos
const cartCount = document.querySelector(".cartCount"); // Contador del carrito.
const cartCount2 = document.querySelector(".cartCount2"); // Contador del carrito en el scroll.
const cartContainer = document.querySelector(".cartContainer"); // Contenedor del MODAL carrito
const filterI = document.querySelectorAll(".filterI"); // Filtro para busquedas
let carrito = []; // Nuestro MODAL DEL CARRITO
let listaProductos; // Nuestro Array Literal de productos.



fetch("./json/data.json") // llamamos a la funcion fetch para traer los datos.
    .then((res) => res.json())

    .then((data) => {
        listaProductos = data;
        filterItems(); // funcion principal que llama a los demas procedimientos. 

    });


//Funciones

const filterItems = () => {
    // agregamos filtro para renderizado por categorias...
    scrollCartController() // ejecutamos controlador de carrito en scroll.
    renderProductos(); // renderizamos primera vez por defecto todos los productos
    searchProducts();// renderizamos por busqueda los productos
    

    filterI.forEach((el) => {
        el.addEventListener("click", (e) => {
            // en caso de que hagan click en algun filtro se activa por el swtich!
            let filterID = Number(el.getAttribute("data-id"));
            switch (filterID) {
                case 0:
                    contenedorCard.innerHTML = "";
                    renderProductos(filterID);
                    break;
                case 1:
                    contenedorCard.innerHTML = "";
                    renderProductos(filterID);
                    break;
                case 2:
                    contenedorCard.innerHTML = "";
                    renderProductos(filterID);
                    break;
                case 3:
                    contenedorCard.innerHTML = "";
                    renderProductos(filterID);
                    break;
                case 4:
                    contenedorCard.innerHTML = "";
                    renderProductos(filterID);
                    break;
                default:
                    renderProductos();
                    break;
            }
        });
    });
};


JSON.parse(localStorage.getItem("carrito")) &&
    JSON.parse(localStorage.getItem("carrito")).forEach((el) => {
        // Actualizamos el carrito con los datos de Local Storage para no perder la informacion.
        carrito.push(el);

        renderCarrito();
    });

