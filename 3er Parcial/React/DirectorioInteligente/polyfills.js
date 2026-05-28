// Polyfill: Hermes no incluye DOMException, requerido por expo-sqlite v16
if (typeof globalThis.DOMException === 'undefined') {
  function DOMException(message, name) {
    var err = new Error(message);
    err.name = name || 'DOMException';
    err.code = 0;
    return err;
  }
  DOMException.prototype = Object.create(Error.prototype);
  globalThis.DOMException = DOMException;
}
