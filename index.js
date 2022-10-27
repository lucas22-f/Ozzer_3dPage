



let onSystem = confirm("Desea ingresar al sistema ? ");
let listaProductos = [];
let id = 0;

/* Va a ser un array de  objetos que


tenga 
    [
        {
            id: idProducto
            nombreProd: Producto
            cantidadProducto: Cantidad
            Precio: Precio
            total: Total

        } 
    ]
*/

while (onSystem) {

    let NombreProd = prompt("Ingrese Nombre del producto");
    let CantidadProd = parseFloat(prompt("Ingrese Cantidad de productos"))
    let Precio = parseFloat(prompt("ingrese precio Del producto"));

    if (ValidarDatos(NombreProd, CantidadProd, Precio)) {


        let total = calcular(CantidadProd, Precio)
        alert(`total: $${total} , producto: ${NombreProd} `)
        id++
        let producto = { id, NombreProd, CantidadProd, Precio, total }
        agregarProducto(producto);
        alert(JSON.stringify(listaProductos,null,3));
        onSystem = confirm("Desea seguir en el sistema calculando precios o Salir? ")



    } else {

        alert("Error , Datos invalidos o inexistentes")
        onSystem = false;

    }


}
alert("ADIOS USUARIO");


function ValidarDatos(NombreProd, CantidadProd, Precio) {

    if (isNaN(CantidadProd) || isNaN(Precio)) return false;

    if (!NombreProd || !CantidadProd || !Precio) {
        alert("TODOS LOS DATOS SON NECESARIOS")
        NombreProd = "Faltan Datos."
        return false
    }

    return true
}

function calcular(CantidadProd, Precio) {
    return CantidadProd + Precio
};

function agregarProducto(producto) {

    listaProductos.push(producto);
    console.log(listaProductos);
}


