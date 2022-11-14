//Declaraciones 

let carrito = [];
console.log(carrito);


//Query de elementos
const contenedorCard = document.querySelector('#contenedorCards');
const cartCount = document.querySelector('.cartCount');
const cartContainer = document.querySelector('.cartContainer');


//Funciones

const renderProductos = () =>{
    listaProductos.forEach((producto)=>{
        const card = document.createElement('div');
        card.classList.add('card','bg-dark')
        card.style = 'width: 28rem';
        card.innerHTML = `
        <img class="card-img-top p-4" src="${producto.img}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${producto.nombreProd}</h5>
            <h3>$${producto.precio}</h3>
            <p class="card-text">${producto.descripcion}</p>
            <a class="btn btn-info pcard"data-id=${producto.id}>Añadir al carrito</a>
        </div>
        `
        contenedorCard.append(card);
    })
    contenedorCard.classList.add('gap-3');

}


const agregarProductos = () =>{
    const cardSelector = document.querySelectorAll('.pcard')
    cardSelector.forEach((el)=>{
        el.addEventListener('click',(e)=>{
            let productoAgregar = listaProductos.find(el => el.id == e.target.getAttribute("data-id"))
            carrito.push(productoAgregar);
            cartCount.innerText = carrito.length;
            insertarProductoCarrito()
        })
    })
}

const insertarProductoCarrito = () =>{
    cartContainer.innerHTML = "";
    carrito.forEach((pEncarro)=>{
        
        const productoEnCarro = document.createElement('div');
        productoEnCarro.classList.add('productoCarro','p-3');
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
                <a class="btn btn-info pcard"data-id=${pEncarro.id}>Eliminar del carro</a>
                </div>
            </div>
        </div>
        
        `

        cartContainer.append(productoEnCarro)

    })
    
    
}
const quitarProductoCarrito = () =>{

}



//Event Listeners


//Ejecuciones
renderProductos();
agregarProductos();



