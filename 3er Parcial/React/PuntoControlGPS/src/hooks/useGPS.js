import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function useGPS() {
  const [infoGps, setInfoGps] = useState(null);
  const [estatusEscuela, setEstatusEscuela] = useState('Esperando ubicación...');
  const [cargando, setCargando] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // Coordenadas destino como variables de estado dinámicas
  const [latDestino, setLatDestino] = useState(19.6932);
  const [lonDestino, setLonDestino] = useState(-101.1714);
  const tolerance = 0.005;

  // Seguimiento automático en tiempo real
  useEffect(() => {
    let subscripcion = null;

    const iniciarSeguimiento = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permiso de localización denegado.');
          setEstatusEscuela('❌ Permiso denegado.');
          setCargando(false);
          return;
        }

        // Obtener ubicación inicial rápidamente
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setInfoGps(location);
        setCargando(false);

        // Suscribirse a actualizaciones en tiempo real (se actualiza sola)
        subscripcion = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1500, // Actualizar cada 1.5 segundos
            distanceInterval: 0.5, // o cada medio metro de movimiento
          },
          (nuevaUbicacion) => {
            setInfoGps(nuevaUbicacion);
          }
        );
      } catch (error) {
        console.error(error);
        setErrorMsg('Error al acceder al chip GPS.');
        setEstatusEscuela('❌ Error de localización.');
        setCargando(false);
      }
    };

    iniciarSeguimiento();

    return () => {
      if (subscripcion) {
        subscripcion.remove();
      }
    };
  }, []);

  const miLat = infoGps?.coords?.latitude ?? null;
  const miLon = infoGps?.coords?.longitude ?? null;
  const precision = infoGps?.coords?.accuracy ?? null;

  const diffLat = miLat !== null ? Math.abs(miLat - latDestino) : null;
  const diffLon = miLon !== null ? Math.abs(miLon - lonDestino) : null;

  const estaDentro = diffLat !== null && diffLon !== null && diffLat < tolerance && diffLon < tolerance;

  // Lógica de validación reactiva a cambios de ubicación o destino
  useEffect(() => {
    if (miLat === null || miLon === null) return;

    if (estaDentro) {
      setEstatusEscuela('📍 ¡Felicidades! Estás dentro de tu zona marcada.');
    } else {
      setEstatusEscuela('❌ Estás fuera de tu destino seleccionado.');
    }
  }, [miLat, miLon, latDestino, lonDestino, estaDentro]);

  // Permite fijar automáticamente el punto actual como el nuevo objetivo
  const fijarUbicacionActualComoDestino = () => {
    if (miLat !== null && miLon !== null) {
      setLatDestino(miLat);
      setLonDestino(miLon);
    }
  };

  return {
    infoGps,
    estatusEscuela,
    cargando,
    errorMsg,
    miLat,
    miLon,
    precision,
    diffLat,
    diffLon,
    estaDentro,
    latDestino,
    lonDestino,
    tolerance,
    setLatDestino,
    setLonDestino,
    fijarUbicacionActualComoDestino,
  };
}
