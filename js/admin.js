(() => {
  const CLAVE_PRODUCTOS = "gasVolcanAdminProductosV1";
  const CLAVE_USUARIOS = "gasVolcanAdminUsuariosV1";
  const usuariosBase = [{
    id: "USR-DEMO-01",
    run: "123456785",
    nombre: "Cliente",
    apellidos: "Demostración",
    correo: "cliente@gmail.com",
    fechaNacimiento: "",
    tipoUsuario: "Cliente",
    region: "Región de Ñuble",
    comuna: "Chillán",
    direccion: "Dirección demostrativa"
  }, ];
  const productosAdmin = () => GasVolcan.obtenerLocal(CLAVE_PRODUCTOS, PRODUCTOS.map((p) => ({
    ...p,
    stockCritico: 10
  })));
  const usuariosAdmin = () => GasVolcan.obtenerLocal(CLAVE_USUARIOS, usuariosBase);
  const guardarProductos = (datos) => GasVolcan.guardarLocal(CLAVE_PRODUCTOS, datos);
  const guardarUsuarios = (datos) => GasVolcan.guardarLocal(CLAVE_USUARIOS, datos);

  const crearSidebar = (elemento) => {
    const activo = elemento.dataset.active || "";
    const enlaces = [
      ["inicio", "admin-index.html", "Resumen"],
      ["productos", "admin-productos.html", "Productos"],
      ["usuarios", "admin-usuarios.html", "Usuarios"],
      ["tienda", "index.html", "Volver a la tienda"]
    ];
    elemento.className = "admin-sidebar";
    elemento.innerHTML =
      `<a class="brand" href="admin-index.html"><span class="brand-mark" aria-hidden="true">V</span><span>Administración</span></a><nav aria-label="Navegación administrativa"><ul>${enlaces.map(([id, ruta, texto]) => `<li><a href="${ruta}"${activo === id ? ' aria-current="page"' : ""}>${texto}</a></li>`).join("")}</ul></nav>`;
  };

  const renderProductos = () => {
    const cuerpo = document.querySelector("[data-admin-products]");
    if (!cuerpo) return;
    cuerpo.innerHTML = productosAdmin().map((p) =>
      `<tr><td>${p.codigo}</td><td>${GasVolcan.escaparHtml(p.nombre)}</td><td>${GasVolcan.escaparHtml(p.categoria)}</td><td>${GasVolcan.formatearPrecio(p.precioResidencial)}</td><td class="${p.stock <= (p.stockCritico ?? -1) ? "stock-low" : ""}">${p.stock}</td><td><a class="text-link" href="admin-producto-detalle.html?id=${encodeURIComponent(p.codigo)}">Ver</a> · <a class="text-link" href="admin-producto-editar.html?id=${encodeURIComponent(p.codigo)}">Editar</a></td></tr>`
      ).join("");
  };

  const renderUsuarios = () => {
    const cuerpo = document.querySelector("[data-admin-users]");
    if (!cuerpo) return;
    cuerpo.innerHTML = usuariosAdmin().map((u) =>
      `<tr><td>${u.id}</td><td>${GasVolcan.escaparHtml(u.run)}</td><td>${GasVolcan.escaparHtml(`${u.nombre} ${u.apellidos}`)}</td><td>${GasVolcan.escaparHtml(u.correo)}</td><td>${GasVolcan.escaparHtml(u.tipoUsuario)}</td><td><a class="text-link" href="admin-usuario-detalle.html?id=${encodeURIComponent(u.id)}">Ver</a> · <a class="text-link" href="admin-usuario-editar.html?id=${encodeURIComponent(u.id)}">Editar</a></td></tr>`
      ).join("");
  };

  const renderDetalleProducto = () => {
    const contenedor = document.querySelector("[data-admin-product-detail]");
    if (!contenedor) return;
    const id = new URLSearchParams(location.search).get("id");
    const p = productosAdmin().find((item) => item.codigo === id);
    if (!p) {
      contenedor.innerHTML =
        '<div class="empty-state"><h1>Producto no encontrado</h1><a class="button" href="admin-productos.html">Volver</a></div>';
      return;
    }
    contenedor.innerHTML =
      `<p class="eyebrow">${p.codigo}</p><h1>${GasVolcan.escaparHtml(p.nombre)}</h1><dl class="detail-data"><div><dt>Categoría</dt><dd>${GasVolcan.escaparHtml(p.categoria)}</dd></div><div><dt>Descripción</dt><dd>${GasVolcan.escaparHtml(p.descripcion || "Sin descripción")}</dd></div><div><dt>Precio</dt><dd>${GasVolcan.formatearPrecio(p.precioResidencial)}</dd></div><div><dt>Stock</dt><dd class="${p.stock <= (p.stockCritico ?? -1) ? "stock-low" : ""}">${p.stock}</dd></div><div><dt>Stock crítico</dt><dd>${p.stockCritico ?? "No definido"}</dd></div></dl><a class="button" href="admin-producto-editar.html?id=${encodeURIComponent(p.codigo)}">Editar producto</a>`;
  };

  const renderDetalleUsuario = () => {
    const contenedor = document.querySelector("[data-admin-user-detail]");
    if (!contenedor) return;
    const id = new URLSearchParams(location.search).get("id");
    const u = usuariosAdmin().find((item) => item.id === id);
    if (!u) {
      contenedor.innerHTML =
        '<div class="empty-state"><h1>Usuario no encontrado</h1><a class="button" href="admin-usuarios.html">Volver</a></div>';
      return;
    }
    contenedor.innerHTML =
      `<p class="eyebrow">${u.id}</p><h1>${GasVolcan.escaparHtml(`${u.nombre} ${u.apellidos}`)}</h1><dl class="detail-data"><div><dt>RUN</dt><dd>${GasVolcan.escaparHtml(u.run)}</dd></div><div><dt>Correo</dt><dd>${GasVolcan.escaparHtml(u.correo)}</dd></div><div><dt>Tipo</dt><dd>${GasVolcan.escaparHtml(u.tipoUsuario)}</dd></div><div><dt>Ubicación</dt><dd>${GasVolcan.escaparHtml(`${u.comuna}, ${u.region}`)}</dd></div><div><dt>Dirección</dt><dd>${GasVolcan.escaparHtml(u.direccion)}</dd></div></dl><a class="button" href="admin-usuario-editar.html?id=${encodeURIComponent(u.id)}">Editar usuario</a>`;
  };

  const conectarProductoForm = () => {
    const form = document.querySelector('[data-form="producto"]');
    if (!form) return;
    const editar = form.dataset.mode === "edit";
    const id = new URLSearchParams(location.search).get("id");
    const existente = editar ? productosAdmin().find((p) => p.codigo === id) : null;
    if (editar && !existente) {
      form.innerHTML =
        '<div class="empty-state"><h2>Producto no encontrado</h2><a class="button" href="admin-productos.html">Volver</a></div>';
      return;
    }
    if (existente) {
      form.elements.codigo.value = existente.codigo;
      form.elements.codigo.readOnly = true;
      form.elements.nombre.value = existente.nombre;
      form.elements.descripcion.value = existente.descripcion || "";
      form.elements.precio.value = existente.precioResidencial;
      form.elements.stock.value = existente.stock;
      form.elements.stockCritico.value = existente.stockCritico ?? "";
      form.elements.categoria.value = existente.categoria;
      form.elements.imagen.value = existente.imagen || "";
    }
    form.addEventListener("formulario:valido", (evento) => {
      evento.preventDefault();
      const datos = new FormData(form);
      const registro = {
        codigo: datos.get("codigo").trim(),
        nombre: datos.get("nombre").trim(),
        descripcion: datos.get("descripcion").trim(),
        precioResidencial: Number(datos.get("precio")),
        precioComercial: existente?.precioComercial ?? Number(datos.get("precio")),
        stock: Number(datos.get("stock")),
        stockCritico: datos.get("stockCritico") === "" ? null : Number(datos.get("stockCritico")),
        categoria: datos.get("categoria"),
        unidad: existente?.unidad ?? "Unidad",
        imagen: datos.get("imagen").trim() || "img/productos/accesorio.svg"
      };
      const todos = productosAdmin();
      const repetido = todos.some((p) => p.codigo === registro.codigo && (!existente || p.codigo !==
        existente.codigo));
      if (repetido) {
        Validaciones.mostrarError(form, "codigo", "Ya existe un producto con este código.");
        form.elements.codigo.focus();
        return;
      }
      if (existente) todos[todos.findIndex((p) => p.codigo === existente.codigo)] = registro;
      else todos.push(registro);
      guardarProductos(todos);
      const estado = form.querySelector("[data-form-status]");
      estado.textContent = `Producto ${editar ? "actualizado" : "creado"} en la demostración local.`;
      estado.className = "form-status success";
      setTimeout(() => {
        location.href = "admin-productos.html";
      }, 700);
    });
  };

  const conectarUsuarioForm = () => {
    const form = document.querySelector('[data-form="usuario"][data-admin-user]');
    if (!form) return;
    const editar = form.dataset.mode === "edit";
    const id = new URLSearchParams(location.search).get("id");
    const existente = editar ? usuariosAdmin().find((u) => u.id === id) : null;
    if (editar && !existente) {
      form.innerHTML =
        '<div class="empty-state"><h2>Usuario no encontrado</h2><a class="button" href="admin-usuarios.html">Volver</a></div>';
      return;
    }
    if (existente) {
      ["run", "nombre", "apellidos", "correo", "fechaNacimiento", "tipoUsuario", "region", "direccion"]
      .forEach((nombre) => {
        form.elements[nombre].value = existente[nombre] || "";
      });
      form.actualizarComunas?.(existente.comuna);
    }
    form.addEventListener("formulario:valido", (evento) => {
      evento.preventDefault();
      const datos = new FormData(form);
      const todos = usuariosAdmin();
      const registro = {
        id: existente?.id || `USR-${String(Date.now()).slice(-6)}`,
        run: datos.get("run").trim().toUpperCase(),
        nombre: datos.get("nombre").trim(),
        apellidos: datos.get("apellidos").trim(),
        correo: datos.get("correo").trim(),
        fechaNacimiento: datos.get("fechaNacimiento"),
        tipoUsuario: datos.get("tipoUsuario"),
        region: datos.get("region"),
        comuna: datos.get("comuna"),
        direccion: datos.get("direccion").trim()
      };
      const repetido = todos.some((u) => u.run === registro.run && (!existente || u.id !== existente
        .id));
      if (repetido) {
        Validaciones.mostrarError(form, "run", "Ya existe un usuario con este RUN.");
        form.elements.run.focus();
        return;
      }
      if (existente) todos[todos.findIndex((u) => u.id === existente.id)] = registro;
      else todos.push(registro);
      guardarUsuarios(todos);
      const estado = form.querySelector("[data-form-status]");
      estado.textContent = `Usuario ${editar ? "actualizado" : "creado"} sin almacenar contraseña.`;
      estado.className = "form-status success";
      setTimeout(() => {
        location.href = "admin-usuarios.html";
      }, 700);
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-admin-sidebar]").forEach(crearSidebar);
    renderProductos();
    renderUsuarios();
    renderDetalleProducto();
    renderDetalleUsuario();
    conectarProductoForm();
    conectarUsuarioForm();
    document.querySelectorAll("[data-admin-product-count]").forEach((n) => {
      n.textContent = String(productosAdmin().length);
    });
    document.querySelectorAll("[data-admin-user-count]").forEach((n) => {
      n.textContent = String(usuariosAdmin().length);
    });
    document.querySelectorAll("[data-admin-low-count]").forEach((n) => {
      n.textContent = String(productosAdmin().filter((p) => p.stock <= (p.stockCritico ?? -1))
        .length);
    });
  });
})();
