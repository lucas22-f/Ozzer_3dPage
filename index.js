
//Query de elementos
const contenedorCard = document.querySelector('#contenedorCards');
const cartCount = document.querySelector('.cartCount');
const cartContainer = document.querySelector('.cartContainer');
const filterI = document.querySelectorAll('.filterI');

//Funciones

const renderProductos = (filterID) => { // renderizamos productos
    if(filterID){
       let nuevoArr  = listaProductos.filter((el)=> el.categoria == filterID)
       nuevoArr.forEach((producto) => {
        const card = document.createElement('div');
        card.classList.add('card', 'bg-dark')
        card.style = 'width: 22rem';
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
    }else{
        listaProductos.forEach((producto) => {
            const card = document.createElement('div');
            card.classList.add('card', 'bg-dark')
            card.style = 'width: 22rem';
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
    agregarArrayCarrito();
}

const agregarArrayCarrito = () => { // si hacen click en alguna card agregamos al ARRAY del carrito.
    const cardSelector = document.querySelectorAll('.pcard')
    cardSelector.forEach((el) => {
        el.addEventListener('click', (e) => { // agregamos un evento al boton de agregar al carrito.
            let productoAgregar = listaProductos.find(el => el.id == e.target.getAttribute("data-id"))
            carrito.push(productoAgregar);
            cartCount.innerText = carrito.length; // contador para el carrito. 
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
        <strong> <i class="bi bi-check-lg"></i> Agregado al carrito</strong> Chequealo haciendo click en el mismo!.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
        }
    })
}

const renderCarrito = () => { // funcion para actualizar el carrito en el dom. 
    cartContainer.innerHTML = "";
    
    carrito.forEach((pEncarro) => {

        const productoEnCarro = document.createElement('div');
        productoEnCarro.classList.add('productoCarro', 'p-3');
        productoEnCarro.innerHTML = `
        <div class="row rounded">
            <img class="col-sm-12 col-md-4" src="${pEncarro.img}" width="200" heigth="200" alt="Card image cap">
            <div class="p-3 col-12 col-xl-8">
                <div>
                    <h5 class="">${pEncarro.nombreProd}</h5>
                    <h3>$${pEncarro.precio}</h3>
                    <p class="">${pEncarro.descripcion}</p>
                </div>
                <div>
                <a class="btn btn-info elim "data-id=${pEncarro.id}>Eliminar del carro</a>
                </div>
            </div>
        </div>
        `
        cartContainer.append(productoEnCarro)

    })

    eliminarProductoDelCarro();// llamada a la funcion de eliminar en caso de que se ejecute
    localStorage.setItem('carrito',JSON.stringify(carrito));//seteamos el carrito en el localStorage
}



const eliminarProductoDelCarro = () => { // funcion para eliminar productos del carrito 1 x 1 
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
}

JSON.parse(localStorage.getItem('carrito')) && JSON.parse(localStorage.getItem('carrito')).forEach((el)=>{  // Actualizamos el carrito con los datos de Local Storage para no perder la informacion.
    carrito.push(el)
    cartCount.innerText = carrito.length;
    renderCarrito()
})



const filterItems = () =>{ // agregamos filtro para renderizado por categorias... 
    renderProductos();
    filterI.forEach((el)=>{
        el.addEventListener('click',(e)=>{
            let filterID = Number(el.getAttribute('data-id'))
            switch (filterID) {
                case 0: 
                    contenedorCard.innerHTML=""
                    renderProductos(filterID)
                    break;
                case 1:
                    contenedorCard.innerHTML=""
                    renderProductos(filterID)
                    break
                case 2:
                    contenedorCard.innerHTML=""
                    renderProductos(filterID)
                    break
                case 3:
                    contenedorCard.innerHTML=""
                    renderProductos(filterID)
                    break
                case 4:
                    contenedorCard.innerHTML=""
                    renderProductos(filterID)
                    break
                default: renderProductos()
                    break;
            }
        })
    })
}



//Ejecuciones
 filterItems(); // Funcion encargada de ejecutar todo el procedimiento 





