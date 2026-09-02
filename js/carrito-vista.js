document.addEventListener("DOMContentLoaded", () => {
  const lista = document.querySelector("[data-cart-list]");
  const resumen = document.querySelector("[data-cart-summary]");
  const estado = document.querySelector("[data-cart-status]");
  if (!lista || !resumen) return;

  const renderizar = () => {
    const carrito = Carrito.leer();
    if (!carrito.length) {
      lista.innerHTML =
        `<section class="empty-state"><h2>Tu carrito está vacío</h2><p>Explora los productos oficiales y añade lo que necesitas.</p><a class="button" href="productos.html">Ver productos</a></section>`;
      resumen.innerHTML =
        `<h2>Resumen</h2><p>Aún no hay productos.</p><div class="cart-total"><span>Total</span><span>${GasVolcan.formatearPrecio(0)}</span></div>`;
      return;
    }
    lista.innerHTML = carrito.map((item) => {
      const producto = Carrito.buscarProducto(item.codigo);
      return `<article class="cart-item">
        <div class="cart-item-main">
          <img src="${producto.imagen}" alt="">
          <div><p class="eyebrow">${producto.codigo}</p><h2>${GasVolcan.escaparHtml(producto.nombre)}</h2><p>${GasVolcan.formatearPrecio(producto.precioResidencial)} por unidad</p><strong>Subtotal: ${GasVolcan.formatearPrecio(producto.precioResidencial * item.cantidad)}</strong></div>
        </div>
        <div class="quantity-control">
          <div class="field"><label for="cantidad-${producto.codigo}">Cantidad</label><input id="cantidad-${producto.codigo}" type="number" min="1" max="${producto.stock}" value="${item.cantidad}" data-cart-quantity="${producto.codigo}"></div>
          <button class="button button-danger button-small" type="button" data-cart-remove="${producto.codigo}">Eliminar</button>
        </div>
      </article>`;
    }).join("");
    resumen.innerHTML =
      `<h2>Resumen</h2><p>${Carrito.cantidadTotal()} unidad(es) en el carrito.</p><div class="cart-total"><span>Total</span><span>${GasVolcan.formatearPrecio(Carrito.total())}</span></div><button class="button" type="button" data-demo-checkout>Confirmar compra demostrativa</button>`;
  };

  lista.addEventListener("change", (evento) => {
    const campo = evento.target.closest("[data-cart-quantity]");
    if (!campo) return;
    const ok = Carrito.cambiarCantidad(campo.dataset.cartQuantity, Number(campo.value));
    estado.textContent = ok ? "Cantidad actualizada." :
      "La cantidad debe respetar el stock disponible.";
    estado.className = `form-status ${ok ? "success" : "error"}`;
    renderizar();
  });
  lista.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-cart-remove]");
    if (!boton) return;
    Carrito.eliminar(boton.dataset.cartRemove);
    estado.textContent = "Producto eliminado del carrito.";
    estado.className = "form-status success";
    renderizar();
  });
  resumen.addEventListener("click", (evento) => {
    if (!evento.target.closest("[data-demo-checkout]")) return;
    estado.textContent =
      "Demostración completada. Esta versión no procesa pagos ni crea pedidos reales.";
    estado.className = "form-status success";
    estado.focus();
  });
  document.addEventListener("carrito:cambio", renderizar);
  renderizar();
});
