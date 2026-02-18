const viveres = [
    {
        nombre: "Arroz",
        cantidad: 30,
        categoria: "Granos"
    },
    {
        nombre: "Frijoles",
        cantidad: 10,
        categoria: "Granos"
    },
    {
        nombre: "Bistec",
        cantidad: 22,
        categoria: "Carne"
    }
];

const stockMinimo = 20;

for (let i = 0; i < viveres.length; i++) {
    const producto = viveres[i];
    if (producto.cantidad < stockMinimo) {
        console.log(`Alerta de stock bajo: ${producto.nombre} - Cantidad: ${producto.cantidad} necesitamos recolectar más`);
    } if (producto.cantidad >= stockMinimo) {
        console.log(`Stock suficiente: ${producto.nombre} - Cantidad: ${producto.cantidad}`);
    }
}

console.log("Revisión de stock completada.");