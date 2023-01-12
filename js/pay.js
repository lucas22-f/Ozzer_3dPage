
const contenedorPayCards = document.querySelector('#contenedorPayCards') // obtenemos el contenedor del Pago de productos
const contenedorPayButtons = document.querySelector('#contenedorPayButtons');//obtenemos el contenedor de la botonera.
const contDatap = document.querySelector(".datap");
const dataSbt = document.querySelector(".datasbt")


let total = 0; // definimos variable para calcular el total
let cant = 0;
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const renderPagoCarrito = () => { // renderizamos el carrito en el dom.

    let msj = document.createElement('h4')
    msj.innerText = `💔 Carrito vacio... agrega productos! 💔`
    msj.classList.add('text-center')
    const dataPedido = document.querySelector("#dataPedido");
  
    !carrito.length && dataPedido.classList.add("ondisplay")
    !carrito.length && contenedorPayCards.append(msj)

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
        const datapText = document.createElement("p");
        datapText.innerHTML = `<p>${el.nombreProd}</p>`
        contDatap.append(datapText);
        console.log(contDatap.innerHTML)

        cant += el.cantidad
        total = total + (el.precio * el.cantidad) // calculamos el total de los precios
       
        contenedorPayCards.append(card)
    })



    if (carrito.length) {
        const btnPagar = document.createElement('div'); // agregamos boton de pago. 
        btnPagar.innerHTML = `
    <div class="d-flex align-items-center justify-content-center pay flex-column">
        <h5 class="m-3">Total productos:  ${cant}</h5>
          <h5 class="m-3">Total: $${total}</h5>
          <div class="btn btn-info alertOk m-3" >Pagar</div>
         
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
           

            const myAlert = Swal.mixin({ // creamos un mixin para editar los estilos del boton 
                customClass: {
                  confirmButton: 'btn btn-info',
                },
                buttonsStyling: false
              })

              

            /*  const { value: email } = await myAlert.fire({
                title: 'Ingresa Tu Email',
                input: 'email',
                inputLabel: 'Direccion de email',
                inputPlaceholder: 'Email',
                color: "#0dcaf0",
                background: "#30373d",
                backdrop:false,
                validationMessage:"Email invalido"

             })  */
              
              let tempParams = { // creamos objeto a enviar con los datos del mail
                from_name:'OZEER_3d@mail.com',
                to_name : email,
                message: 'lista de productos comprados....'
              }

             await emailjs.send('service_lficazu','template_v2jsmng',tempParams)  // utilizamos la funcion de EmailJs asincrona para hacer envio de un mail
              
              
              pay.innerHTML = " "
              pay.innerHTML= `
              <div><h3> Mail con datos para el pago Enviados!.. muchas gracias por tu compra 🧡</h3></div>
              <img src='../assets/final.jpg' style="width:300px;border-radius:50%;box-shadow: #505050 0px 0px 5px;" class="m-3"></img>
              <a href="../index.html"class="btn btn-info text-center m-5"> Regresar </a>`
              
            
            contenedorPayCards.innerHTML = ""
            localStorage.clear();
            carrito = [];
        
        })
       
    }
}

renderPagoCarrito();
payEndApp();

