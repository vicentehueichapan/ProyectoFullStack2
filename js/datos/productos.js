const PRODUCTOS = [{
  codigo: "CL001",
  categoria: "Cilindros de Gas",
  nombre: "Cilindro GLP 5 kg",
  descripcion: "Cilindro de gas licuado de petróleo 5 kg. Para uso residencial (cocina, calefacción pequeña).",
  unidad: "Unidad",
  precioResidencial: 6500,
  precioComercial: 6000,
  stock: 80,
  imagen: "img/productos/cilindro-5.svg"
}, {
  codigo: "CL002",
  categoria: "Cilindros de Gas",
  nombre: "Cilindro GLP 11 kg",
  descripcion: "Cilindro estándar doméstico. El más utilizado en hogares chilenos. Compatible con reguladores estándar.",
  unidad: "Unidad",
  precioResidencial: 12000,
  precioComercial: 11000,
  stock: 200,
  imagen: "img/productos/cilindro-11.svg"
}, {
  codigo: "CL003",
  categoria: "Cilindros de Gas",
  nombre: "Cilindro GLP 15 kg",
  descripcion: "Cilindro de mayor capacidad para hogares de alto consumo o locales pequeños.",
  unidad: "Unidad",
  precioResidencial: 16000,
  precioComercial: 14500,
  stock: 90,
  imagen: "img/productos/cilindro-15.svg"
}, {
  codigo: "CL004",
  categoria: "Cilindros de Gas",
  nombre: "Cilindro GLP 45 kg",
  descripcion: "Cilindro industrial. Uso comercial: restaurantes, talleres, calefacción de locales.",
  unidad: "Unidad",
  precioResidencial: 45000,
  precioComercial: 40000,
  stock: 30,
  imagen: "img/productos/cilindro-45.svg"
}, {
  codigo: "RG001",
  categoria: "Reguladores",
  nombre: "Regulador doméstico estándar",
  descripcion: "Regulador de 1 etapa para cilindros 5, 11 y 15 kg. Presión de salida 28 mbar.",
  unidad: "Unidad",
  precioResidencial: 8990,
  precioComercial: 8200,
  stock: 45,
  imagen: "img/productos/regulador.svg"
}, {
  codigo: "RG002",
  categoria: "Reguladores",
  nombre: "Regulador de alta presión",
  descripcion: "Regulador para cocinas industriales o equipos de mayor consumo. Presión regulable.",
  unidad: "Unidad",
  precioResidencial: 18990,
  precioComercial: 17000,
  stock: 12,
  imagen: "img/productos/regulador.svg"
}, {
  codigo: "RG003",
  categoria: "Reguladores",
  nombre: "Regulador dual (2 salidas)",
  descripcion: "Permite conectar dos artefactos simultáneamente al mismo cilindro.",
  unidad: "Unidad",
  precioResidencial: 14990,
  precioComercial: 13500,
  stock: 18,
  imagen: "img/productos/regulador.svg"
}, {
  codigo: "MG001",
  categoria: "Mangueras y Conexiones",
  nombre: "Manguera gas 1.5 m",
  descripcion: "Manguera flexible homologada. Diámetro interior 9 mm. Compatible con reguladores estándar.",
  unidad: "Unidad",
  precioResidencial: 3990,
  precioComercial: 3500,
  stock: 80,
  imagen: "img/productos/manguera.svg"
}, {
  codigo: "MG002",
  categoria: "Mangueras y Conexiones",
  nombre: "Manguera gas 3 m",
  descripcion: "Manguera larga para instalaciones donde el artefacto está alejado del cilindro.",
  unidad: "Unidad",
  precioResidencial: 6990,
  precioComercial: 6200,
  stock: 50,
  imagen: "img/productos/manguera.svg"
}, {
  codigo: "MG003",
  categoria: "Mangueras y Conexiones",
  nombre: "Abrazadera metálica",
  descripcion: "Abrazadera de acero para asegurar la conexión manguera-regulador y manguera-artefacto.",
  unidad: "Unidad",
  precioResidencial: 990,
  precioComercial: 800,
  stock: 200,
  imagen: "img/productos/conexion.svg"
}, {
  codigo: "MG004",
  categoria: "Mangueras y Conexiones",
  nombre: "Kit conexión completo (regulador + manguera 1.5 m + abrazaderas)",
  descripcion: "Todo lo necesario para instalar un cilindro nuevo.",
  unidad: "Kit",
  precioResidencial: 12990,
  precioComercial: 11500,
  stock: 25,
  imagen: "img/productos/conexion.svg"
}, {
  codigo: "AC001",
  categoria: "Accesorios",
  nombre: "Carro porta cilindro 11/15 kg",
  descripcion: "Carro metálico con ruedas para transportar cilindros dentro del hogar con seguridad.",
  unidad: "Unidad",
  precioResidencial: 12990,
  precioComercial: 11000,
  stock: 20,
  imagen: "img/productos/accesorio.svg"
}, {
  codigo: "AC002",
  categoria: "Accesorios",
  nombre: "Tapa protectora para válvula",
  descripcion: "Tapa de plástico ABS para proteger la válvula del cilindro durante el transporte.",
  unidad: "Unidad",
  precioResidencial: 1490,
  precioComercial: 1200,
  stock: 60,
  imagen: "img/productos/accesorio.svg"
}, {
  codigo: "AC003",
  categoria: "Accesorios",
  nombre: "Detector de gas a batería",
  descripcion: "Sensor electroquímico. Alarma sonora y visual ante fuga de gas GLP o metano.",
  unidad: "Unidad",
  precioResidencial: 19990,
  precioComercial: 17000,
  stock: 8,
  imagen: "img/productos/detector.svg"
}, ];
