# Distribuidora de Gas El Volcán

Proyecto individual desarrollado por **Vicente Hueichapan** para la Evaluación Parcial 1 de la asignatura **DSY1104 - Desarrollo Fullstack II**.

Repositorio público: <https://github.com/vicentehueichapan/ProyectoFullStack2>

## Descripción

El proyecto representa una tienda web para la Distribuidora de Gas El Volcán. Permite consultar el catálogo, revisar el detalle de los productos, utilizar un carrito de compra demostrativo, completar formularios y recorrer un área administrativa.

Esta primera evaluación utiliza solamente HTML, CSS y JavaScript. No incluye base de datos, pagos reales ni autenticación de usuarios.

## Caso desarrollado

La solución responde al caso de la Distribuidora de Gas El Volcán: muestra los productos del catálogo entregado, informa las zonas de despacho y representa los recorridos de clientes y administración solicitados para el prototipo de la evaluación.

## Cómo abrir el proyecto

1. Descargar o descomprimir el proyecto.
2. Entrar a la carpeta `ProyectoFullStack2`.
3. Abrir el archivo **`index.html`** con el navegador.
4. Recorrer todas las secciones desde el menú de la página.

> **ARCHIVO PRINCIPAL: `index.html`**  
> Este archivo abre la página de inicio. Desde su menú se accede a las demás vistas y funciones del proyecto.

## Funciones principales

- Página principal con productos destacados y zonas de despacho.
- Catálogo construido desde un arreglo de JavaScript.
- Detalle de cada producto.
- Carrito guardado en el almacenamiento local del navegador.
- Registro, inicio de sesión y contacto con validaciones.
- Sección Nosotros y dos artículos informativos.
- Administración demostrativa de productos y usuarios.
- Diseño adaptable para teléfono, tableta y computador.

## Páginas disponibles

Desde `index.html` se accede a Inicio, Productos, Nosotros, Blogs, Contacto, Registro, Ingreso y Carrito. El ingreso correcto conduce al área administrativa, donde se pueden recorrer las vistas demostrativas de productos y usuarios.

## Validaciones incluidas

- Registro: RUN chileno sin puntos ni guion, correo, contraseña, confirmación, región y comuna.
- Ingreso: correo y contraseña.
- Contacto: nombre, correo opcional y comentario.
- Administración: datos obligatorios y valores válidos para productos y usuarios.

## Prueba rápida

1. Abrir `index.html`.
2. Entrar a Productos y abrir el detalle de uno de ellos.
3. Añadirlo al carrito, cambiar su cantidad y recargar la página para comprobar que se conserva.
4. Abrir Registro y probar primero campos vacíos y luego datos válidos.
5. Ingresar con `vicente@gmail.com` y contraseña `1234` para recorrer la administración demostrativa.

## Organización

- Los archivos HTML representan las vistas solicitadas en la evaluación.
- `css/style.css` contiene todos los estilos del sitio.
- `js/` contiene los datos, las validaciones y el funcionamiento de cada sección.
- `img/` contiene las imágenes utilizadas por las páginas.
- `media/` contiene el video de seguridad.

## Importante

Los formularios, el carrito y la administración son demostraciones ejecutadas en el navegador. No se envía información a servicios externos.

No se necesita instalar programas, dependencias ni extensiones: basta con abrir `index.html` en un navegador actual. Al ser un prototipo de frontend, los registros, el inicio de sesión y los cambios administrativos no crean cuentas ni modifican el catálogo oficial en un servidor.
