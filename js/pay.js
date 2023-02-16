
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
            <img class="img img-fluid col-sm-12 col-md-3 p-3" src=".${el.img}" width=200 heigth=200 alt="Card image cap">
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

}

/* const payEndApp =  () => { 
    // se defina final de la app vaciando el carrito y dando mensaje de pago.

    if (carrito.length) {
        let pagoOk = document.querySelector('.alertOk')
        let pay = document.querySelector('.pay')
        pagoOk.addEventListener('click', async () => {
           

            const myAlert = Swal.mixin({ 
                // creamos un mixin para editar los estilos del boton 
                customClass: {
                  confirmButton: 'btn btn-info',
                },
                buttonsStyling: false
              })

              

             const { value: email } = await myAlert.fire({
                title: 'Ingresa Tu Email',
                input: 'email',
                inputLabel: 'Direccion de email',
                inputPlaceholder: 'Email',
                color: "#0dcaf0",
                background: "#30373d",
                backdrop:false,
                validationMessage:"Email invalido"

             })  
              
              let tempParams = { 
                // creamos objeto a enviar con los datos del mail
                from_name:'OZEER_3d@mail.com',
                to_name : email,
                message: 'lista de productos comprados....'
              }

             await emailjs.send('service_lficazu','template_v2jsmng',tempParams)  
              // utilizamos la funcion de EmailJs asincrona para hacer envio de un mail
              
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
} */

const form = document.querySelector("form")
const email = document.querySelector("#email");
const nombre = document.querySelector("#nombre");
const localidad = document.querySelector("#localidad");
const provincia = document.querySelector("#provincia");
const direccion = document.querySelector("#direccion");
const cp = document.querySelector("#cp");
const telefono = document.querySelector("#telefono");
const inputs  =document.querySelectorAll("input");
const transf = document.querySelector("#transferencia");
const efect = document.querySelector("#efectivo");

const getDataForm = () =>{


        let emailValue;
        let nombreValue;
        let localidadValue;
        let provinciaValue;
        let direccionValue;
        let cpValue;
        let telefonoValue;

        email.addEventListener("input",(e)=>{
           
            emailValue = e.target.value 
                
            
            
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
       
     

  

    let selectMethod =""
    transf.addEventListener("click",(e)=>{
    
        if(e.target.checked){
            selectMethod="transferencia"
            
        }
       
    })
    efect.addEventListener("click",(e)=>{
        
        if(e.target.checked){
            selectMethod= "efect"
            
        }
    
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
        

        
        if(checkErrors(values)){
            createWppChannel(values)
        }
    })

    
  
    
}

function checkErrors(values){
    let df = false
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
    }else if(!values.method){
        errorHandling("Necesitamos la forma de pago",transf)
        errorHandling("Necesitamos la forma de pago",efect)
    }else{
        inputs.forEach((input)=>succesBorder(input))
        df = true
        return df
    }
}

function errorHandling(text,input){   
    const parentElement = input.parentElement
    const message = parentElement.querySelector(".error")
    message.innerText = text
    message.classList.add("active")
}

function succesBorder(input){
    const parentElement = input.parentElement
    parentElement.classList.add("greenBorder")
    const errorMessage = parentElement.querySelector(".error")
    if(errorMessage){
        errorMessage.remove();
    }
}

function  createWppChannel(values){
    /*    values.cart = {
            cartDesc:contDatap.innerText,
            cartTotal:total,
            cartCant:cant
        } */
let stringP = `Mi pedido:
${values.cart.cartDesc}
Total: $${values.cart.cartTotal}
Pago: ${values.method}

Mis Datos:
${values.email}
${values.nombre}
${values.localidad}
${values.provincia}
${values.direccion}
${values.cp}
${values.telefono}
`
        
     let pedido = encodeURI(stringP) 
     
     const ejem= "https://web.whatsapp.com/send/?phone=5491165427871&text=Mi+pedido%3A%0Ax2+Goku+impreso+3d%0ATotal%3A+%2410000%0APago%3A+transferencia%0A%0AMis+Datos%3A%0Alucas.200061%40gmail.com%0Aaasd%0AEzeiza%0ABuenos+Aires%0ARepublica+Argentina+890%0A1804%0A01165427871%0A&type=phone_number&app_absent=0"
    const urlMobile = `https://wa.me/5491165427871?text=${pedido}`
     const urlDesktop = `https://web.whatsapp.com/send/?phone=5491165427871&text=${pedido}&type=phone_number&app_absent=0`
    
     if(isMobile()){
        window.open(urlMobile,"_blank")
        window.location.replace("../index.html")
     }else{
        window.open(urlDesktop,"_blank")
        window.location.replace("../index.html")
     }


    /* window.open(urlDesktop,"_blank")
    window.location.replace("/") */
}   


function isMobile(){
        if (navigator.userAgent.match(/Android/i) 
        || navigator.userAgent.match(/webOS/i) 
        || navigator.userAgent.match(/iPhone/i) 
        || navigator.userAgent.match(/iPad/i) 
        || navigator.userAgent.match(/iPod/i) 
        || navigator.userAgent.match(/BlackBerry/i) 
        || navigator.userAgent.match(/Windows Phone/i)) {
            return true

        } else {
            return false
        }
}

getDataForm()
renderPagoCarrito();
/* payEndApp(); */

