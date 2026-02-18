const metaSocial = 50;
const brigadas = [
    { nombre: "Brigada de Apoyo", donaciones: 50 },
    { nombre: "Brigada de Suministros", donaciones: 120 },
    { nombre: "Brigada de Capital", donaciones: 40 },
    { nombre: "Brigada de Apoyo Escolar", donaciones: 150 },
    { nombre: "Brigada voluntaria", donaciones: 20 }
];

for (let i = 0; i < brigadas.length; i++) {
    const donaciones = brigadas[i].donaciones;
    const nombre = brigadas[i].nombre;

    if (donaciones >= metaSocial) {
        console.log(`La ${nombre} ha alcanzado la meta social con ${donaciones} donaciones.`);
    } else {
        console.log(`La ${nombre} no ha alcanzado la meta social con ${donaciones} donaciones.`);
    }
}

console.log("Reporte de Datos Sociales finalizado");