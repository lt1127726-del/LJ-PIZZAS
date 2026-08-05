/* ==============================
      LJ PIZZAS
      SISTEMA DEL CARRITO
============================== */

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
function guardarCarrito(){

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}
function obtenerCarrito(){

    return carrito;

}
function vaciarCarrito(){

    carrito = [];

    guardarCarrito();

}
function totalProductos(){

    let total = 0;

    carrito.forEach(producto=>{

        total += producto.cantidad;

    });

    return total;

}
function totalCompra(){

    let total = 0;

    carrito.forEach(producto=>{

        total += producto.precio * producto.cantidad;

    });

    return total;

}
function agregarProducto(producto){

    const existente = carrito.find(item=>{

        return item.nombre === producto.nombre;

    });

    if(existente){

        existente.cantidad++;

    }

    else{

        carrito.push(producto);

    }

    guardarCarrito();

}
function eliminarProducto(indice){

    carrito.splice(indice,1);

    guardarCarrito();

}

function eliminarProductoPorNombre(nombre){

    carrito = carrito.filter(producto => producto.nombre !== nombre);

    guardarCarrito();

}
function aumentarCantidad(indice){

    const carrito = obtenerCarrito();

    carrito[indice].cantidad++;

    guardarCarrito(carrito);

}
function diminuirCantidad(indice){

    const carrito = obtenerCarrito();

    carrito[indice].cantidad--;

    if(carrito[indice].cantidad <= 0){
        carrito.splice(indice,1);
    }

    guardarCarrito(carrito);

}

function actualizarContador(){

    const contador = document.getElementById("contador");

    if(!contador) return;

    contador.textContent = totalProductos();

}
actualizarContador();

console.log("===== PRUEBA =====");
console.log(typeof agregarProducto);
console.log(typeof eliminarProductoPorNombre);
console.log("===== FIN =====");