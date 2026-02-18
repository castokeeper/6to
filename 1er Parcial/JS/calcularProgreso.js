const calcularProgreso = (completado, total) => {
    const porcentaje = (completado / total) * 100;
    return `Progreso de la carga: ${porcentaje}%`;
};

console.log(calcularProgreso(45, 100));