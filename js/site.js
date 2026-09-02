(() => {
  const formatearPrecio = (valor) => new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(valor);

  const escaparHtml = (valor) => String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const obtenerLocal = (clave, alternativa) => {
    try {
      const valor = JSON.parse(localStorage.getItem(clave));
      return valor ?? alternativa;
    } catch {
      localStorage.removeItem(clave);
      return alternativa;
    }
  };

  const guardarLocal = (clave, valor) => {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
      return true;
    } catch {
      return false;
    }
  };

  window.GasVolcan = {
    formatearPrecio,
    escaparHtml,
    obtenerLocal,
    guardarLocal
  };

  const enlaces = [
    ["inicio", "index.html", "Inicio"],
    ["productos", "productos.html", "Productos"],
    ["nosotros", "nosotros.html", "Nosotros"],
    ["blog", "blogs.html", "Blog"],
    ["contacto", "contacto.html", "Contacto"],
    ["registro", "registro.html", "Registro"],
    ["login", "login.html", "Ingresar"],
  ];

  const crearHeader = (elemento) => {
    const activo = elemento.dataset.active || "";
    elemento.className = "site-header";
    elemento.innerHTML = `
      <div class="container header-inner">
        <a class="brand" href="index.html" aria-label="Gas El Volcán, ir al inicio">
          <span class="brand-mark" aria-hidden="true">V</span>
          <span>Gas El Volcán</span>
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu-principal">
          <span aria-hidden="true">☰</span><span class="sr-only"> Menú</span>
        </button>
        <nav class="site-nav" id="menu-principal" aria-label="Navegación principal">
          <ul>
            ${enlaces.map(([id, ruta, texto]) => `<li><a href="${ruta}"${activo === id ? ' aria-current="page"' : ""}>${texto}</a></li>`).join("")}
            <li><a class="cart-link" href="carrito.html"${activo === "carrito" ? ' aria-current="page"' : ""}>Carrito <span class="cart-count" data-cart-count>0</span></a></li>
          </ul>
        </nav>
      </div>`;

    const boton = elemento.querySelector(".menu-toggle");
    const nav = elemento.querySelector(".site-nav");
    boton.addEventListener("click", () => {
      const abierto = boton.getAttribute("aria-expanded") === "true";
      boton.setAttribute("aria-expanded", String(!abierto));
      nav.classList.toggle("is-open", !abierto);
    });
  };

  const crearFooter = (elemento) => {
    elemento.className = "site-footer";
    elemento.innerHTML = `
      <div class="container footer-grid">
        <section aria-labelledby="pie-marca"><h2 id="pie-marca">Gas El Volcán</h2><p>Distribución de gas licuado y accesorios en Chillán y comunas aledañas desde 1998.</p></section>
        <section aria-labelledby="pie-info"><h3 id="pie-info">Información</h3><ul><li><a href="nosotros.html">Nosotros</a></li><li><a href="blogs.html">Blog</a></li><li><a href="contacto.html">Contacto</a></li></ul></section>
        <section aria-labelledby="pie-cuenta"><h3 id="pie-cuenta">Cuenta</h3><ul><li><a href="registro.html">Registrarse</a></li><li><a href="login.html">Ingresar</a></li><li><a href="admin-index.html">Demo administrativa</a></li></ul></section>
      </div>`;
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-site-header]").forEach(crearHeader);
    document.querySelectorAll("[data-site-footer]").forEach(crearFooter);
  });
})();
