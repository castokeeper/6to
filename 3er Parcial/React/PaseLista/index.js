import { LogBox } from 'react-native';
import { registerRootComponent } from 'expo';
import App from './App';

// Suprimir error no-fatal de internals de RN + Babel loose mode
LogBox.ignoreLogs(["Cannot assign to read-only property 'NONE'"]);

registerRootComponent(App);
