
const contenedorPayCards = document.querySelector('#contenedorPayCards') // obtenemos el contenedor del Pago de productos
const contenedorPayButtons = document.querySelector('#contenedorPayButtons');//obtenemos el contenedor de la botonera.
let total = 0; // definimos variable para calcular el total
let cant = 0;
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const renderPagoCarrito = () => { // renderizamos el carrito en el dom.

    let msj = document.createElement('h4')
    msj.innerText = `💔 Carrito vacio... agrega productos! 💔`
    msj.classList.add('text-center')


    !carrito.length && contenedorPayCards.append(msj);

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
        btnPagar.innerHTML = `
    <div class="d-flex align-items-center justify-content-center pay">
        <h3 class="m-3">Total productos:  ${cant}</h3>
          <h3 class="m-3">Total: $${total}</h3>
          <div class="btn btn-info alertOk" >Pagar</div>
         
    </div>
   `

        contenedorPayButtons.append(btnPagar);
    }
}

const payEndApp =  () => { // se defina final de la app vaciando el carrito y dando mensaje de pago.

    if (carrito.length) {
        let pagoOk = document.querySelector('.alertOk')
        let pay = document.querySelector('.pay')
        pagoOk.addEventListener('click', async () => {
           
           /*  const { value: email } = await Swal.fire({
                title: 'Ingresa Tu Email',
                input: 'email',
                inputLabel: 'Direccion de email',
                inputPlaceholder: 'Email',
                backdrop:false
              }) */
              Email.send({
                Host : "smtp.elasticemail.com",
                Username : "<lucas.200061@gmail.com>",
                Password : "<302A72F3BECB2D9BD62D974BBA6D5C92CE98>",
                To : 'lucas.200061@gmail.com',
                From : "sender@example.com",
                Subject : "Test email",
                Body : "<html><h2>Header</h2><strong>Bold text</strong><br></br><em>Italic</em></html>"
            }).then(
              message => alert(message)
            );
              
              pay.innerHTML = " "
              pay.innerHTML= `<a href="../index.html"class="btn btn-info text-center"> Regresar </a>`
           
            
            contenedorPayCards.innerHTML = ""
            localStorage.clear();
            carrito = [];
        
        })
       
    }
}

renderPagoCarrito();
payEndApp();

