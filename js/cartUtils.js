

const renderCarrito = () => {
    // funcion para actualizar modal del carrito en el dom.
    cartContainer.innerHTML = "";
    let cant = 0;

    carrito.forEach((pEncarro) => {
        const productoEnCarro = document.createElement("div");
        productoEnCarro.classList.add("productoCarro");
        productoEnCarro.innerHTML = `
        <div class="row rounded" style="margin:3%">
            <img class="col-sm-12 col-md-4" src="${pEncarro.img}" style ="width:11rem" alt="Card image cap">
            <div class="col-12 col-xl-8 d-flex justify-content-between">
                <div>
                    <h5 class="">${pEncarro.nombreProd}</h5>
                    <h3>$${pEncarro.precio}</h3>
                    <p class="">${pEncarro.descripcion}</p>
                    <div>
                        <a class="btn btn-info elim" data-id=${pEncarro.id}>Eliminar del carro</a>
                    </div>
                </div>
                <div>
                    <button class="btn btn-light bg-dark text-light addCant" data-id=${pEncarro.id}>+</button>
                    <button class="btn btn-light bg-dark text-light disCant" data-id=${pEncarro.id}>-</button>
                    
                    <h5 class="mt-3"> Cantidad: ${pEncarro.cantidad} </h5>
                </div>
            </div>
        </div>
        `;
        cant += pEncarro.cantidad;
        cartContainer.append(productoEnCarro);
    });

    eliminarProductoDelCarro(); // llamada a la funcion de eliminar en caso de que se ejecute

    cantController(); // llamamos a la funcion para controlar las cantidades de los productos dentro del modal carrito. 
    
};



const eliminarProductoDelCarro = () => {
    // funcion para eliminar productos del carrito 1 x 1
    !carrito.length && cartContainer.append("Carrito vacio");
    const cardCartContainer = document.querySelectorAll(".elim");
    cardCartContainer.forEach((el) => {
        el.addEventListener("click", (e) => {
            let productoQuitar = carrito.find(
                (el) => el.id == e.target.getAttribute("data-id")
            );
            let indice = carrito.indexOf(productoQuitar);
            carrito.splice(indice, 1);
            cartCount.innerText = carrito.length;
            cartCount2.innerText = carrito.length;
            renderCarrito();
        });
    });
};


function cantController(){

    let addCant = document.querySelectorAll(".addCant"); // agregamos funciones para modificar cantidad en carro.
    let disCant = document.querySelectorAll(".disCant");

    addCant.forEach((el) => {
        el.addEventListener("click", (e) => {
            if (carrito.find((p) => p.id == el.getAttribute("data-id")).cantidad > 0) {

                carrito.find((p) => p.id == el.getAttribute("data-id")).cantidad++;
                renderCarrito();

            }
        });
    });
    disCant.forEach((el) => {
        el.addEventListener("click", (e) => {
            if (carrito.find((p) => p.id == el.getAttribute("data-id")).cantidad > 1) {

                carrito.find((p) => p.id == el.getAttribute("data-id")).cantidad--;
                renderCarrito();

            }
        });
    });

    localStorage.setItem("carrito", JSON.stringify(carrito)); //seteamos el carrito en el localStorage

    let arrCantidad = carrito.map((el) => {
        return el.cantidad;
    });

    let sumaCantCarrito = arrCantidad.reduce((acc, el) => acc + el, 0); // seteamos la cantidad de productos en el carrito 
    cartCount.innerText = sumaCantCarrito;
    cartCount2.innerText = sumaCantCarrito;



}


function scrollCartController() {
    const cartCountBot = document.querySelector(".cartCountBot");    // Control del Boton Carrito en el scroll. 
    const scrollContainer = () => {
        return document.documentElement || document.body;
    };
    const corte = 1200;

    document.addEventListener("scroll", () => {
        if (scrollContainer().scrollTop > corte) {
            cartCountBot.classList.remove("hidden");
        } else {
            cartCountBot.classList.add("hidden");
        }
    });
}