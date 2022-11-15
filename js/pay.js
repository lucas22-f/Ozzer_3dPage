
const contenedorPayCards = document.querySelector('#contenedorPayCards')

carrito.push(p1,p2,p3,p4,p5,p6,p7,p8,p9,p10);

const renderPagoCarrito = () =>{
    let total=0;
    carrito.forEach((el)=>{
        const card = document.createElement('div');
        card.innerHTML =`
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
                <h3 class="m-3 ">$${el.precio}</h3>
            </div>         
        </div>
        `
        total += el.precio
        contenedorPayCards.append(card)
        
    })
    console.log(total)
    const btnPagar = document.createElement('div');
    btnPagar.classList.add('text-end')
    btnPagar.innerHTML =`
    <div class="d-flex align-items-center justify-content-end">
          <h3 class="m-3">TOTAL: $${total}</h3>
          <a class="btn btn-info" href="#">Pagar</a>
    </div>  
   
    `
    console.log(btnPagar)
    contenedorPayCards.append(btnPagar);
    
  
}


renderPagoCarrito();