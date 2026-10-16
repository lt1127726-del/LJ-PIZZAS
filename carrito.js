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

    actualizarContador();

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
document.addEventListener("DOMContentLoaded", function(){

    actualizarContador();

});

// =============================================
// LJ PIZZAS - REGISTRAR PEDIDOS EN GOOGLE FORMS
// =============================================

async function registrarPedidoGoogleForms() {

    const carrito = obtenerCarrito();

    if (!carrito || carrito.length === 0) {
        console.log("No hay productos para registrar.");
        return false;
    }

    // Datos del cliente
    const nome =
        localStorage.getItem("nomeCliente") || "";

    const telefone =
        localStorage.getItem("telefoneCliente") || "";

    const cep =
        localStorage.getItem("cepCliente") || "";

    const bairro =
        localStorage.getItem("bairroCliente") || "";

    const tipoEntrega =
        localStorage.getItem("tipoEntrega") || "";

    // Identificar forma de entrega
    let entrega = "Não informado";

    if (tipoEntrega === "delivery") {
        entrega = "Delivery";
    }

    if (tipoEntrega === "retirada") {
        entrega = "Retirar no local";
    }

    // Crear número de pedido
    const idPedido =
        "LJ-" + Date.now();

    // Fecha y hora
    const dataHora =
        new Date().toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo"
        });

    // Crear descripción del pedido
    let pedido = "";
    let total = 0;

    carrito.forEach(function (produto) {

        const quantidade =
            Number(produto.cantidad) || 0;

        const preco =
            Number(produto.precio) || 0;

        const subtotal =
            quantidade * preco;

        pedido +=
            quantidade + "x " +
            produto.nombre +
            " - R$ " +
            subtotal.toFixed(2) +
            "\n";

        total += subtotal;
    });

    // Preparar los campos de Google Forms
    const dados = new URLSearchParams();

    dados.append("entry.775329763", idPedido);
    dados.append("entry.1183547447", dataHora);
    dados.append("entry.1441440783", nome);
    dados.append("entry.511000280", telefone);
    dados.append("entry.2084137634", cep);
    dados.append("entry.1923952782", bairro);
    dados.append("entry.2035763168", entrega);
    dados.append("entry.1327465048", pedido);
    dados.append(
        "entry.417815626",
        "R$ " + total.toFixed(2)
    );

    // Enviar a Google Forms
    const url =
        "https://docs.google.com/forms/d/e/" +
        "1FAIpQLSc_5WKLi-PRC67T1ZGX39TObt4mYAf_fk_mqDfpxbw8f4rZHQ/" +
        "formResponse";

    try {

        await fetch(url, {
            method: "POST",
            mode: "no-cors",
            body: dados
        });

        console.log(
            "Solicitud de registro enviada a Google Forms.",
            idPedido
        );

        return true;

    } catch (error) {

        console.error(
            "Error al enviar el registro a Google Forms:",
            error
        );

        return false;
    }
}