const expresiones = {
  nombre: /^(?=.*[a-zA-Z]{6,})[a-zA-Z]+\s[a-zA-Z]+$/g, // Min 6 letras y espacios,
  email: /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g, // Debe tener un formato de email válido
  password: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g, // Al menos 8 caracteres, formados por letras y números.
  edad: /^(1[89]|[2-9]\d)$/, // Número entero mayor o igual a 18.
  telefono: /^\d{7,}$/, // Número de al menos 7 dígitos, no aceptar espacios, guiones ni paréntesis.
  direccion: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\s)[a-zA-Z\d\s]{5,}$/g, // Al menos 5 caracteres, con letras, números y un espacio en el medio.
  ciudad: /^[a-zA-Z]{3,}$/g, //Al menos 3 caracteres.
  codPostal: /^.{3,}$/, //Al menos 3 caracteres.
  dni: /^\d{7,8}$/, //Número de 7 u 8 dígitos.
};

var formulario = document.getElementById("formulario");
var inputs = document.querySelectorAll("#formulario input");
var campos = {
  nombre: false,
  email: false,
  contraseña: false,
  edad: false,
  telefono: false,
  direccion: false,
  ciudad: false,
  codPostal: false,
  dni: false,
};

function validarFormulario(e) {
  switch (e.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, e.target, "nombre");
      break;

    case "email":
      validarCampo(expresiones.email, e.target, "email");
      break;

    case "contraseña":
      validarCampo(expresiones.password, e.target, "contraseña");
      validarContraseña2();
      break;

    case "contraseña2":
      validarContraseña2();
      break;

    case "edad":
      validarCampo(expresiones.edad, e.target, "edad");
      break;

    case "telefono":
      validarCampo(expresiones.telefono, e.target, "telefono");
      break;

    case "direccion":
      validarCampo(expresiones.direccion, e.target, "direccion");
      break;

    case "ciudad":
      validarCampo(expresiones.ciudad, e.target, "ciudad");
      break;

    case "codPostal":
      validarCampo(expresiones.codPostal, e.target, "codPostal");
      break;

    case "dni":
      validarCampo(expresiones.dni, e.target, "dni");
      break;
  }
}
function validarCampo(expresion, input, campo) {
  if (expresion.test(input.value)) {
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    campos[campo] = true;
  } else {
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    campos[campo] = false;
  }
}

function validarContraseña2() {
  var inputContraseña = document.getElementById("contraseña");
  var inputContraseña2 = document.getElementById("contraseña2");
  if (inputContraseña.value !== inputContraseña2.value) {
    document
      .getElementById(`grupo__contraseña2`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__contraseña2`)
      .classList.remove("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__contraseña2 i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#grupo__contraseña2 i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#grupo__contraseña2 .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    campos["contraseña"] = false;
  } else {
    document
      .getElementById(`grupo__contraseña2`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__contraseña2`)
      .classList.add("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__contraseña2 i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#grupo__contraseña2 i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#grupo__contraseña2 .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    campos["contraseña"] = true;
  }
}

inputs.forEach(function (input) {
  input.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  var terminos = document.getElementById("terminos");
  if (
    campos.nombre &&
    campos.email &&
    campos.contraseña &&
    campos.edad &&
    campos.telefono &&
    campos.direccion &&
    campos.ciudad &&
    campos.codPostal &&
    campos.dni &&
    terminos.checked
  ) {
    document
      .getElementById("formulario__mensaje-exito")
      .classList.add("formulario__mensaje-exito-activo");
    setTimeout(function () {
      document
        .getElementById("formulario__mensaje-exito")
        .classList.remove("formulario__mensaje-exito-activo");
    }, 5000);
    document
      .querySelectorAll(".formulario__grupo-correcto")
      .forEach(function (icono) {
        icono.classList.remove("formulario__grupo-correcto");
      });
  } else {
    document
      .getElementById("formulario__mensaje")
      .classList.add("formulario__mensaje-activo");
  }
});
