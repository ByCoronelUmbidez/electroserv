document.addEventListener("DOMContentLoaded", () => {
    // URL de la API para obtener las tasas de cambio
    const url = 'https://api.exchangerate-api.com/v4/latest/usd';

    // Función para obtener la tasa de cambio
    const obtenerTasaCambio = () => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Extraemos la tasa de cambio para ARS (o cualquier otra moneda)
                const tasaCambioUSDARS = data.rates.ARS;  // También puedes usar data.rates['ARS']
                console.log("Tasa de cambio USD a ARS:", tasaCambioUSDARS);

                // Si deseas mostrar la tasa de cambio en algún elemento de tu página
                document.getElementById("tasaCambio").textContent = `1 USD = ${tasaCambioUSDARS} ARS`;
            })
            .catch(error => {
                console.error("Error al obtener la tasa de cambio:", error);
            });
    };

    // Llamamos a la función para obtener la tasa de cambio al cargar la página
    obtenerTasaCambio();
});