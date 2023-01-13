


const renderProductos = (filterID) => {
    // renderizamos productos
    if (filterID) {
        //si hay filtro
        let nuevoArr = listaProductos.filter((el) => el.categoria == filterID);
        nuevoArr.forEach((producto) => {
            const card = document.createElement("div");
            card.classList.add("card", "bg-dark");
            card.style = "width: 18rem";
            card.innerHTML = `
        <img class="card-img-top p-4" src="${producto.img}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${producto.nombreProd}</h5>
            <h3>$${producto.precio}</h3>
            <p class="card-text">${producto.descripcion}</p>
            
          
            <a class="btn btn-info pcard" data-id=${producto.id}>Añadir al carrito</a>
            
        </div>
        <div class="" id="prodAlert" data-id="${producto.id}"></div>
        `;
            contenedorCard.append(card);
        });
    } else {
        //si no  hay filtro
        listaProductos.forEach((producto) => {
            const card = document.createElement("div");
            card.classList.add("card", "bg-dark");
            card.style = "width: 18rem";
            card.innerHTML = `
            <img class="card-img-top p-4" src="${producto.img}" alt="Card image cap">
            
            <div class="card-body">
                <h5 class="card-title">${producto.nombreProd}</h5>
                <h3>$${producto.precio}</h3>
                <p class="card-text">${producto.descripcion}</p>
                
             
                <a class="btn btn-info pcard" data-id=${producto.id}>Añadir al carrito</a>
               
            </div>
            <div class="" id="prodAlert" data-id="${producto.id}"></div>
            `;
            contenedorCard.append(card);
        });
    }

    contenedorCard.classList.add("gap-3");
    agregarArrayCarrito(); // llamamos a la funcion cuando hacen click en alguna tarjeta de producto " añadir al carrito "
};

const agregarArrayCarrito = () => {// si hacen click en alguna card agregamos al ARRAY del carrito.

    const cardSelector = document.querySelectorAll(".pcard");
    !carrito.length && cartContainer.append("Carrito vacio... Agrega productos!");
    cardSelector.forEach((el) => {
        el.addEventListener("click", (e) => { // agregamos un evento al boton de agregar al carrito.
            let productoAgregar = listaProductos.find(
                (el) => el.id == e.target.getAttribute("data-id")
            );

            if (!carrito.some((el) => el.id === productoAgregar.id)) {//verificamos si hacen click en un mismo producto para aumentar su cantidad
                carrito.push({
                    ...productoAgregar,
                    cantidad: 1,
                });
            } else {
                const productoSelect = carrito.find(
                    (el) => el.id === productoAgregar.id
                );
        
                if(productoSelect.cantidad>=1&&productoSelect.cantidad<10){
                    productoSelect.cantidad++;
                }
                
            }
            const productoSelect = carrito.find(
                (el) => el.id === productoAgregar.id
            );

            alertAddProducto(productoSelect.cantidad);
            renderCarrito();
        });
    });
};

const alertAddProducto = (cant) => {
    if(cant<10){
        Swal.fire({
            position: "top-end",
            text: "Agregado Correctamente",
            toast: true,
            icon: "success",
            showConfirmButton: false,
            color: "#0dcaf0",
            background: "#30373d",
            timer: 1000,
        });
    }else{
        Swal.fire({
            position: "top-end",
            text: "Max Alcanzado",
            toast: true,
            icon: "error",
            showConfirmButton: false,
            color: "#0dcaf0",
            background: "#30373d",
            timer: 1000,
        });
    }
    
};


function searchProducts() { // funcion busqueda de productos

    const search = document.querySelector('.search');
    const imputBuscador = document.querySelector('#buscador');


    let busqueda;
    imputBuscador.addEventListener('input', (e) => {
        busqueda = String(e.target.value).toLowerCase()
    })

    search.addEventListener('click', () => {
        renderProductosBySearch(busqueda); //llamamos al render de productos por busqueda
        cartContainer.innerText = ""
        !carrito.length && cartContainer.append("Carrito vacio... Agrega productos!");
    })

}

function renderProductosBySearch(busqueda) { // render busqueda
    if (busqueda) {
        contenedorCard.innerHTML = "";
        let arr = listaProductos.filter((el) => el.nombreProd.toLowerCase().includes(busqueda))
        if (arr.length) {
            arr.forEach((producto) => {
                const card = document.createElement("div");
                card.classList.add("card", "bg-dark");
                card.style = "width: 18rem";
                card.innerHTML = `
                      <img class="card-img-top p-4" src="${producto.img}" alt="Card image cap">
                      
                      <div class="card-body">
                          <h5 class="card-title">${producto.nombreProd}</h5>
                          <h3>$${producto.precio}</h3>
                          <p class="card-text">${producto.descripcion}</p>
                          
                       
                          <a class="btn btn-info pcard" data-id=${producto.id}>Añadir al carrito</a>
                         
                      </div>
                      <div class="" id="prodAlert" data-id="${producto.id}"></div>
                      `;
                contenedorCard.append(card);
            });
            agregarArrayCarrito();
        } else {
            contenedorCard.innerHTML = `<p> No encontramos resultados... 😫</p>`
        }
    } else {
        contenedorCard.innerHTML = "";
        renderProductos()
    }
}