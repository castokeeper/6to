import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

const SCREEN_W = Dimensions.get('window').width;

// iPhone 16 Pro Max: 430 × 932 pt
const DEVICE_W = 430;
const DEVICE_H = 932;
const SCALE = (SCREEN_W * 0.44) / DEVICE_W;
const FRAME_W = DEVICE_W * SCALE;
const FRAME_H = DEVICE_H * SCALE;
const BEZEL = 8;
const RADIUS = 32;

/* ════════════════════════════════════════════════════
   iPhone 16 Pro Max Frame — realistic Figma style
   ════════════════════════════════════════════════════ */
function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <View style={fr.wrapper}>
      {/* Outer chrome */}
      <View style={fr.chrome}>
        {/* Inner screen area */}
        <View style={fr.screenMask}>
          {/* Dynamic Island — sits ON TOP of content */}
          <View style={fr.islandRow}>
            <View style={fr.island} />
          </View>
          {/* Scaled content */}
          <View style={fr.scaler}>
            <View
              style={{
                width: DEVICE_W,
                height: DEVICE_H,
                transform: [{ scale: SCALE }],
                transformOrigin: 'top left',
              }}
            >
              {children}
            </View>
          </View>
        </View>
      </View>
      {/* Hardware side buttons */}
      <View style={[fr.sideBtn, { right: -3, top: FRAME_H * 0.22, height: 28 }]} />
      <View style={[fr.sideBtn, { right: -3, top: FRAME_H * 0.30, height: 28 }]} />
      <View style={[fr.sideBtn, { left: -3, top: FRAME_H * 0.18, height: 18 }]} />
      <View style={[fr.sideBtn, { left: -3, top: FRAME_H * 0.25, height: 36 }]} />
      <View style={[fr.sideBtn, { left: -3, top: FRAME_H * 0.34, height: 36 }]} />
    </View>
  );
}

/* ════════════════════════════════════════════════════
   WIREFRAME 1 — Lista de Reportes
   ════════════════════════════════════════════════════ */
type ReportStatus = 'activo' | 'cerrado';
interface Report {
  id: number; title: string; location: string; status: ReportStatus; date: string;
}

const DATA: Report[] = [
  { id: 1, title: 'Bache en avenida principal', location: 'Centro histórico', status: 'activo', date: '13 Feb 2026' },
  { id: 2, title: 'Fuga de agua potable', location: 'Zona industrial', status: 'cerrado', date: '12 Feb 2026' },
  { id: 3, title: 'Luminaria dañada', location: 'Parque central', status: 'activo', date: '11 Feb 2026' },
  { id: 4, title: 'Árbol caído en banqueta', location: 'Av. Reforma #230', status: 'cerrado', date: '10 Feb 2026' },
];

