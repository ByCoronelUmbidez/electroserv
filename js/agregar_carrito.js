document.addEventListener("DOMContentLoaded", () => {
        const botonesAgregar = document.querySelectorAll(".botonAgregar");
        const contadorCarrito = document.querySelectorAll(".contadorCarrito"); // Seleccionar todos los contadores
    console.log(botonesAgregar);
    console.log(contadorCarrito);
    
        const actualizarContadorCarrito = () => {
            const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
    
            contadorCarrito.forEach(contador => {
                contador.textContent = totalProductos;
            });
        };
    
        actualizarContadorCarrito();
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", (event) => {
            event.preventDefault();

            const nombre = boton.getAttribute("data-nombre");
            const precio = boton.getAttribute("data-precio");
            console.log(nombre);
            console.log(precio);

            const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            console.log(carrito);
            
            const productoExistente = carrito.find(item => item.nombre === nombre);
            if (productoExistente) {
                productoExistente.cantidad++;
                productoExistente.total = productoExistente.cantidad * precio; 
            } else {
                carrito.push({ nombre, precio, cantidad: 1, total: precio });
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));

            alert(`${nombre} agregado al carrito.`);

            const rutaActual = window.location.pathname;

            if (rutaActual.includes("index.html")) {
                window.location.href = "./pages/carrito.html"; 
            } else if (rutaActual.includes("productos.html")) {
                window.location.href = "./carrito.html"; 
            }
        });
    });
});