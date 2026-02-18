const incidentes = [

    { tipo: "Incendio", prioridad: 9, ubicacion: "Zona Centro" },
    { tipo: "Robo en Banco", prioridad: 8, ubicacion: "Av Juarez" },
    { tipo: "Accidente de transito", prioridad: 6, ubicacion: "Periferico" },
    { tipo: "Asalto", prioridad: 7, ubicacion: "Zona Centro" },
    { tipo: "Fuga de Gas", prioridad: 10, ubicacion: "Colonia Moderna" }

]

procesarIncidente = incidentes.map(procesando => "Atendiendo: " + procesando.tipo + " en " + procesando.ubicacion)

console.log(`${procesarIncidente.join("\n")}`)