function Wireframe1() {
  const [q, setQ] = useState('');
  const [list, setList] = useState<Report[]>(DATA);
  const [nav, setNav] = useState('Inicio');

  const filtered = list.filter(
    (r) => r.title.toLowerCase().includes(q.toLowerCase()) || r.location.toLowerCase().includes(q.toLowerCase())
  );

  const toggle = useCallback((id: number) => {
    setList((p) => p.map((r) => (r.id === id ? { ...r, status: r.status === 'activo' ? 'cerrado' : 'activo' } : r)));
  }, []);

  const tap = (r: Report) =>
    Alert.alert(r.title, `📍 ${r.location}\n📅 ${r.date}\n${r.status === 'activo' ? '🟢 Activo' : '🔴 Cerrado'}`, [
      { text: r.status === 'activo' ? 'Cerrar' : 'Reactivar', onPress: () => toggle(r.id) },
      { text: 'OK', style: 'cancel' },
    ]);

  const tapNav = (t: string) => {
    setNav(t);
    if (t === 'Mapa') Alert.alert('🗺️ Mapa', 'Vista de mapa con reportes.');
    if (t === 'Ajustes') Alert.alert('⚙️ Ajustes', 'Configuraciones de la app.');
  };

  return (
    <View style={s1.root}>
      {/* ── Safe area for Dynamic Island ── */}
      <View style={s1.safeTop} />

      {/* ── Header ── */}
      <View style={s1.header}>
        <Text style={s1.headerTitle}>Reportes</Text>
        <Text style={s1.headerCount}>{filtered.length} elemento{filtered.length !== 1 ? 's' : ''}</Text>
      </View>

      {/* ── Search ── */}
      <View style={s1.searchWrap}>
        <View style={s1.searchBar}>
          <Text style={s1.searchIcon}>🔍</Text>
          <TextInput
            style={s1.searchInput}
            placeholder="Buscar..."
            placeholderTextColor="#aaa"
            value={q}
            onChangeText={setQ}
          />
          {q.length > 0 && (
            <TouchableOpacity onPress={() => setQ('')}>
              <Text style={s1.clearX}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ── List ── */}
      <FlatList
        data={filtered}
        keyExtractor={(i) => String(i.id)}
        contentContainerStyle={s1.listPad}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={s1.card} onPress={() => tap(item)} activeOpacity={0.75}>
            <TouchableOpacity
              style={[s1.dot, { backgroundColor: item.status === 'activo' ? '#34C759' : '#FF3B30' }]}
              onPress={() => toggle(item.id)}
            />
            <View style={s1.cardBody}>
              {/* wireframe placeholder lines */}
              <View style={[s1.line, { width: '82%' }]} />
              <View style={[s1.line, { width: '58%', backgroundColor: '#DBDBDB' }]} />
              <Text style={s1.cardTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={s1.cardSub}>📍 {item.location}</Text>
              <View style={s1.cardRow}>
                <Text style={s1.cardDate}>{item.date}</Text>
                <View style={[s1.pill, { backgroundColor: item.status === 'activo' ? '#DFFCE5' : '#FFE5E5' }]}>
                  <Text style={[s1.pillTxt, { color: item.status === 'activo' ? '#1B7A2B' : '#B71C1C' }]}>
                    {item.status === 'activo' ? 'Activo' : 'Cerrado'}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={s1.empty}>
            <Text style={{ fontSize: 36 }}>📭</Text>
            <Text style={s1.emptyTxt}>Sin resultados</Text>
          </View>
        }
      />

      {/* ── Bottom Nav ── */}
      <View style={s1.nav}>
        {['Inicio', 'Mapa', 'Ajustes'].map((t) => (
          <TouchableOpacity key={t} style={s1.navBtn} onPress={() => tapNav(t)} activeOpacity={0.7}>
            <Text style={{ fontSize: 20 }}>{t === 'Inicio' ? '🏠' : t === 'Mapa' ? '🗺️' : '⚙️'}</Text>
            <Text style={[s1.navLbl, nav === t && s1.navLblActive]}>{t}</Text>
            {nav === t && <View style={s1.navDot} />}
          </TouchableOpacity>
        ))}
      </View>
      {/* Home indicator */}
      <View style={s1.homePad}><View style={s1.homeBar} /></View>
    </View>
  );
}

/* ════════════════════════════════════════════════════
   WIREFRAME 2 — Mi App de Reportes
   ════════════════════════════════════════════════════ */
function Wireframe2() {
  const [nombre, setNombre] = useState('');
  const [desc, setDesc] = useState('');
  const [sending, setSending] = useState(false);
  const [pic, setPic] = useState(false);

  const enviar = () => {
    if (!nombre.trim()) return Alert.alert('⚠️', 'Ingresa tu nombre.');
    if (!desc.trim()) return Alert.alert('⚠️', 'Describe el problema.');
    setSending(true);
    setTimeout(() => {
      setSending(false);
      Alert.alert('✅ Enviado', `${nombre}\n${desc}`, [
        { text: 'Nuevo', onPress: () => { setNombre(''); setDesc(''); } },
        { text: 'OK' },
      ]);
    }, 1400);
  };

  const tapPic = () => {
    setPic(!pic);
    Alert.alert('📸 Foto de perfil', '', [
      { text: '📷 Cámara' }, { text: '🖼️ Galería' }, { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  return (
    <View style={s2.root}>
      {/* ── Safe area for Dynamic Island ── */}
      <View style={s2.safeTop} />

      {/* ── Dark header ── */}
      <View style={s2.header}>
        <Text style={s2.headerTitle}>Mi App de Reportes</Text>
      </View>

      <ScrollView contentContainerStyle={s2.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Profile */}
        <TouchableOpacity style={s2.avatarWrap} onPress={tapPic} activeOpacity={0.8}>
          <View style={[s2.avatar, pic && s2.avatarActive]}>
            <Text style={{ fontSize: 42 }}>{pic ? '📸' : '👤'}</Text>
          </View>
          <Text style={s2.avatarHint}>Toca para cambiar foto</Text>
        </TouchableOpacity>

        {/* Wireframe placeholder lines */}
        <View style={s2.lines}>
          <View style={[s2.phLine, { width: 190 }]} />
          <View style={[s2.phLine, { width: 145, backgroundColor: '#DDD' }]} />
          <View style={[s2.phLine, { width: 100, backgroundColor: '#E6E6E6' }]} />
        </View>

        {/* Form */}
        <View style={s2.form}>
          <Text style={s2.label}>Nombre</Text>
          <TextInput style={s2.input} placeholder="Tu nombre completo" placeholderTextColor="#bbb" value={nombre} onChangeText={setNombre} />

          <Text style={[s2.label, { marginTop: 16 }]}>Descripción del Reporte</Text>
          <TextInput
            style={[s2.input, { minHeight: 90, textAlignVertical: 'top' }]}
            placeholder="Describe el problema..."
            placeholderTextColor="#bbb"
            value={desc}
            onChangeText={setDesc}
            multiline
          />
        </View>

        {/* Info cards */}
        <View style={s2.cards}>
          {[
            { icon: '📍', title: 'Ubicación', sub: 'Se detectará automáticamente' },
            { icon: '📅', title: 'Fecha', sub: '13 de Febrero, 2026' },
          ].map((c, i) => (
            <View key={i} style={s2.card}>
              <Text style={{ fontSize: 20 }}>{c.icon}</Text>
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={s2.cardT}>{c.title}</Text>
                <Text style={s2.cardS}>{c.sub}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* ENVIAR */}
      <View style={s2.btnWrap}>
        <TouchableOpacity
          style={[s2.btn, sending && s2.btnOff]}
          onPress={enviar}
          activeOpacity={0.8}
          disabled={sending}
        >
          {sending ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ActivityIndicator color="#fff" size="small" />
              <Text style={s2.btnTxt}>  ENVIANDO...</Text>
            </View>
          ) : (
            <Text style={s2.btnTxt}>ENVIAR</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={s1.homePad}><View style={[s1.homeBar, { backgroundColor: '#ccc' }]} /></View>
    </View>
  );
}

/* ════════════════════════════════════════════════════
   MAIN — Both phones displayed Figma-style
   ════════════════════════════════════════════════════ */
export default function HomeScreen() {
  return (
    <ScrollView style={pg.bg} contentContainerStyle={pg.center}>
      <Text style={pg.title}>Wireframes — iPhone 16 Pro Max</Text>
      <Text style={pg.sub}>430 × 932 pt  ·  Interactivos</Text>

      <View style={pg.row}>
        {/* Phone 1 */}
        <View style={pg.col}>
          <Text style={pg.tag}>Lista de Reportes</Text>
          <IPhoneFrame><Wireframe1 /></IPhoneFrame>
        </View>
        {/* Phone 2 */}
        <View style={pg.col}>
          <Text style={pg.tag}>Mi App de Reportes</Text>
          <IPhoneFrame><Wireframe2 /></IPhoneFrame>
        </View>
      </View>
    </ScrollView>
  );
}

/* ═══════════ PAGE ═══════════ */
const pg = StyleSheet.create({
  bg: { flex: 1, backgroundColor: '#0b0b14' },
  center: { alignItems: 'center', paddingTop: 40, paddingBottom: 60 },
  title: { fontSize: 24, fontWeight: '800', color: '#fff', letterSpacing: -0.5 },
  sub: { fontSize: 12, color: '#555580', marginBottom: 30, letterSpacing: 1 },
  row: { flexDirection: 'row', gap: 22, flexWrap: 'wrap', justifyContent: 'center' },
  col: { alignItems: 'center' },
  tag: { fontSize: 13, fontWeight: '700', color: '#9d97ff', marginBottom: 10, letterSpacing: 0.5 },
});

/* ═══════════ FRAME ═══════════ */
const fr = StyleSheet.create({
  wrapper: { position: 'relative' },
  chrome: {
    width: FRAME_W + BEZEL * 2,
    height: FRAME_H + BEZEL * 2,
    backgroundColor: '#1a1a1e',
    borderRadius: RADIUS,
    borderWidth: 2.5,
    borderColor: '#38384a',
    padding: BEZEL,
    shadowColor: '#7c6cff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 15,
  },
  screenMask: {
    flex: 1,
    borderRadius: RADIUS - BEZEL,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  islandRow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 48 * SCALE,
    zIndex: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  island: {
    width: 120 * SCALE,
    height: 36 * SCALE,
    backgroundColor: '#000',
    borderRadius: 18 * SCALE,
    marginTop: 4,
  },
  scaler: {
    flex: 1,
    width: FRAME_W,
    height: FRAME_H,
    overflow: 'hidden',
  },
  sideBtn: {
    position: 'absolute',
    width: 3,
    backgroundColor: '#38384a',
    borderRadius: 1.5,
  },
});

/* ═══════════ WIREFRAME 1 STYLES ═══════════ */
const s1 = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F5F5F7' },
  // Push content below Dynamic Island area
  safeTop: { height: 59 },
  header: { paddingHorizontal: 20, paddingBottom: 6 },
  headerTitle: { fontSize: 32, fontWeight: '800', color: '#111' },
  headerCount: { fontSize: 14, color: '#888', marginTop: 2 },
  searchWrap: { paddingHorizontal: 16, paddingBottom: 10 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#E5E5EA', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 10,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: '#111', padding: 0 },
  clearX: { fontSize: 16, color: '#888', paddingLeft: 8 },
  listPad: { paddingHorizontal: 16, paddingBottom: 8 },
  card: {
    flexDirection: 'row', alignItems: 'flex-start',
    backgroundColor: '#fff', borderRadius: 16, padding: 14,
    marginBottom: 10, gap: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  dot: { width: 22, height: 22, borderRadius: 11, marginTop: 4 },
  cardBody: { flex: 1 },
  line: { height: 5, backgroundColor: '#CCC', borderRadius: 3, marginBottom: 4 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#111', marginTop: 6, marginBottom: 2 },
  cardSub: { fontSize: 13, color: '#666' },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  cardDate: { fontSize: 12, color: '#aaa' },
  pill: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8 },
  pillTxt: { fontSize: 11, fontWeight: '700' },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyTxt: { color: '#999', fontSize: 16, marginTop: 8 },
  nav: {
    flexDirection: 'row', justifyContent: 'space-around',
    backgroundColor: '#1C1C1E', paddingTop: 10, paddingBottom: 4,
  },
  navBtn: { alignItems: 'center', minWidth: 64 },
  navLbl: { color: '#8E8E93', fontSize: 11, fontWeight: '500', marginTop: 2 },
  navLblActive: { color: '#fff', fontWeight: '700' },
  navDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: '#6C63FF', marginTop: 3 },
  homePad: { height: 22, backgroundColor: '#1C1C1E', alignItems: 'center', justifyContent: 'center' },
  homeBar: { width: 134, height: 5, backgroundColor: '#48484A', borderRadius: 2.5 },
});

/* ═══════════ WIREFRAME 2 STYLES ═══════════ */
const s2 = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FAFAFA' },
  safeTop: { height: 59, backgroundColor: '#3A3A3C' },
  header: { backgroundColor: '#3A3A3C', paddingBottom: 16, alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#fff' },
  scroll: { paddingBottom: 12 },
  avatarWrap: { alignItems: 'center', paddingTop: 26, paddingBottom: 6 },
  avatar: {
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: '#D1D1D6', borderWidth: 3, borderColor: '#C7C7CC',
    justifyContent: 'center', alignItems: 'center',
  },
  avatarActive: { borderColor: '#6C63FF', backgroundColor: '#EDEAFF' },
  avatarHint: { color: '#8E8E93', fontSize: 12, marginTop: 6 },
  lines: { alignItems: 'center', gap: 6, marginTop: 10, marginBottom: 6 },
  phLine: { height: 7, backgroundColor: '#D1D1D6', borderRadius: 3.5 },
  form: { paddingHorizontal: 24, marginTop: 8 },
  label: { fontSize: 14, fontWeight: '700', color: '#3A3A3C', marginBottom: 6 },
  input: {
    backgroundColor: '#F2F2F7', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 15, color: '#111',
    borderWidth: 1, borderColor: '#E5E5EA',
  },
  cards: { paddingHorizontal: 24, marginTop: 18, gap: 10 },
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 14, padding: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  cardT: { fontSize: 14, fontWeight: '700', color: '#3A3A3C' },
  cardS: { fontSize: 12, color: '#8E8E93', marginTop: 1 },
  btnWrap: { paddingHorizontal: 24, paddingBottom: 6, paddingTop: 10 },
  btn: {
    backgroundColor: '#6C63FF', borderRadius: 16,
    paddingVertical: 16, alignItems: 'center',
    shadowColor: '#6C63FF', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35, shadowRadius: 12, elevation: 8,
  },
  btnOff: { backgroundColor: '#a09aff' },
  btnTxt: { fontSize: 17, fontWeight: '800', color: '#fff', letterSpacing: 2 },
});
