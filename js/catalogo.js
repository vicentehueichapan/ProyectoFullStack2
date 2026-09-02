(() => {
  const crearTarjeta = (producto) => {
    const article = document.createElement("article");
    article.className = "product-card";
    article.innerHTML = `
      <img class="product-image" src="${producto.imagen}" alt="${GasVolcan.escaparHtml(producto.nombre)}">
      <div class="product-body">
        <div class="product-meta"><span>${GasVolcan.escaparHtml(producto.categoria)}</span><span>${producto.codigo}</span></div>
        <h3 class="product-title">${GasVolcan.escaparHtml(producto.nombre)}</h3>
        <p class="muted">${GasVolcan.escaparHtml(producto.descripcion)}</p>
        <p class="product-price">${GasVolcan.formatearPrecio(producto.precioResidencial)}</p>
        <div class="product-actions">
          <a class="button button-secondary" href="producto-detalle.html?id=${encodeURIComponent(producto.codigo)}">Ver detalle</a>
          <button class="button" type="button" data-add-cart="${producto.codigo}">Añadir</button>
        </div>
      </div>`;
    return article;
  };

  const mostrarMensaje = (texto, tipo = "success") => {
    const estado = document.querySelector("[data-catalog-status]");
    if (!estado) return;
    estado.textContent = texto;
    estado.className = `form-status ${tipo}`;
    estado.focus();
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-product-list]").forEach((contenedor) => {
      const limite = Number(contenedor.dataset.limit || PRODUCTOS.length);
      contenedor.replaceChildren(...PRODUCTOS.slice(0, limite).map(crearTarjeta));
    });
  });

  document.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-add-cart]");
    if (!boton) return;
    const resultado = Carrito.agregar(boton.dataset.addCart);
    mostrarMensaje(resultado.mensaje, resultado.ok ? "success" : "error");
  });
})();
