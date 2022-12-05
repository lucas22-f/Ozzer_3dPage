
const contenedorPayCards = document.querySelector('#contenedorPayCards') // obtenemos el contenedor del Pago de productos
const contenedorPayButtons = document.querySelector('#contenedorPayButtons');//obtenemos el contenedor de la botonera.
let total = 0; // definimos variable para calcular el total
let cant = 0;
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const renderPagoCarrito = () => { // renderizamos el carrito en el dom.
    !carrito.length && contenedorPayCards.append('Carrito vacio... agrega mas productos!')
    carrito.forEach((el) => {
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="row rounded">
            <img class="img img-fluid col-sm-12 col-md-3 p-3" src="${el.img}" width=200 heigth=200 alt="Card image cap">
            <div class="col-md-3">
                <div>
                    <h5 class="m-3 ">${el.nombreProd}</h5>
                    <p class="m-3 ">${el.descripcion}</p>
                    
                </div>
                <div class="" id="prodAlert" data-id="${el.id}"></div>
            </div>

            <div class="col-md-4 text-end">
                <h3 class="m-3">$${el.precio}</h3>
                <h4 class="m-3" > cantidad: ${el.cantidad}</h4>
            </div>         
        </div>
        `
        cant += el.cantidad
        total = total + (el.precio * el.cantidad) // calculamos el total de los precios
        contenedorPayCards.append(card)

    })
    if (carrito.length) {
        const btnPagar = document.createElement('div'); // agregamos boton de pago. 
        btnPagar.classList.add('text-end')
        btnPagar.innerHTML = `
    <div class="d-flex align-items-center justify-content-end">
        <h3 class="m-3">Total productos:  ${cant}</h3>
          <h3 class="m-3">Total: $${total}</h3>
          <div class="btn btn-info alertOk" >Pagar</div>
         
    </div>
    <div class="text-center" id="insertAlert"></div> `

        contenedorPayButtons.append(btnPagar);
    }
}

const payEndApp = () => { // se defina final de la app vaciando el carrito y dando mensaje de pago.

    if (carrito.length) {
        let pagoOk = document.querySelector('.alertOk')
        pagoOk.addEventListener('click', (e) => {
            let insertAlert = document.querySelector('#insertAlert')
            insertAlert.innerHTML = `<div class="alert alert-success" role="alert">
        <strong> Muchas Gracias por tu compra! </strong>
        </div>`
            contenedorPayCards.innerHTML = ""
            localStorage.clear();
            carrito = [];

        })
    }
}

renderPagoCarrito();
payEndApp();

