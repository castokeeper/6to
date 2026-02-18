const respuestaGPS = {
    coordenadas: { lat: 19.43, lng: -99.13 },
    precision: "Alta",
    timestamp: "2024-05-20T10:00:00",
    dispositivo: "Android 14"
}

const lat = respuestaGPS.coordenadas.lat
const lng = respuestaGPS.coordenadas.lng
console.log(lat, lng)
