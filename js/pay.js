
const contenedorPayCards = document.querySelector('#contenedorPayCards') // obtenemos el contenedor del Pago de productos
const contenedorPayButtons = document.querySelector('#contenedorPayButtons');//obtenemos el contenedor de la botonera.
const contDatap = document.querySelector(".datap");
const dataSbt = document.querySelector(".datasbt")
const dataT = document.querySelector(".dataT")

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
        <div class="row rounded justify-content-between">
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
        datapText.innerHTML = `<p>x${el.cantidad} ${el.nombreProd}</p>`
        contDatap.append(datapText);


        const dataSbtText = document.createElement("p")
        dataSbtText.innerHTML = `<p>$ ${el.precio*el.cantidad}</p>`
        dataSbt.append(dataSbtText);

        cant += el.cantidad
        total = total + (el.precio * el.cantidad) // calculamos el total de los precios
        
        
        dataT.innerHTML = `<p>$ ${total}</p>`
        

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

const form = document.querySelector("form")
const email = document.querySelector("#email");
const nombre = document.querySelector("#nombre");
const localidad = document.querySelector("#localidad");
const provincia = document.querySelector("#provincia");
const direccion = document.querySelector("#direccion");
const cp = document.querySelector("#cp");
const telefono = document.querySelector("#telefono");
const inputs  =document.querySelector("input");
const transf = document.querySelector("#transferencia");
const efect = document.querySelector("#efectivo");

const getDataForm = () =>{
    console.log("tamos on")
  
   
        let emailValue;
        let nombreValue;
        let localidadValue;
        let provinciaValue;
        let direccionValue;
        let cpValue;
        let telefonoValue;

        email.addEventListener("input",(e)=>{
           
            if(!e.data){
                emailValue = "vacio"
            }
                
            
            
        })
        nombre.addEventListener("input",(e)=>{
            nombreValue = e.target.value 
        })
        localidad.addEventListener("input",(e)=>{
            localidadValue = e.target.value 
        })
        provincia.addEventListener("input",(e)=>{
            provinciaValue = e.target.value 
        })
        direccion.addEventListener("input",(e)=>{
            direccionValue = e.target.value 
        })
        cp.addEventListener("input",(e)=>{
            cpValue = e.target.value 
        })
        telefono.addEventListener("input",(e)=>{
            telefonoValue = e.target.value 
        })
        let values = {};
       
     

  

    const selectMethod = {
        efect:undefined,
        transf:undefined
    }
    transf.addEventListener("click",(e)=>{
        selectMethod.transf = e.target.checked
        selectMethod.efect = false
        /* console.log(selectMethod) */
    })
    efect.addEventListener("click",(e)=>{
        selectMethod.transf = false
        selectMethod.efect = e.target.checked
        /* console.log(selectMethod) */
    })

    form.addEventListener("submit",(e)=>{
        e.preventDefault()

       

        values.email = emailValue;
        values.nombre = nombreValue
        values.localidad = localidadValue
        values.provincia = provinciaValue
        values.direccion = direccionValue
        values.cp = cpValue
        values.telefono = telefonoValue
        values.method = selectMethod
        values.cart = {
            cartDesc:contDatap.innerText,
            cartTotal:total,
            cartCant:cant
        }

        checkErrors(values);
        console.log(values)
    })

    
  
    
}

function checkErrors(values){
    if (!values.email){
        errorHandling("Necesitamos tu email",email)
    }
    else if (!values.nombre){
        errorHandling("Necesitamos tu nombre y apellido",nombre)
    }
    else if (!values.localidad){
        errorHandling("Necesitamos tu localidad",localidad)
    }
    else if (!values.provincia){
        errorHandling("Necesitamos tu provincia",provincia)
    }
    else if (!values.direccion){
        errorHandling("Necesitamos tu direccion",direccion)
    }
    else if (!values.cp){
        errorHandling("Necesitamos tu codigo postal",cp)
    }
    else if (!values.telefono){
        errorHandling("Necesitamos tu telefono",telefono)
    }else if(!values.method.efect&&!values.method.transf){
        errorHandling("Necesitamos la forma de pago",transf)
        errorHandling("Necesitamos la forma de pago",efect)
    }
}

function errorHandling(text,input){   
    const parentElement = input.parentElement
    const message = parentElement.querySelector(".error")
    message.innerText = text
    message.classList.add("active")
}


getDataForm()
renderPagoCarrito();
payEndApp();

