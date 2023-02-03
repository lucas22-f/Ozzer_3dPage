

const renderCarrito = () => {
    // funcion para actualizar modal del carrito en el dom.
    cartContainer.innerHTML = "";
    let cant = 0;

    carrito.forEach((pEncarro) => {
        const productoEnCarro = document.createElement("div");
        productoEnCarro.classList.add("productoCarro");
        productoEnCarro.innerHTML = `
        <div class="row border-bottom shadow p-5" style="margin:3%">
            <div class="col-12 col-md-6 my-2">
                <img class="img-fluid" src="${pEncarro.img}" style ="width:11rem" alt="Card image cap">
            </div>
           
            <div class="col-12 col-md-6 ">
                <div class="my-2">
                    <h5>${pEncarro.nombreProd}</h5>
                    <h3>$${pEncarro.precio}</h3>
                    <p>${pEncarro.descripcion}</p>
                    <div>
                        <a class="btn btn-info elim" data-id=${pEncarro.id}>Eliminar del carro</a>
                    </div>
                </div>
                <div class="mt-3">
                    <button class="btn btn-light bg-dark text-light addCant" data-id=${pEncarro.id}>+</button>
                    <button class="btn btn-light bg-dark text-light disCant" data-id=${pEncarro.id}>-</button>
                    
                    <h5 class="my-3"> Cantidad: ${pEncarro.cantidad} </h5>
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
          
            renderCarrito();
        });
    });
};


function cantController(){

    let addCant = document.querySelectorAll(".addCant"); // agregamos funciones para modificar cantidad en carro.
    let disCant = document.querySelectorAll(".disCant");

    addCant.forEach((el) => {
        el.addEventListener("click", (e) => {
            const cant = carrito.find((p) => p.id == el.getAttribute("data-id")).cantidad
            if ( cant > 0 && cant <10 ) {

                carrito.find((p) => p.id == el.getAttribute("data-id")).cantidad++;
                renderCarrito();

            }
        });
    });
    disCant.forEach((el) => {
        el.addEventListener("click", (e) => {
            const cant = carrito.find((p) => p.id == el.getAttribute("data-id")).cantidad
            if ( cant > 1) {

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
    



}


function scrollCartController() {
    const cartCountBot = document.querySelector(".cartCountBot2");
    const UpController = document.querySelector(".UpController");
    const cartCountBot3 = document.querySelector(".cartCountBot3");
    const cartCountBot4 = document.querySelector(".cartCountBot4");
    // Control del Boton Carrito en el scroll. 
    const scrollContainer = () => {
        return document.documentElement || document.body;
    };
    const corte = 1200;
    cartCountBot.classList.add("hidden");
    cartCountBot3.classList.add("hidden");

    cartCountBot3.addEventListener("click",()=>{
        cartCountBot4.classList.toggle("animate__fadeInUp");
    })


    document.addEventListener("scroll", ()=> {
        if (scrollContainer().scrollTop > corte) {
           
            UpController.addEventListener("click", () => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            });
        }
    });

    document.addEventListener("scroll", () => {
        
        if (scrollContainer().scrollTop > corte) {
            cartCountBot.classList.remove("hidden");
            cartCountBot3.classList.remove("hidden");
        } else {
            cartCountBot.classList.add("hidden");
            cartCountBot3.classList.add("hidden");
        }
    });
}