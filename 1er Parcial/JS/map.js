const numeros = [1, 2, 3, 4, 5]
const personas = [
    { nombre: "Juan", edad: 25 },
    { nombre: "Maria", edad: 22 },
    { nombre: "Pedro", edad: 28 }
]
const viveres = [
    { nombre: "Pan", precio: 8, stock: 30 },
    { nombre: "Leche", precio: 30, stock: 20 },
    { nombre: "Huevos", precio: 40, stock: 30 },
    { nombre: "Carne", precio: 120, stock: 10 },
    { nombre: "Pollo", precio: 80, stock: 15 }

]

const numerosDobles = numeros.map(numero => numero * 2)
const nombresMayusculas = personas.map(persona => persona.nombre.toUpperCase())
const personasMayoresDe25 = personas.filter(persona => persona.edad > 25).map(persona => persona.nombre)
const viveresConIVA = viveres.map(viver => {
    return {
        nombre: viver.nombre,
        precio: viver.precio * 1.16,
        stock: viver.stock
    }
}).map(viver => viver.nombre + " con precio de " + viver.precio.toFixed(2) + "\n")
const viveresStockMayorA20 = viveres.filter(viver => viver.stock > 20).map(viver => viver.nombre)

console.log(`Numeros dobles: ${numerosDobles.join(", ")} \n`)
console.log(`Nombres en mayusculas: ${nombresMayusculas.join(", ")} \n`)
console.log(`Personas mayores de 25: ${personasMayoresDe25.join(", ")} \n`)
console.log(`Viveres con IVA: \n${viveresConIVA.join("")}`)

if (viveresStockMayorA20.length == 2) {
    console.log(`${viveresStockMayorA20.join(" y ")} tienen stock mayor a 20`)
} else if (viveresStockMayorA20.length >= 3) {
    console.log(`${viveresStockMayorA20.join(", ")} y ${viveresStockMayorA20[viveresStockMayorA20.length - 1]} tienen stock mayor a 20`)
} else {
    console.log(`${viveresStockMayorA20[0]} tiene stock mayor a 20`)
}