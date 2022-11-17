
class Producto {
    constructor(id, nombreProd, precio, img , descripcion, categoria) {   

        this.id = id;
        this.nombreProd = nombreProd;
        this.img = img
        this.precio = precio;
        this.descripcion = descripcion
        this.categoria = categoria
    }

    getId() {
        return this.id;
    }

}

const p1 = new Producto(1,'Goku impreso 3d',5000,'https://i.pinimg.com/originals/c5/a4/1e/c5a41e95225c7bb4b3e5df0b8934b097.jpg','goku pequeño impreso 3d',1);
const p2 = new Producto(2,'Mario impreso 3d',5000,'https://cdn.myminifactory.com/assets/object-assets/585cf081753a0/images/720X720-mario.jpg','mario pequeño impreso 3d',1);
const p3 = new Producto(3,'Mate Harry Potter impreso 3d',4500,'https://i.pinimg.com/736x/8d/17/0b/8d170b54c1d76e7f77068957a4039def.jpg','harry Potter pequeño impreso 3d',2);
const p4 = new Producto(4,'Maceta Impresa 3d',4300,'https://bitfab.io/wp-content/uploads/2020/12/il_1588xN.2321570558_duun-768x1024.jpg','maceta pequeña impreso 3d',3);
const p5 = new Producto(5,'Pikachu impreso 3d',5000,'https://cdn.myminifactory.com/assets/object-assets/5ea84312a7211/images/720X720-img-20210531-181852.jpg','pikachu pequeño impreso 3d',1);
const p6 = new Producto(6,'Bulbasaur impreso 3d',5000,'https://www.3dshop.com.ar/wp-content/uploads/2021/01/bulbasaur-impresion-3d-shop.jpg','bulbasaur pequeño impreso 3d',1);
const p7 = new Producto(7,'Charmander impreso 3d',6000,'https://images.cults3d.com/AvfKW2oCbRg78h7AE57qNSDgGTs=/516x516/https://files.cults3d.com/uploaders/13568106/photo-file/3cf23dda-90fb-4a8b-8321-62fbcb144635/salamoule.png','charmander pequeño impreso 3d',1);
const p8 = new Producto(8,'Iron Man impreso 3d',8000,'https://cdn.myminifactory.com/assets/object-assets/5b50feb9bca1e/images/720X720-de97b6d0-b9aa-460f-9e1b-1748521fbec0.jpg','iron man pequeño impreso 3d',1);
const p9 = new Producto(9,'Sonic impreso 3d',5000,'https://images.cults3d.com/DTLVC9ElIRKUT6AwRnOrDYfrUSQ=/516x516/https://files.cults3d.com/uploaders/5909433/illustration-file/71a6b017-bba8-4687-bb6b-16f12e91a335/Capture%20d%E2%80%99e%CC%81cran%202017-03-16%20a%CC%80%2016.54.14.png','sonic pequeño impreso 3d',1);
const p10 = new Producto(10,'Llaveros personalizados impreso 3d',1500,'https://http2.mlstatic.com/D_NQ_NP_660022-MLA44966201066_022021-O.jpg','llavero pequeño impreso 3d',4)

let listaProductos = [p1,p2,p3,p4,p5,p6,p7,p8,p9,p10];
let carrito = [];
