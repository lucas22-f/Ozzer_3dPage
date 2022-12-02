
//Query de elementos
const contenedorCard = document.querySelector('#contenedorCards'); // Contenedor de Productos
const cartCount = document.querySelector('.cartCount'); // Contador del carrito.
const cartContainer = document.querySelector('.cartContainer'); // Contenedor del MODAL carrito 
const filterI = document.querySelectorAll('.filterI'); // Filtro para busquedas
let carrito = []; // Nuestro MODAL DEL CARRITO 
let listaProductos// Nuestro Array Literal de productos. 


    fetch('./data.json') // llamamos a la funcion fetch para traer los datos. 

        .then((res) => res.json())

        .then((data) => {

            listaProductos = data;
            filterItems();
        
     });




//Funciones
const filterItems = () => { // agregamos filtro para renderizado por categorias... 

    renderProductos(); // renderizamos primera vez por defecto todos los productos

    filterI.forEach((el) => {
        el.addEventListener('click', (e) => { // en caso de que hagan click en algun filtro se activa por el swtich! 
            let filterID = Number(el.getAttribute('data-id'))
            switch (filterID) {
                case 0:
                    contenedorCard.innerHTML = ""
                    renderProductos(filterID)
                    break;
                case 1:
                    contenedorCard.innerHTML = ""
                    renderProductos(filterID)
                    break
                case 2:
                    contenedorCard.innerHTML = ""
                    renderProductos(filterID)
                    break
                case 3:
                    contenedorCard.innerHTML = ""
                    renderProductos(filterID)
                    break
                case 4:
                    contenedorCard.innerHTML = ""
                    renderProductos(filterID)
                    break
                default: renderProductos()
                    break;
            }
        })
    })
}



const renderProductos = (filterID) => { // renderizamos productos



    if (filterID) {//si hay filtro 
        let nuevoArr = listaProductos.filter((el) => el.categoria == filterID)
        nuevoArr.forEach((producto) => {
            const card = document.createElement('div');
            card.classList.add('card', 'bg-dark')
            card.style = 'width: 18rem';
            card.innerHTML = `
        <img class="card-img-top p-4" src="${producto.img}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${producto.nombreProd}</h5>
            <h3>$${producto.precio}</h3>
            <p class="card-text">${producto.descripcion}</p>
            
          
            <a class="btn btn-info pcard" data-id=${producto.id}>Añadir al carrito</a>
            
        </div>
        <div class="" id="prodAlert" data-id="${producto.id}"></div>
        `
            contenedorCard.append(card);
        })
    } else {//si no  hay filtro 
        listaProductos.forEach((producto) => {
            const card = document.createElement('div');
            card.classList.add('card', 'bg-dark')
            card.style = 'width: 18rem';
            card.innerHTML = `
            <img class="card-img-top p-4" src="${producto.img}" alt="Card image cap">
            
            <div class="card-body">
                <h5 class="card-title">${producto.nombreProd}</h5>
                <h3>$${producto.precio}</h3>
                <p class="card-text">${producto.descripcion}</p>
                
             
                <a class="btn btn-info pcard" data-id=${producto.id}>Añadir al carrito</a>
               
            </div>
            <div class="" id="prodAlert" data-id="${producto.id}"></div>
            `
            contenedorCard.append(card);
        })
    }

    contenedorCard.classList.add('gap-3');
    agregarArrayCarrito(); // llamamos a la funcion cuando hacen click en alguna tarjeta de producto " añadir al carrito "
}

const agregarArrayCarrito = () => { // si hacen click en alguna card agregamos al ARRAY del carrito.



    const cardSelector = document.querySelectorAll('.pcard')
    !carrito.length && cartContainer.append('Carrito vacio... Agrega productos!')
    cardSelector.forEach((el) => {
        el.addEventListener('click', (e) => { // agregamos un evento al boton de agregar al carrito.
            let productoAgregar = listaProductos.find(el => el.id == e.target.getAttribute("data-id"))


            if (!carrito.some((el) => el.id === productoAgregar.id)) { //verificamos si hacen click en un mismo producto para aumentar su cantidad
                carrito.push({
                    ...productoAgregar,
                    cantidad: 1
                });
            } else {
                const productoSelect = carrito.find((el) => el.id === productoAgregar.id)
                productoSelect.cantidad++;
            }


            alertAddProducto(e.target.getAttribute("data-id"));
            renderCarrito()


        })
    })

}

