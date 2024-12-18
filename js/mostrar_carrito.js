document.addEventListener("DOMContentLoaded", () => {
    const tablaCarrito = document.getElementById("tablaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");
    const btnComprar = document.getElementById("comprarCarrito");

    // Obtener carrito de localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Función para formatear precios con separadores de miles y coma como decimal
    const formatearPrecio = (precio) => {
        return precio.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    // Función para renderizar el carrito
    const renderizarCarrito = () => {
        // Limpiar tabla
        tablaCarrito.innerHTML = "";

        if (carrito.length === 0) {
            tablaCarrito.innerHTML = "<tr><td colspan='4'>El carrito está vacío.</td></tr>";
            totalCarrito.textContent = "0.00";
            return;
        }

        // Renderizar productos en la tabla
        carrito.forEach((producto, index) => {
            // Asegurarse de que el precio y la cantidad sean números válidos
            let precio = parseFloat(producto.precio);  // Convertir a número flotante
            const cantidad = parseInt(producto.cantidad, 10);

            if (isNaN(precio) || isNaN(cantidad)) {
                console.error("Precio o cantidad no válidos para el producto:", producto);
                return;
            }

            const totalProducto = (precio * cantidad); // Calcular el total por producto

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>$${formatearPrecio(precio)}</td>
                <td>${cantidad}</td>
                <td>$${formatearPrecio(totalProducto)}</td> <!-- Mostrar total por producto -->
                <td>
                    <button class="botonAgregarUno" data-index="${index}">+</button>
                    <button class="botonEliminar" data-index="${index}">-</button>
                </td>
            `;
            tablaCarrito.appendChild(fila);
        });

        // Actualizar el total general
        calcularTotal();
    };

    const calcularTotal = () => { 
        // Declaración de la función calcularTotal como una función flecha.
        
        const total = carrito.reduce((suma, producto) => {
            let precio = parseFloat(producto.precio);  // Convertir a número flotante
            const cantidad = parseInt(producto.cantidad, 10);
            
            // Verificar que precio y cantidad son válidos
            if (isNaN(precio) || isNaN(cantidad)) {
                return suma;
            }
            
            return suma + (precio * cantidad); // Sumar el total del producto
        }, 0);
    
        totalCarrito.textContent = formatearPrecio(total); // Mostrar total con formato
    };
    

    // Event listener para agregar o eliminar productos
    tablaCarrito.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");

        if (index !== null && index >= 0 && index < carrito.length) {
            if (event.target.classList.contains("botonAgregarUno")) {
                // Aumentar la cantidad del producto en 1
                carrito[index].cantidad += 1;
            } else if (event.target.classList.contains("botonEliminar")) {
                // Reducir la cantidad del producto en 1
                if (carrito[index].cantidad > 1) {
                    carrito[index].cantidad -= 1;
                } else {
                    // Si la cantidad es 1, eliminamos el producto completamente
                    carrito.splice(index, 1);
                }
            }

            // Actualizamos el carrito en localStorage
            localStorage.setItem("carrito", JSON.stringify(carrito));

            // Vuelve a renderizar el carrito para reflejar los cambios
            renderizarCarrito();
        }
    });

    // Event listener para el botón "Comprar"
    comprarCarrito.addEventListener("click", (e) => {
        e.preventDefault();  // 
        if (carrito.length > 0) {
            alert("¡Compra realizada con éxito!");
            localStorage.removeItem("carrito"); 
            renderizarCarrito();  
            location.reload();  
        } else {
            alert("El carrito está vacío.");
        }
    });
    
    // Renderizar carrito al cargar la página
    renderizarCarrito();
});