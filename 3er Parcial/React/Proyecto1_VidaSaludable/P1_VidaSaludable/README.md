# VidaSaludableApp — Proyecto 1

## Configuración rápida

### 1. Crear el proyecto Expo
```bash
npx create-expo-app VidaSaludableApp
cd VidaSaludableApp
```

### 2. Reemplaza los archivos
Copia los archivos de este ZIP manteniendo la estructura:
```
VidaSaludableApp/
├── App.js                  ← reemplazar
├── styles/
│   └── globalStyles.js     ← crear carpeta y archivo
├── components/
│   ├── CustomButton.js     ← crear carpeta y archivos
│   └── HealthCard.js
└── screens/
    ├── LoginScreen.js      ← crear carpeta y archivos
    ├── HomeScreen.js
    ├── DetailsScreen.js
    └── ProfileScreen.js
```

### 3. Instalar dependencias
```bash
npm install @react-navigation/native @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-get-random-values
```

### 4. Correr la app
```bash
npx expo start
```
Escanea el QR con Expo Go en tu celular.

### 5. Generar APK
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview
```
El APK se descarga desde expo.dev cuando termina el build.

---

## Pantallas incluidas
1. **LoginScreen** — Acceso con email/contraseña
2. **HomeScreen** — Menú principal con buscador y filtros
3. **DetailsScreen** — Detalle de receta/ejercicio con Modal
4. **ProfileScreen** — Estadísticas + contador de agua (useState)

## Puntos cubiertos
- ✅ Stack Navigation (4 pantallas)
- ✅ FlatList + ScrollView
- ✅ Flexbox (flexDirection, justifyContent, alignItems)
- ✅ Componentes reutilizables con Props (CustomButton, HealthCard)
- ✅ StyleSheet global (sin inline styles)
- ✅ useState (contador de agua, búsqueda, filtros, modal)
- ✅ Alert + Modal
- ✅ Expo / EAS Build
