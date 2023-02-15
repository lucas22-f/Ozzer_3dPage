

    const cartCountBot = document.querySelector(".cartCountBot2");
    const UpController = document.querySelector(".UpController");
    const cartCountBot3 = document.querySelector(".cartCountBot3");
    const cartCountBot4 = document.querySelector(".cartCountBot4");
    cartCountBot4.classList.add("hidden")
    // Control del Boton Carrito en el scroll. 

  
    cartCountBot4.classList.add("animate__animated");
 
    cartCountBot3.addEventListener("click",()=>{
        cartCountBot4.classList.remove("hidden");
        
        if(cartCountBot4.classList.contains("animate__fadeInUp")){
            cartCountBot4.classList.remove("animate__fadeInUp");
            cartCountBot4.classList.add("animate__fadeOutDown");
            setTimeout(()=>{
                cartCountBot4.classList.add("hidden");
            },1000)
            
        }else{
            cartCountBot4.classList.remove("animate__fadeOutDown");
            cartCountBot4.classList.add("animate__fadeInUp");
            
        }
    })
 


