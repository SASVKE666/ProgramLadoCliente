document.getElementById('solicitudEmpleo').addEventListener('submit', function(event) {
    let isValid = true;
  
    // Validar nombre
    const nombreInput = document.getElementById('nombre');
    if (nombreInput.value.trim() === '') {
      showError(nombreInput, 'El nombre es obligatorio');
      isValid = false;
    } else {
      hideError(nombreInput);
    }
  
    // Validar email
    const emailInput = document.getElementById('email');
    if (emailInput.value.trim() === '') {
      showError(emailInput, 'El correo electrónico es obligatorio');
      isValid = false;
    } else {
      hideError(emailInput);
    }
  
    // Validar teléfono
    const telefonoInput = document.getElementById('telefono');
    if (telefonoInput.value.trim().length !== 10) {
      showError(telefonoInput, 'El número de teléfono debe tener 10 dígitos');
      isValid = false;
    } else {
      hideError(telefonoInput);
    }
  
    // Si no es válido, prevenir el envío del formulario
    if (!isValid) {
      event.preventDefault();
    }
  });
  
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
  