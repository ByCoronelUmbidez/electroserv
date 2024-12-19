document.addEventListener("DOMContentLoaded", () => {
    const tablaCarrito = document.getElementById("tablaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");
    const btnComprar = document.getElementById("comprarCarrito");

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const formatearPrecio = (precio) => {
        return precio.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const renderizarCarrito = () => {
        tablaCarrito.innerHTML = "";

        if (carrito.length === 0) {
            tablaCarrito.innerHTML = "<tr><td colspan='4'>El carrito está vacío.</td></tr>";
            totalCarrito.textContent = "0.00";
            return;
        }

        carrito.forEach((producto, index) => {
            let precio = parseFloat(producto.precio);
            const cantidad = parseInt(producto.cantidad, 10);

            if (isNaN(precio) || isNaN(cantidad)) {
                console.error("Precio o cantidad no válidos para el producto:", producto);
                return;
            }

            const totalProducto = (precio * cantidad);

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

        calcularTotal();
    };

    const calcularTotal = () => {

        const total = carrito.reduce((suma, producto) => {
            let precio = parseFloat(producto.precio);
            const cantidad = parseInt(producto.cantidad, 10);

            if (isNaN(precio) || isNaN(cantidad)) {
                return suma;
            }

            return suma + (precio * cantidad);
        }, 0);

        totalCarrito.textContent = formatearPrecio(total);
    };

    const actualizarContadorCarrito = () => {
        const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
        const contadores = document.querySelectorAll(".contadorCarrito"); // Selecciona por clase

        contadores.forEach((contador) => {
            contador.textContent = totalProductos;
        });
    };

    tablaCarrito.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");

        if (index !== null && index >= 0 && index < carrito.length) {
            if (event.target.classList.contains("botonAgregarUno")) {
                carrito[index].cantidad += 1;
            } else if (event.target.classList.contains("botonEliminar")) {
                if (carrito[index].cantidad > 1) {
                    carrito[index].cantidad -= 1;
                } else {
                    carrito.splice(index, 1);
                }
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));

            renderizarCarrito();
            actualizarContadorCarrito();
        }
    });

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

    renderizarCarrito();
});