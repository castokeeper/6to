import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView } from 'react-native';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { useState, useEffect } from 'react';

const NAMES = ['Edgar', 'Victor', 'Angeles'];

async function initializeDatabase(db) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS registros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL
    );
  `);
}

function Main() {
  const db = useSQLiteContext();
  const [registros, setRegistros] = useState([]);

  const fetchRegistros = async () => {
    // Seleccionar todos los registros (SELECT)
    const allRows = await db.getAllAsync('SELECT * FROM registros ORDER BY id DESC');
    setRegistros(allRows);
  };

  useEffect(() => {
    fetchRegistros();
  }, []);

  const handlePress = async () => {
    // Determinar qué nombre sigue en base a la cantidad de registros actuales
    const countResult = await db.getFirstAsync('SELECT COUNT(*) as count FROM registros');
    const count = countResult.count;
    
    // Intercambiar Nombres: Edgar -> Victor -> Angeles
    const nextNameIndex = count % NAMES.length;
    const nextName = NAMES[nextNameIndex];

    // Insertar el nuevo registro (INSERT)
    await db.runAsync('INSERT INTO registros (nombre) VALUES (?)', nextName);
    
    // Actualizar la lista
    fetchRegistros();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Registro de Clics a BD Local</Text>
        <Button title="Registrar Clic" onPress={handlePress} />
      </View>
      <FlatList
        data={registros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemId}>Registro #{item.id}</Text>
            <Text style={styles.itemText}>{item.nombre}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SQLiteProvider databaseName="registros.db" onInit={initializeDatabase}>
      <Main />
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  list: {
    padding: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  itemId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