const alertAddProducto = (id) => {// al momento de hacer click en una card lanzamos una alerta en la misma
    const contenedorAlert = document.querySelectorAll('#prodAlert');
    contenedorAlert.forEach((el) => {
        if (el.getAttribute('data-id') == id) {
            el.innerHTML = `
        <div class="alert alert-success m-3 alert-dismissible fade show" role="alert">
        <strong> <i class="bi bi-check-lg"></i> Agregado al carrito</strong> <br></br>Chequealo haciendo click en el mismo!.
        <strong> <br></br>cantidad: ${(carrito.find((prod) => prod.id == id)).cantidad} </strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        }
    })
}

const renderCarrito = () => { // funcion para actualizar modal del carrito en el dom. 

    cartContainer.innerHTML = "";
    let cant = 0;

    carrito.forEach((pEncarro) => {

        const productoEnCarro = document.createElement('div');
        productoEnCarro.classList.add('productoCarro');
        productoEnCarro.innerHTML = `
        <div class="row rounded" style="margin:3%">
            <img class="col-sm-12 col-md-4" src="${pEncarro.img}" style ="width:11rem" alt="Card image cap">
            <div class="p-3 col-12 col-xl-8 d-flex justify-content-between">
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
        `
        cant += pEncarro.cantidad;
        cartContainer.append(productoEnCarro)


    })


    eliminarProductoDelCarro();// llamada a la funcion de eliminar en caso de que se ejecute


    let addCant = document.querySelectorAll('.addCant'); // agregamos funciones para modificar cantidad en carro. 
    let disCant = document.querySelectorAll('.disCant');

    addCant.forEach((el) => {
        el.addEventListener('click', (e) => {
            if ((carrito.find(p => p.id == el.getAttribute('data-id'))).cantidad > 0) {
                (carrito.find(p => p.id == el.getAttribute('data-id'))).cantidad++
                renderCarrito()
            }
        })
    })
    disCant.forEach((el) => {
        el.addEventListener('click', (e) => {
            if ((carrito.find(p => p.id == el.getAttribute('data-id'))).cantidad > 1) {
                (carrito.find(p => p.id == el.getAttribute('data-id'))).cantidad--
                renderCarrito()

            }

        })
    })

    localStorage.setItem('carrito', JSON.stringify(carrito));//seteamos el carrito en el localStorage

    let arrCantidad = carrito.map((el) => {
        return el.cantidad
    })



    let sumaCantCarrito = arrCantidad.reduce((acc, el) => acc + el, 0)
    cartCount.innerText = sumaCantCarrito
}



const eliminarProductoDelCarro = () => { // funcion para eliminar productos del carrito 1 x 1 
    !carrito.length && cartContainer.append('Carrito vacio')
    const cardCartContainer = document.querySelectorAll('.elim')
    cardCartContainer.forEach((el) => {
        el.addEventListener('click', (e) => {
            let productoQuitar = carrito.find(el => el.id == e.target.getAttribute("data-id"))
            let indice = carrito.indexOf(productoQuitar)
            carrito.splice(indice, 1);
            cartCount.innerText = carrito.length;
            renderCarrito()
            
        })
       
    })
    renderProductos()

}


JSON.parse(localStorage.getItem('carrito')) && JSON.parse(localStorage.getItem('carrito')).forEach((el) => {  // Actualizamos el carrito con los datos de Local Storage para no perder la informacion.
    carrito.push(el)

    renderCarrito()
})







//Ejecuciones
 // Funcion encargada de ejecutar todo el procedimiento 





