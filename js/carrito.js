(() => {
  const CLAVE = "gasVolcanCarritoV1";
  const buscarProducto = (codigo) => PRODUCTOS.find((producto) => producto.codigo === codigo);

  const normalizar = (valor) => {
    if (!Array.isArray(valor)) return [];
    const codigos = new Set();
    return valor.reduce((resultado, item) => {
      const producto = item && buscarProducto(String(item.codigo || ""));
      const cantidad = Number(item && item.cantidad);
      if (!producto || !Number.isInteger(cantidad) || cantidad < 1 || codigos.has(producto.codigo))
        return resultado;
      codigos.add(producto.codigo);
      resultado.push({
        codigo: producto.codigo,
        cantidad: Math.min(cantidad, producto.stock)
      });
      return resultado;
    }, []);
  };

  const leer = () => {
    const original = GasVolcan.obtenerLocal(CLAVE, []);
    const limpio = normalizar(original);
    if (JSON.stringify(original) !== JSON.stringify(limpio)) GasVolcan.guardarLocal(CLAVE, limpio);
    return limpio;
  };

  const guardar = (carrito) => {
    const limpio = normalizar(carrito);
    GasVolcan.guardarLocal(CLAVE, limpio);
    document.dispatchEvent(new CustomEvent("carrito:cambio", {
      detail: limpio
    }));
    return limpio;
  };

  const agregar = (codigo, cantidad = 1) => {
    const producto = buscarProducto(codigo);
    if (!producto) return {
      ok: false,
      mensaje: "El producto solicitado no existe."
    };
    const numero = Number(cantidad);
    if (!Number.isInteger(numero) || numero < 1) return {
      ok: false,
      mensaje: "La cantidad mínima es 1."
    };
    const carrito = leer();
    const item = carrito.find((registro) => registro.codigo === codigo);
    const nuevaCantidad = (item?.cantidad || 0) + numero;
    if (nuevaCantidad > producto.stock) return {
      ok: false,
      mensaje: `Solo hay ${producto.stock} unidades disponibles.`
    };
    if (item) item.cantidad = nuevaCantidad;
    else carrito.push({
      codigo,
      cantidad: numero
    });
    guardar(carrito);
    return {
      ok: true,
      mensaje: `${producto.nombre} fue añadido al carrito.`
    };
  };

  const cambiarCantidad = (codigo, cantidad) => {
    const producto = buscarProducto(codigo);
    const numero = Number(cantidad);
    if (!producto || !Number.isInteger(numero) || numero < 1 || numero > producto.stock) return false;
    const carrito = leer();
    const item = carrito.find((registro) => registro.codigo === codigo);
    if (!item) return false;
    item.cantidad = numero;
    guardar(carrito);
    return true;
  };

  const eliminar = (codigo) => guardar(leer().filter((item) => item.codigo !== codigo));
  const vaciar = () => guardar([]);
  const cantidadTotal = () => leer().reduce((total, item) => total + item.cantidad, 0);
  const total = () => leer().reduce((suma, item) => suma + buscarProducto(item.codigo).precioResidencial *
    item.cantidad, 0);

  const actualizarContadores = () => {
    document.querySelectorAll("[data-cart-count]").forEach((nodo) => {
      nodo.textContent = String(cantidadTotal());
    });
  };

  window.Carrito = {
    leer,
    agregar,
    cambiarCantidad,
    eliminar,
    vaciar,
    cantidadTotal,
    total,
    buscarProducto
  };
  document.addEventListener("DOMContentLoaded", actualizarContadores);
  document.addEventListener("carrito:cambio", actualizarContadores);
})();
