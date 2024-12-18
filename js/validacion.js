const formulario = document.getElementById("miFormulario");
console.log(formulario);

formulario.addEventListener("submit", event => {

    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const consulta = document.getElementById("consulta").value.trim();

    console.log(nombre);
    console.log(apellido);
    console.log(email);
    console.log(consulta);

    const errorNombre = document.getElementById("errorNombre"); 
    const errorApellido = document.getElementById("errorApellido"); 
    const errorEmail = document.getElementById("errorEmail");
    const errorConsulta = document.getElementById("errorConsulta");

    let formularioValido = true;

    if (nombre === "") {
        errorNombre.classList.remove("noMostrar");
        formularioValido = false;
    } else {
        errorNombre.classList.add("noMostrar");
    }

    if (apellido === "") {
        errorApellido.classList.remove("noMostrar");
        formularioValido = false;
    } else {
        errorApellido.classList.add("noMostrar");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorEmail.classList.remove("noMostrar");
        formularioValido = false;
    } else {
        errorEmail.classList.add("noMostrar");
    }

    if (consulta.length < 10) {
        errorConsulta.classList.remove("noMostrar");
        formularioValido = false;
    } else {
        errorConsulta.classList.add("noMostrar");
    }

    if (formularioValido) {
        alert("Su consulta fue enviada correctamente y pronto nos pondremos en contacto.");
        const formularioContacto = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            consulta: consulta
        };
        location.reload();

    }
});