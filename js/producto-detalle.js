document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.querySelector("[data-product-detail]");
  if (!contenedor) return;
  const codigo = new URLSearchParams(location.search).get("id");
  const producto = PRODUCTOS.find((item) => item.codigo === codigo);
  if (!producto) {
    contenedor.innerHTML =
      `<section class="empty-state"><h1>Producto no encontrado</h1><p>El código solicitado no pertenece al catálogo oficial.</p><a class="button" href="productos.html">Volver al catálogo</a></section>`;
    return;
  }
  document.title = `${producto.nombre} | Gas El Volcán`;
  contenedor.innerHTML = `
    <div><img class="detail-image" src="${producto.imagen}" alt="${GasVolcan.escaparHtml(producto.nombre)}"></div>
    <article>
      <p class="eyebrow">${GasVolcan.escaparHtml(producto.categoria)} · ${producto.codigo}</p>
      <h1>${GasVolcan.escaparHtml(producto.nombre)}</h1>
      <p class="hero-copy muted">${GasVolcan.escaparHtml(producto.descripcion)}</p>
      <dl class="detail-data">
        <div><dt>Unidad</dt><dd>${producto.unidad}</dd></div>
        <div><dt>Precio residencial</dt><dd>${GasVolcan.formatearPrecio(producto.precioResidencial)}</dd></div>
        <div><dt>Precio comercial</dt><dd>${GasVolcan.formatearPrecio(producto.precioComercial)}</dd></div>
        <div><dt>Stock actual</dt><dd>${producto.stock} unidades</dd></div>
      </dl>
      <div class="field"><label for="cantidad">Cantidad</label><input id="cantidad" type="number" min="1" max="${producto.stock}" value="1" inputmode="numeric"><p class="field-error" id="cantidad-error"></p></div>
      <div class="actions"><button class="button" type="button" data-detail-add>Añadir al carrito</button><a class="button button-secondary" href="productos.html">Seguir viendo</a></div>
      <p class="form-status" data-detail-status tabindex="-1" aria-live="polite"></p>
    </article>`;

  contenedor.querySelector("[data-detail-add]").addEventListener("click", () => {
    const campo = contenedor.querySelector("#cantidad");
    const error = contenedor.querySelector("#cantidad-error");
    const estado = contenedor.querySelector("[data-detail-status]");
    const cantidad = Number(campo.value);
    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > producto.stock) {
      campo.setAttribute("aria-invalid", "true");
      error.textContent = `Ingresa un entero entre 1 y ${producto.stock}.`;
      campo.focus();
      return;
    }
    campo.removeAttribute("aria-invalid");
    error.textContent = "";
    const resultado = Carrito.agregar(producto.codigo, cantidad);
    estado.textContent = resultado.mensaje;
    estado.className = `form-status ${resultado.ok ? "success" : "error"}`;
    estado.focus();
  });
});
