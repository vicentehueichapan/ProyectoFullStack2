(() => {
  const DOMINIOS = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];
  const valor = (form, nombre) => form.elements[nombre]?.value.trim() || "";
  const correoValido = (correo) => {
    const partes = correo.toLowerCase().split("@");
    return partes.length === 2 && partes[0].length > 0 && DOMINIOS.includes(partes[1]);
  };

  const runValido = (run) => {
    const limpio = run.toUpperCase();
    if (!/^[0-9]{6,8}[0-9K]$/.test(limpio)) return false;
    const cuerpo = limpio.slice(0, -1);
    const digito = limpio.slice(-1);
    let suma = 0;
    let multiplicador = 2;
    for (let indice = cuerpo.length - 1; indice >= 0; indice -= 1) {
      suma += Number(cuerpo[indice]) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    const resultado = 11 - (suma % 11);
    const esperado = resultado === 11 ? "0" : resultado === 10 ? "K" : String(resultado);
    return digito === esperado;
  };

  const mostrarError = (form, nombre, mensaje) => {
    const campo = form.elements[nombre];
    const error = document.getElementById(`${campo.id}-error`);
    campo.setAttribute("aria-invalid", "true");
    if (error) error.textContent = mensaje;
  };

  const limpiarError = (form, nombre) => {
    const campo = form.elements[nombre];
    if (!campo) return;
    const error = document.getElementById(`${campo.id}-error`);
    campo.removeAttribute("aria-invalid");
    if (error) error.textContent = "";
  };

  const reglaCorreo = (form, requerido = true) => {
    const correo = valor(form, "correo");
    if (!correo && requerido) return "El correo es obligatorio.";
    if (!correo) return "";
    if (correo.length > 100) return "El correo no puede superar 100 caracteres.";
    return correoValido(correo) ? "" : "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
  };

  const validarLogin = (form) => {
    const errores = {};
    errores.correo = reglaCorreo(form, true);
    const contrasena = form.elements.contrasena.value;
    if (!contrasena) errores.contrasena = "La contraseña es obligatoria.";
    else if (contrasena.length < 4 || contrasena.length > 10) errores.contrasena =
      "La contraseña debe tener entre 4 y 10 caracteres.";
    return errores;
  };

  const validarContacto = (form) => {
    const errores = {};
    const nombre = valor(form, "nombre");
    const comentario = valor(form, "comentario");
    if (!nombre) errores.nombre = "El nombre es obligatorio.";
    else if (nombre.length > 100) errores.nombre = "El nombre no puede superar 100 caracteres.";
    errores.correo = reglaCorreo(form, false);
    if (!comentario) errores.comentario = "El comentario es obligatorio.";
    else if (comentario.length > 500) errores.comentario =
      "El comentario no puede superar 500 caracteres.";
    return errores;
  };

  const validarUsuario = (form) => {
    const errores = {};
    const run = valor(form, "run");
    const nombre = valor(form, "nombre");
    const apellidos = valor(form, "apellidos");
    const direccion = valor(form, "direccion");
    if (!run) errores.run = "El RUN es obligatorio.";
    else if (run.length < 7 || run.length > 9 || !runValido(run)) errores.run =
      "Ingresa un RUN válido, sin puntos ni guion.";
    if (!nombre) errores.nombre = "El nombre es obligatorio.";
    else if (nombre.length > 50) errores.nombre = "El nombre no puede superar 50 caracteres.";
    if (!apellidos) errores.apellidos = "Los apellidos son obligatorios.";
    else if (apellidos.length > 100) errores.apellidos =
    "Los apellidos no pueden superar 100 caracteres.";
    errores.correo = reglaCorreo(form, true);
    if (!valor(form, "region")) errores.region = "Selecciona una región.";
    if (!valor(form, "comuna")) errores.comuna = "Selecciona una comuna.";
    if (!direccion) errores.direccion = "La dirección es obligatoria.";
    else if (direccion.length > 300) errores.direccion = "La dirección no puede superar 300 caracteres.";
    if (form.elements.tipoUsuario && !valor(form, "tipoUsuario")) errores.tipoUsuario =
      "Selecciona un tipo de usuario.";
    if (form.elements.contrasena) {
      const clave = form.elements.contrasena.value;
      if (!clave) errores.contrasena = "La contraseña es obligatoria.";
      else if (clave.length < 4 || clave.length > 10) errores.contrasena =
        "La contraseña debe tener entre 4 y 10 caracteres.";
      if (form.elements.confirmarContrasena && clave !== form.elements.confirmarContrasena.value) errores
        .confirmarContrasena = "Las contraseñas deben coincidir.";
    }
    return errores;
  };

  const validarProducto = (form) => {
    const errores = {};
    const codigo = valor(form, "codigo");
    const nombre = valor(form, "nombre");
    const descripcion = valor(form, "descripcion");
    const precio = form.elements.precio.value;
    const stock = form.elements.stock.value;
    const critico = form.elements.stockCritico.value;
    if (codigo.length < 3) errores.codigo =
    "El código es obligatorio y debe tener al menos 3 caracteres.";
    if (!nombre) errores.nombre = "El nombre es obligatorio.";
    else if (nombre.length > 100) errores.nombre = "El nombre no puede superar 100 caracteres.";
    if (descripcion.length > 500) errores.descripcion = "La descripción no puede superar 500 caracteres.";
    if (precio === "") errores.precio = "El precio es obligatorio.";
    else if (!Number.isFinite(Number(precio)) || Number(precio) < 0) errores.precio =
      "El precio debe ser un número mayor o igual a 0.";
    if (stock === "") errores.stock = "El stock es obligatorio.";
    else if (!Number.isInteger(Number(stock)) || Number(stock) < 0) errores.stock =
      "El stock debe ser un entero mayor o igual a 0.";
    if (critico !== "" && (!Number.isInteger(Number(critico)) || Number(critico) < 0)) errores
      .stockCritico = "El stock crítico debe ser un entero mayor o igual a 0.";
    if (!valor(form, "categoria")) errores.categoria = "Selecciona una categoría.";
    return errores;
  };

  const cargarRegiones = (form) => {
    const region = form.elements.region;
    const comuna = form.elements.comuna;
    if (!region || !comuna || typeof REGIONES === "undefined") return;
    region.insertAdjacentHTML("beforeend", REGIONES.map((item) =>
      `<option value="${GasVolcan.escaparHtml(item.nombre)}">${GasVolcan.escaparHtml(item.nombre)}</option>`
      ).join(""));
    const actualizar = (seleccion = "") => {
      const item = REGIONES.find((registro) => registro.nombre === region.value);
      comuna.innerHTML = item ?
        `<option value="">Selecciona una comuna</option>${item.comunas.map((nombre) => `<option value="${nombre}">${nombre}</option>`).join("")}` :
        '<option value="">Selecciona primero una región</option>';
      comuna.disabled = !item;
      if (item && item.comunas.includes(seleccion)) comuna.value = seleccion;
    };
    region.addEventListener("change", () => actualizar());
    form.actualizarComunas = actualizar;
  };

  const enlazar = (form) => {
    cargarRegiones(form);
    form.addEventListener("input", (evento) => {
      if (evento.target.name) limpiarError(form, evento.target.name);
    });
    form.addEventListener("change", (evento) => {
      if (evento.target.name) limpiarError(form, evento.target.name);
    });
    form.addEventListener("submit", (evento) => {
      evento.preventDefault();
      const tipo = form.dataset.form;
      const errores = tipo === "login" ? validarLogin(form) : tipo === "contacto" ? validarContacto(
        form) : tipo === "producto" ? validarProducto(form) : validarUsuario(form);
      Array.from(form.elements).forEach((campo) => campo.name && limpiarError(form, campo.name));
      const entradas = Object.entries(errores).filter(([, mensaje]) => mensaje);
      entradas.forEach(([nombre, mensaje]) => mostrarError(form, nombre, mensaje));
      const estado = form.querySelector("[data-form-status]");
      if (entradas.length) {
        estado.textContent = `Revisa ${entradas.length} campo(s) marcados antes de continuar.`;
        estado.className = "form-status error";
        form.elements[entradas[0][0]].focus();
        return;
      }
      const personalizado = new CustomEvent("formulario:valido", {
        cancelable: true,
        detail: {
          tipo,
          form
        }
      });
      form.dispatchEvent(personalizado);
      if (personalizado.defaultPrevented) return;
      estado.textContent = tipo === "login" ?
        "Datos válidos. Abriendo la demostración administrativa..." :
        "Datos válidos. La acción fue simulada correctamente.";
      estado.className = "form-status success";
      estado.focus();
      if (tipo === "login") setTimeout(() => {
        location.href = "admin-index.html";
      }, 700);
      else form.reset();
    });
  };

  window.Validaciones = {
    correoValido,
    runValido,
    validarUsuario,
    validarProducto,
    mostrarError,
    limpiarError
  };
  document.addEventListener("DOMContentLoaded", () => document.querySelectorAll("[data-form]").forEach(
    enlazar));
})();
