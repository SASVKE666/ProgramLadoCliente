document.getElementById('solicitudEmpleo').addEventListener('submit', function (event) {
    let isValid = true;

    //nombre
    const nombreInput = document.getElementById('nombre');
    if (nombreInput.value.trim() === '') {
        showError(nombreInput, 'El nombre es obligatorio');
        isValid = false;
    } else {
        hideError(nombreInput);
    }

    //email
    const emailInput = document.getElementById('email');
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'El correo electrónico es obligatorio');
        isValid = false;
    } else {
        hideError(emailInput);
    }

    //telefono
    const telefonoInput = document.getElementById('telefono');
    if (telefonoInput.value.trim().length !== 10) {
        showError(telefonoInput, 'El número de teléfono debe tener 10 dígitos');
        isValid = false;
    } else {
        hideError(telefonoInput);
    }

    //posicion
    const posicionInput = document.getElementById('posicion');
    if (posicionInput.value.trim() === '') {
        showError(posicionInput, 'La posición es obligatoria');
        isValid = false;
    } else {
        hideError(posicionInput);
    }

    //fecha de nacimiento
    const fechaNacimientoInput = document.getElementById('fechaNacimiento');
    if (fechaNacimientoInput.value.trim() === '') {
        showError(fechaNacimientoInput, 'La fecha de nacimiento es obligatoria');
        isValid = false;
    } else {
        hideError(fechaNacimientoInput);
    }

    //genero
    const generoInput = document.getElementById('genero');
    if (generoInput.value === '') {
        showError(generoInput, 'El género es obligatorio');
        isValid = false;
    } else {
        hideError(generoInput);
    }

    //educacion
    const educacionInput = document.getElementById('educacion');
    if (educacionInput.value.trim() === '') {
        showError(educacionInput, 'El nivel de educación es obligatorio');
        isValid = false;
    } else {
        hideError(educacionInput);
    }
    //CV
    const cvInput = document.getElementById('cv');
    if (cvInput.value === '') {
        showError(cvInput, 'El CV es obligatorio');
        isValid = false;
    } else {
        hideError(cvInput);
    }

    // Si no es valido no enviar
    if (!isValid) {
        event.preventDefault();
    } else {
        // Si el formulario es valido acceder a los datos y simular envio
        const formData = new FormData(event.target);
        const datos = {};
        formData.forEach((valor, clave) => {
            datos[clave] = valor;
        });

        //guardado de usuario
        console.log('Datos del formulario:', datos);
        alert('¡Formulario enviado correctamente!');
        event.target.reset(); // Limpia el formulario
    }
});

//Regresa arriba
function scrollToTop() {
    window.scrollTo(0, 0);
}

function showError(input, message) {
    input.classList.add('error');
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.textContent = message;
}

function hideError(input) {
    input.classList.remove('error');
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.textContent = '';
}
