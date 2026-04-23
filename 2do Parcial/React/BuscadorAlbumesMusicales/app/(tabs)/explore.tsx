import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image } from 'expo-image';

const API_URL     = 'https://jsonplaceholder.typicode.com/albums';
const TIMEOUT_MS  = 10000;

const getAlbumImage  = (id: number)     => `https://picsum.photos/seed/album${id}/140/140`;
const getUserBanner  = (userId: number) => `https://picsum.photos/seed/user${userId}/400/180`;

type Album        = { id: number; title: string; userId: number };
type GrupoUsuario = { userId: number; albums: Album[] };

// Colores de acento por usuario (cíclico)
const USER_COLORS = ['#8b5cf6','#ec4899','#06b6d4','#f59e0b','#10b981',
                     '#ef4444','#3b82f6','#a855f7','#14b8a6','#f97316'];
const userColor = (id: number) => USER_COLORS[(id - 1) % USER_COLORS.length];

function fetchConTimeout(url: string, ms: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timer));
}

export default function PorUsuarioScreen() {
  const [grupos, setGrupos]                         = useState<GrupoUsuario[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<number | null>(null);
  const [cargando, setCargando]                     = useState(true);
  const [error, setError]                           = useState<string | null>(null);

  const cargarAlbumes = useCallback(() => {
    setCargando(true);
    setError(null);
    fetchConTimeout(API_URL, TIMEOUT_MS)
      .then(res => { if (!res.ok) throw new Error(`Error ${res.status}`); return res.json(); })
      .then((data: Album[]) => {
        const mapa = new Map<number, Album[]>();
        data.forEach(a => { if (!mapa.has(a.userId)) mapa.set(a.userId, []); mapa.get(a.userId)!.push(a); });
        setGrupos(Array.from(mapa.entries()).map(([userId, albums]) => ({ userId, albums })));
        setCargando(false);
      })
      .catch((err: Error) => {
        setError(err.name === 'AbortError'
          ? 'Tiempo de espera agotado.'
          : `Sin conexión.\n(${err.message})`);
        setCargando(false);
      });
  }, []);

  useEffect(() => { cargarAlbumes(); }, [cargarAlbumes]);

  const albumsDelUsuario = usuarioSeleccionado !== null
    ? grupos.find(g => g.userId === usuarioSeleccionado)?.albums ?? []
    : [];

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d1a" />

      {/* ── Header ─────────────────────────────── */}
      <View style={s.header}>
        <View style={s.headerAccent} />
        <Text style={s.headerLabel}>EXPLORAR</Text>
        <Text style={s.headerTitle}>
          {usuarioSeleccionado !== null ? `Usuario ${usuarioSeleccionado}` : 'Por Artista'}
        </Text>
      </View>

      {/* ── Cargando ───────────────────────────── */}
      {cargando && (
        <View style={s.centered}>
          <View style={s.spinnerWrap}>
            <ActivityIndicator size="large" color="#8b5cf6" />
          </View>
          <Text style={s.loadingText}>Cargando artistas...</Text>
        </View>
      )}

      {/* ── Error ──────────────────────────────── */}
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

      {/* ── Grilla de usuarios ─────────────────── */}
      {!cargando && !error && usuarioSeleccionado === null && (
        <FlatList
          data={grupos}
          keyExtractor={item => item.userId.toString()}
          numColumns={2}
          renderItem={({ item }) => {
            const color = userColor(item.userId);
            return (
              <TouchableOpacity
                style={s.userCard}
                onPress={() => setUsuarioSeleccionado(item.userId)}
                activeOpacity={0.85}
              >
                {/* Banner de imagen */}
                <Image
                  source={{ uri: getUserBanner(item.userId) }}
                  style={s.userBanner}
                  contentFit="cover"
                  transition={400}
                />
                {/* Overlay oscuro */}
                <View style={s.userOverlay} />
                {/* Acento de color */}
                <View style={[s.userColorBar, { backgroundColor: color }]} />
                {/* Texto */}
                <View style={s.userInfo}>
                  <View style={[s.userAvatar, { backgroundColor: color + '33', borderColor: color }]}>
                    <Text style={[s.userAvatarText, { color }]}>{item.userId}</Text>
                  </View>
                  <Text style={s.userName}>Artista {item.userId}</Text>
                  <Text style={s.userCount}>{item.albums.length} álbumes</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={s.grid}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* ── Álbumes del usuario ────────────────── */}
      {!cargando && !error && usuarioSeleccionado !== null && (
        <>
          {/* Sub-header */}
          <View style={s.detailHeader}>
            <TouchableOpacity style={s.backBtn} onPress={() => setUsuarioSeleccionado(null)}>
              <Text style={s.backIcon}>‹</Text>
              <Text style={s.backText}>Artistas</Text>
            </TouchableOpacity>
            <View style={[s.countPill, { backgroundColor: userColor(usuarioSeleccionado) + '22',
                                          borderColor: userColor(usuarioSeleccionado) + '55' }]}>
              <Text style={[s.countPillText, { color: userColor(usuarioSeleccionado) }]}>
                {albumsDelUsuario.length} álbumes
              </Text>
            </View>
          </View>

          <FlatList
            data={albumsDelUsuario}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={s.albumCard}>
                <Image
                  source={{ uri: getAlbumImage(item.id) }}
                  style={s.albumCover}
                  contentFit="cover"
                  transition={300}
                  placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
                />
                <View style={s.albumBody}>
                  <Text style={s.albumTitle} numberOfLines={2}>{item.title}</Text>
                  <View style={s.albumFooter}>
                    <View style={[s.albumNumPill, { backgroundColor: userColor(usuarioSeleccionado) + '22' }]}>
                      <Text style={[s.albumNumText, { color: userColor(usuarioSeleccionado) }]}>#{item.id}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
            contentContainerStyle={s.albumList}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
}

const BG      = '#0d0d1a';
const SURFACE = '#16162a';
const BORDER  = '#252540';

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },

  // Header
  header: { paddingTop: 56, paddingHorizontal: 20, paddingBottom: 20, position: 'relative' },
  headerAccent: {
    position: 'absolute', top: 50, left: 20,
    width: 4, height: 42, borderRadius: 4, backgroundColor: '#ec4899',
  },
  headerLabel: { fontSize: 11, fontWeight: '700', color: '#ec4899', letterSpacing: 3, marginLeft: 14 },
  headerTitle: { fontSize: 28, fontWeight: '900', color: '#f0ebff', marginTop: 4, marginLeft: 14 },

  // Grid de usuarios
  grid: { paddingHorizontal: 16, paddingBottom: 40 },
  userCard: {
    flex: 1, margin: 6,
    borderRadius: 20, overflow: 'hidden',
    backgroundColor: SURFACE,
    borderWidth: 1, borderColor: BORDER,
    height: 170,
  },
  userBanner: { position: 'absolute', width: '100%', height: '100%' },
  userOverlay: {
    position: 'absolute', width: '100%', height: '100%',
    backgroundColor: 'rgba(10,10,22,0.72)',
  },
  userColorBar: { position: 'absolute', top: 0, left: 0, right: 0, height: 3 },
  userInfo: { flex: 1, padding: 16, justifyContent: 'flex-end' },
  userAvatar: {
    width: 36, height: 36, borderRadius: 18,
    borderWidth: 1.5,
    justifyContent: 'center', alignItems: 'center', marginBottom: 8,
  },
  userAvatarText: { fontSize: 15, fontWeight: '900' },
  userName: { fontSize: 15, fontWeight: '800', color: '#f0ebff' },
  userCount: { fontSize: 12, color: '#9898b8', marginTop: 2 },

  // Detail header
  detailHeader: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, marginBottom: 14,
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  backIcon: { fontSize: 24, color: '#8b5cf6', lineHeight: 28 },
  backText: { fontSize: 15, color: '#8b5cf6', fontWeight: '700' },
  countPill: {
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4, borderWidth: 1,
  },
  countPillText: { fontSize: 12, fontWeight: '700' },

  // Album list
  albumList: { paddingHorizontal: 20, paddingBottom: 40 },
  albumCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: SURFACE,
    borderRadius: 18, marginBottom: 10,
    borderWidth: 1, borderColor: BORDER,
    overflow: 'hidden',
  },
  albumCover: { width: 76, height: 76, backgroundColor: '#1e1e30' },
  albumBody: { flex: 1, paddingHorizontal: 14, paddingVertical: 10 },
  albumTitle: {
    fontSize: 14, fontWeight: '700', color: '#e8e0ff',
    textTransform: 'capitalize', lineHeight: 20,
  },
  albumFooter: { marginTop: 8 },
  albumNumPill: { alignSelf: 'flex-start', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  albumNumText: { fontSize: 11, fontWeight: '700' },

  // States
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 60 },
  spinnerWrap: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#1e1035',
    justifyContent: 'center', alignItems: 'center', marginBottom: 16,
  },
  loadingText: { color: '#6b6b8a', fontSize: 14 },
  errorIcon:  { fontSize: 48, marginBottom: 12 },
  errorTitle: { fontSize: 20, fontWeight: '800', color: '#f0ebff', marginBottom: 6 },
  errorMsg:   { fontSize: 13, color: '#6b6b8a', textAlign: 'center', lineHeight: 20, marginHorizontal: 40 },
  retryBtn:   { marginTop: 24, backgroundColor: '#8b5cf6', paddingHorizontal: 28, paddingVertical: 12, borderRadius: 14 },
  retryText:  { color: '#fff', fontWeight: '700', fontSize: 15 },
});
