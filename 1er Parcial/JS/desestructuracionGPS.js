const respuestaGPS = {
    coordenadas: { lat: 19.43, lng: -99.13 },
    precision: "Alta",
    timestamp: "2024-05-20T10:00:00",
    dispositivo: "Android 14"
}

const { coordenadas: { lat, lng }, precision, timestamp, dispositivo } = respuestaGPS

console.log(`Ubicacion enviada desde ${dispositivo} a las ${timestamp} con precision ${precision} en las coordenadas ${lat}, ${lng}`)