import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image } from 'expo-image';

const API_URL = 'https://jsonplaceholder.typicode.com/albums';
const TIMEOUT_MS = 10000;

const getAlbumImage = (id: number) =>
  `https://picsum.photos/seed/album${id}/160/160`;

type Album = { id: number; title: string; userId: number };

function fetchConTimeout(url: string, ms: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timer));
}

export default function BuscadorScreen() {
  const [albums, setAlbums]   = useState<Album[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError]       = useState<string | null>(null);

  const cargarAlbumes = useCallback(() => {
    setCargando(true);
    setError(null);
    fetchConTimeout(API_URL, TIMEOUT_MS)
      .then(res => { if (!res.ok) throw new Error(`Error ${res.status}`); return res.json(); })
      .then((data: Album[]) => { setAlbums(data); setCargando(false); })
      .catch((err: Error) => {
        setError(err.name === 'AbortError'
          ? 'Tiempo de espera agotado. Verifica tu conexión.'
          : `Sin conexión a internet.\n(${err.message})`);
        setCargando(false);
      });
  }, []);

  useEffect(() => { cargarAlbumes(); }, [cargarAlbumes]);

  const manejarBusqueda = (t: string) => setBusqueda(t.replace(/[^a-zA-Z0-9 ]/g, ''));

  const filtrados = albums.filter(a =>
    a.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d1a" />

      {/* ── Header ─────────────────────────────── */}
      <View style={s.header}>
        <View style={s.headerAccent} />
        <Text style={s.headerLabel}>BIBLIOTECA</Text>
        <Text style={s.headerTitle}>Álbumes Musicales</Text>
        {!cargando && !error && (
          <View style={s.badge}>
            <Text style={s.badgeText}>{albums.length} álbumes</Text>
          </View>
        )}
      </View>

      {/* ── Buscador ───────────────────────────── */}
      <View style={s.searchWrap}>
        <Text style={s.searchIcon}>🔍</Text>
        <TextInput
          style={s.searchInput}
          placeholder="Buscar por título..."
          placeholderTextColor="#4a4a6a"
          value={busqueda}
          onChangeText={manejarBusqueda}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {busqueda.length > 0 && (
          <TouchableOpacity onPress={() => setBusqueda('')}>
            <Text style={s.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Contador de resultados */}
      {!cargando && !error && busqueda.length > 0 && (
        <Text style={s.contador}>
          {filtrados.length} resultado{filtrados.length !== 1 ? 's' : ''} para "{busqueda}"
        </Text>
      )}

      {/* ── Estados ────────────────────────────── */}
      {cargando && (
        <View style={s.centered}>
          <View style={s.spinnerWrap}>
            <ActivityIndicator size="large" color="#8b5cf6" />
          </View>
          <Text style={s.loadingText}>Cargando biblioteca...</Text>
        </View>
      )}

      {error && (
        <View style={s.centered}>
          <Text style={s.errorIcon}>📡</Text>
          <Text style={s.errorTitle}>Sin conexión</Text>
          <Text style={s.errorMsg}>{error}</Text>
          <TouchableOpacity style={s.retryBtn} onPress={cargarAlbumes}>
            <Text style={s.retryText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ── Lista ──────────────────────────────── */}
      {!cargando && !error && (
        <FlatList
          data={filtrados}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }) => (
            <View style={s.card}>
              {/* Portada */}
              <Image
                source={{ uri: getAlbumImage(item.id) }}
                style={s.cover}
                contentFit="cover"
                transition={400}
                placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
              />
              {/* Info */}
              <View style={s.cardBody}>
                <Text style={s.cardTitle} numberOfLines={2}>{item.title}</Text>
                <View style={s.cardMeta}>
                  <View style={s.userPill}>
                    <Text style={s.userPillText}>U{item.userId}</Text>
                  </View>
                  <Text style={s.cardNum}>#{item.id}</Text>
                </View>
              </View>
              {/* Ranking de los primeros 3 */}
              {index < 3 && !busqueda && (
                <View style={[s.rank, index === 0 && s.rank1, index === 1 && s.rank2, index === 2 && s.rank3]}>
                  <Text style={s.rankText}>{['🥇','🥈','🥉'][index]}</Text>
                </View>
              )}
            </View>
          )}
          ListEmptyComponent={
            <View style={s.centered}>
              <Text style={s.emptyIcon}>🎵</Text>
              <Text style={s.emptyText}>Sin resultados para "{busqueda}"</Text>
            </View>
          }
          contentContainerStyle={s.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const PURPLE  = '#8b5cf6';
const PINK    = '#ec4899';
const BG      = '#0d0d1a';
const SURFACE = '#16162a';
const BORDER  = '#252540';

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },

  // Header
  header: { paddingTop: 56, paddingHorizontal: 20, paddingBottom: 24, position: 'relative' },
  headerAccent: {
    position: 'absolute', top: 40, left: 20,
    width: 4, height: 46, borderRadius: 4,
    backgroundColor: PURPLE,
  },
  headerLabel: { fontSize: 11, fontWeight: '700', color: PURPLE, letterSpacing: 3, marginLeft: 14 },
  headerTitle: { fontSize: 28, fontWeight: '900', color: '#f0ebff', marginTop: 4, marginLeft: 14 },
  badge: {
    alignSelf: 'flex-start',
    marginLeft: 14, marginTop: 10,
    backgroundColor: '#1e1035',
    borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 4,
    borderWidth: 1, borderColor: '#3d2a7a',
  },
  badgeText: { fontSize: 12, color: PURPLE, fontWeight: '600' },

  // Search
  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 20, marginBottom: 6,
    backgroundColor: SURFACE,
    borderRadius: 16, paddingHorizontal: 16, paddingVertical: 2,
    borderWidth: 1, borderColor: BORDER,
  },
  searchIcon: { fontSize: 16, marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: '#e8e0ff', paddingVertical: 12 },
  clearBtn: { fontSize: 14, color: '#4a4a6a', paddingLeft: 8 },
  contador: { fontSize: 12, color: '#6b6b8a', marginHorizontal: 22, marginBottom: 14 },

  // List
  list: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 40 },
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: SURFACE,
    borderRadius: 18, marginBottom: 12,
    borderWidth: 1, borderColor: BORDER,
    overflow: 'hidden',
  },
  cover: { width: 80, height: 80, backgroundColor: '#1e1e30' },
  cardBody: { flex: 1, paddingHorizontal: 14, paddingVertical: 10 },
  cardTitle: {
    fontSize: 14, fontWeight: '700', color: '#e8e0ff',
    textTransform: 'capitalize', lineHeight: 20,
  },
  cardMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 },
  userPill: {
    backgroundColor: '#1e1035', borderRadius: 20,
    paddingHorizontal: 8, paddingVertical: 2,
  },
  userPillText: { fontSize: 11, color: PURPLE, fontWeight: '700' },
  cardNum: { fontSize: 11, color: '#3a3a5a', fontWeight: '600' },

  // Rank badge
  rank: {
    position: 'absolute', top: 6, right: 10,
    width: 28, height: 28, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
  },
  rank1: { backgroundColor: '#2a2010' },
  rank2: { backgroundColor: '#1a1a20' },
  rank3: { backgroundColor: '#1a1510' },
  rankText: { fontSize: 16 },

  // States
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 60 },
  spinnerWrap: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#1e1035',
    justifyContent: 'center', alignItems: 'center', marginBottom: 16,
  },
  loadingText: { color: '#6b6b8a', fontSize: 14 },
  errorIcon: { fontSize: 48, marginBottom: 12 },
  errorTitle: { fontSize: 20, fontWeight: '800', color: '#f0ebff', marginBottom: 6 },
  errorMsg: { fontSize: 13, color: '#6b6b8a', textAlign: 'center', lineHeight: 20, marginHorizontal: 40 },
  retryBtn: {
    marginTop: 24, backgroundColor: PURPLE,
    paddingHorizontal: 28, paddingVertical: 12, borderRadius: 14,
  },
  retryText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { color: '#6b6b8a', fontSize: 14 },
});
