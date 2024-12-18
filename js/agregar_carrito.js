document.addEventListener("DOMContentLoaded", () => {
        const botonesAgregar = document.querySelectorAll(".botonAgregar");
        const contadorCarrito = document.getElementById("contadorCarrito");
    console.log(botonesAgregar);
    console.log(contadorCarrito);
    
        // Función para actualizar el contador del carrito
        const actualizarContadorCarrito = () => {
            const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
            contadorCarrito.textContent = totalProductos;
    
            // Cambiar el color del contador si hay productos
            if (totalProductos > 0) {
                contadorCarrito.classList.add("carritoLleno");
            } else {
                contadorCarrito.classList.remove("carritoLleno");
            }
        };
    
        // Inicializar el contador al cargar la página
        actualizarContadorCarrito();
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", (event) => {
            event.preventDefault();

            // Obtener datos del producto
            const nombre = boton.getAttribute("data-nombre");
            const precio = boton.getAttribute("data-precio");
            console.log(nombre);
            console.log(precio);

            // Obtener el carrito actual de localStorage
            const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            console.log(carrito);
            
            // Verificar si el producto ya está en el carrito
            const productoExistente = carrito.find(item => item.nombre === nombre);
            if (productoExistente) {
                // Si el producto ya existe, incrementar la cantidad
                productoExistente.cantidad++;
                productoExistente.total = productoExistente.cantidad * precio; // actualizar el total
            } else {
                // Si el producto no existe, agregarlo con cantidad 1 y el total correspondiente
                carrito.push({ nombre, precio, cantidad: 1, total: precio });
            }

            // Guardar el carrito actualizado en localStorage
            localStorage.setItem("carrito", JSON.stringify(carrito));

            alert(`${nombre} agregado al carrito.`);

            // Determinar la ruta actual de la página
            const rutaActual = window.location.pathname;

            // Condicional para redirigir a la URL adecuada según la ubicación de la página
            if (rutaActual.includes("index.html")) {
                window.location.href = "./pages/carrito.html"; 
            } else if (rutaActual.includes("productos.html")) {
                window.location.href = "./carrito.html"; 
            }
        });
    });
});